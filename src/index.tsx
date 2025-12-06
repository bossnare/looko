import { createOpenAI, openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { serve, type ServerWebSocket } from 'bun';
import { Database } from 'bun:sqlite';
import index from './index.html';
import type { Message } from './types/chat.type';

const clients = new Set<ServerWebSocket>();
const db = new Database('chat.sqlite'); // create db
const apiKey = Bun.env.AI_GATEWAY_API_KEY;

const openaiGateway = createOpenAI({
  baseURL: 'https://api.openai.com/v1/responses',
  apiKey: apiKey,
});

// create tables
db.run('CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY, username TEXT)');
db.run(
  'CREATE TABLE IF NOT EXISTS messages(id TEXT PRIMARY KEY, content TEXT, sentAt INTEGER, userId TEXT, username TEXT)'
);

const server = serve({
  port: 3000,
  routes: {
    // Serve index.html for all unmatched routes.
    '/*': index,

    '/api/hello': {
      async GET(req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'GET',
        });
      },
      async PUT(req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'PUT',
        });
      },
    },

    '/api/hello/:name': async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!.`,
      });
    },

    '/api/chat': {
      async POST(req) {
        const body = await req.json();
        console.log(body);

        const result = streamText({
          model: openaiGateway('gpt-5-chat-latest'),
          messages: [
            {
              role: 'user',
              content: body.message,
            },
          ],
        });

        return result.toTextStreamResponse();
      },
    },
  },
  // for socket
  fetch(req, server) {
    const upgraded = server.upgrade(req);
    if (!upgraded) {
      return new Response('Upgrade failed', { status: 400 });
    }

    return new Response('Hello World');
  },
  websocket: {
    open(ws: ServerWebSocket) {
      clients.add(ws);
      console.log('Client connected.');
    },
    message(ws, raw) {
      const text =
        typeof raw === 'string' ? raw : new TextDecoder().decode(raw);
      const msg = JSON.parse(text) as Message;

      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(raw);
        }
      }

      // db.run(
      //   'INSERT INTO messages (id, content, sentAt, userId, username) (?, ?, ?, ?, ?)',
      //   [msg.id, msg.content, msg.sentAt, msg.user.id, msg.user.username]
      // );
    },
    close(ws: ServerWebSocket) {
      clients.delete(ws);
    },
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(
  `Server started on http://localhost:${server.port}`,
  '- Powered by Bun'
);
