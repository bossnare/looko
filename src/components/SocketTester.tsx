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
    <div className="pt-12">
      {/* <h1 className="text-center text-3xl font-bold ">Socket Tester</h1>
      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))} */}

      <div className="w-60 h-120 bg-gray-800 mx-auto rounded-xl p-4 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 h-10 bg-linear-to-b from-transparent to-black/40 w-full p-2 flex gap-2">
          <input type="text" className="h-full grow" />
          <button className="shrink-0 bg-blue-500 rounded-full">Send</button>
        </div>
      </div>
    </div>
  );
}
