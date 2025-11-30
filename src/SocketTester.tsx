import { useEffect, useRef, useState, type FormEvent } from 'react';
import { PaperPlaneTiltIcon, ChatTextIcon } from '@phosphor-icons/react';
import logo from './logo.svg';
import { getRandom } from './utils/get-random';
import { colors } from './pkg.ts/some';

const color = getRandom(colors);

export const useChat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    setWs(socket);

    socket.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data]);
    };

    return () => socket.close();
  }, []);

  const send = (msg: string) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(msg);
    }
  };

  return { messages, send };
};

export function SocketTester() {
  const { messages, send } = useChat();
  const [sendMsg, setSendMsg] = useState('');
  const nullMsg = messages.length < 1;

  return (
    <div className="pt-14">
      {nullMsg && (
        <h1 className="hidden mb-2 text-2xl font-bold text-center md:block">
          Socket Tester
        </h1>
      )}
      <div className="w-full h-[calc(100dvh-56px)] md:w-60 md:h-120 bg-[#1a1a1a] mx-auto rounded-3xl rounded-b-none md:rounded-xl p-4 relative overflow-hidden">
        {nullMsg ? (
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <p className="md:text-xs">Start to send a message.</p>
            <ChatTextIcon className="size-5" />
          </div>
        ) : (
          <div className="flex gap-2 mb-6">
            <div
              style={{ backgroundColor: `${color}` }}
              className="p-1 rounded-full size-14 md:size-8 ring-2 ring-blue-500"
            >
              <img src={logo} alt="Bun" className="size-full" />
            </div>
            <h3 className="text-lg font-bold md:text-sm">WebSocket Tester</h3>
          </div>
        )}
        {/* show message */}
        <div className="flex flex-col items-start pb-20 space-y-1 overflow-y-auto max-h-100 scrollbar-none">
          {messages.map((msg, i) => (
            <p
              className="px-2 py-2 truncate bg-blue-600 line-clamp-3 h-auto rounded-lg min-w-20 max-w-[98%] md:text-xs"
              key={i}
            >
              {msg}
            </p>
          ))}
        </div>

        <div className="fixed inset-x-0 bottom-0 left-0 flex w-full h-16 gap-2 p-2 md:absolute md:h-12 bg-linear-to-b from-transparent to-black/50">
          <input
            placeholder="Type something on your mind..."
            type="text"
            value={sendMsg}
            onChange={(e) => setSendMsg(e.target.value)}
            className="h-full px-3 md:text-sm bg-[#242424] rounded-full focus:outline-none ring-[1.2px] md:ring-1 ring-white/20 w-[84%] md:placeholder:text-xs"
          />
          <div className="aspect-square shrink-0">
            <button
              onClick={() => {
                send(sendMsg);
                setSendMsg('');
              }}
              className="flex items-center justify-center bg-[#247BA0] rounded-full shadow-md size-full shadow-blue-500/10"
            >
              <PaperPlaneTiltIcon
                weight={'fill'}
                className="size-6 md:size-5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
