import { useEffect, useRef, useState, type FormEvent } from 'react';
import { PaperPlaneTiltIcon } from '@phosphor-icons/react';

export function SocketTester() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      ws.send('Hello from React!');
    };

    ws.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data]);
    };

    return () => ws.close();
  }, []);

  console.log(messages);

  return (
    <div className="pt-14">
      {/* <h1 className="text-3xl font-bold text-center ">Socket Tester</h1>
      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))} */}

      <div className="w-full h-[calc(100dvh-56px)] md:w-60 md:h-120 bg-gray-800 mx-auto rounded-3xl rounded-b-none md:rounded-xl p-4 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 flex w-full h-16 gap-2 p-2 md:h-12 bg-linear-to-b from-transparent to-black/40">
          <input type="text" className="h-full rounded-full grow" />
          <div className="aspect-square shrink-0">
            <button className="flex items-center justify-center bg-blue-500 rounded-full shadow-md size-full shadow-blue-500/10">
              <PaperPlaneTiltIcon weight={'fill'} className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
