import { ArrowUpIcon } from '@phosphor-icons/react';
import { type FormEvent, useState } from 'react';

export const ChatModel = () => {
  type Chat = {
    message: string;
    type: string;
  };

  const [chat, setChat] = useState<Chat[]>([]);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const msg = formData.get('question') as string;
    if (!msg.trim()) return;

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: msg }),
    });

    const reader = res.body?.getReader();
    while (reader) {
      const { value, done } = await reader.read();
      if (done) break;
      const response: Chat = {
        message: new TextDecoder().decode(value),
        type: 'response',
      };
      setChat((prev) => [...prev, response]);
      console.log(response);
    }
  };

  return (
    <div className="max-h-dvh h-[calc(100dvh-4rem)] w-full relative scrollbar-none overflow-y-auto px-4 bg-black/80">
      <div className="sticky inset-x-0 top-0 flex justify-center py-2 pb-4 text-gray-400">
        <select name="" className="cursor-pointer focus:outline-0">
          <option value="gpt">GPT-5</option>
          <option value="grok">Grok</option>
          <option value="gemini">Geminiaa</option>
        </select>
      </div>
      <div className="h-full mx-auto overflow-y-auto w-4xl scrollbar-none flex flex-col gap-4 *:rounded-md *:w-[calc(100%/2-8px)]">
        <div className="h-10 ml-auto bg-white/4"></div>
        <div className="h-10 bg-white/4"></div>
      </div>
      {/* Input field */}
      <div className="fixed inset-x-0 bottom-0 flex justify-center h-20 bg-linear-to-b from-transparent to-black/50">
        <form
          onSubmit={sendMessage}
          className="flex items-center gap-3 min-w-1/2"
        >
          <input
            placeholder="Ask a question with GPT-5 model"
            type="text"
            name="question"
            className="rounded-full px-5 ring-1 ring-zinc-700 bg-[#181818] focus:outline-0 grow max-w-[90%] h-[55%]"
          />
          <div className="shrink-0 size-11">
            <button className="flex items-center justify-center p-2 bg-blue-600 rounded-full hover:opacity-80 active:opacity-60 size-full">
              <ArrowUpIcon className="size-5" weight={'bold'} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
