import { serve } from 'bun';
import index from './index.html';

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
        message: `Hello, ${name}!`,
      });
    },
  },
  // for websocket
  fetch(req, server) {
    // const url = new URL(req.url);
    // if (url.pathname === '/chat') {
    const upgraded = server.upgrade(req);
    if (!upgraded) {
      return new Response('Upgrade failed', { status: 400 });
    }
    // }
    return new Response('Hello World');
  },
  websocket: {
    open(ws) {
      console.log('Client connected');
      ws.send('Welcome Patron!');
    },
    message(ws, msg) {
      console.log('Received:', msg);
      ws.send('Server echo: ' + msg);
    },
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});
