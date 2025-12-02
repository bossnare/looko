import {
  ChatTextIcon,
  PaperPlaneTiltIcon,
  UserIcon,
} from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState, type FormEvent } from 'react';
import logo from './logo.svg';
import { colors } from './pkg.ts/some';
import { getRandom } from './utils/get-random';
import type { Message, User } from './types/chat.type';
import { fakeUsers } from './data/fake';

const color = getRandom(colors);
const tabId = crypto.randomUUID();

const boxVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

const messageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const dateFormat = (date: number) => {
  const d = new Date(date);
  return d.toLocaleString('fr-FR').split(' ')[1];
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');
    setWs(socket);

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      setMessages((prev) => [...prev, msg]);
    };

    return () => socket.close();
  }, []);

  const send = (msg: Message) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(msg));
    }
  };

  return { messages, send };
};

export function SocketTester() {
  const { messages, send } = useChat();
  const nullMsg = messages.length < 1;
  const testers = sessionStorage.getItem(`testers_${tabId}`);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  console.log(testers);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const content = formData.get('content') as string;

    if (!content) return;

    const msg: Message = {
      id: crypto.randomUUID(),
      content,
      color: getRandom(colors),
      sentAt: Date.now(),
      user: selectedUser,
    };

    send(msg);
    form.reset();
  };

  const handleSelect = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const tester = formData.get('tester') as string;

    if (!tester) return;

    const selectedTester = fakeUsers.filter((u) => u.id === tester)[0];
    sessionStorage.setItem(
      `testers_${tabId}`,
      JSON.stringify({ selectedTester })
    );
    setSelectedUser(selectedTester);

    form.reset();
  };

  console.log(messages);

  return (
    <div className="md:flex md:gap-8 justify-center max-h-screen py-4">
      <div className="w-full h-[calc(100dvh-56px)] md:w-64 md:h-120 bg-[#1a1a1a] rounded-3xl rounded-b-none md:rounded-xl p-4 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {nullMsg ? (
            <motion.div
              key={'box-1'}
              variants={boxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 40,
                mass: 1.2,
              }}
              className="flex items-center justify-center gap-2 text-gray-500"
            >
              <p className="md:text-xs">
                Start to{' '}
                {selectedUser ? 'send a message.' : 'select a test user'}
              </p>
              {selectedUser ? (
                <ChatTextIcon className="size-5" />
              ) : (
                <UserIcon className="size-5" />
              )}
            </motion.div>
          ) : (
            <motion.div
              key={'box-2'}
              variants={boxVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 40,
                mass: 1.2,
              }}
              className="flex gap-2 mb-4"
            >
              <div
                style={{ backgroundColor: `${color}` }}
                className="p-1 rounded-full size-14 md:size-8 ring-2 ring-blue-500"
              >
                <img src={logo} alt="Bun" className="size-full" />
              </div>
              <div className="-space-y-1">
                <h3 className="text-lg font-bold md:text-sm p-0">
                  WebSocket Tester
                </h3>
                <p className="text-gray-400 text-xs">online</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* show message */}
        <motion.div
          variants={messageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 40,
            mass: 1.2,
          }}
          className="flex flex-col items-start pb-20 space-y-1 overflow-y-auto max-h-100 scrollbar-none"
        >
          {messages.map((msg, i) => (
            <div
              key={msg.id}
              className={`${
                selectedUser?.id === msg?.user?.id ? 'ml-auto' : ''
              } min-w-20 max-w-[98%]`}
            >
              <span className="text-xs text-gray-400">
                {selectedUser?.id !== msg?.user?.id && msg?.user?.username}
              </span>
              <p
                className={`${
                  selectedUser?.id === msg?.user?.id
                    ? 'bg-blue-600'
                    : 'bg-gray-600'
                } px-2 relative py-2 truncate line-clamp-3 min-h-8 rounded-lg md:text-xs`}
              >
                {msg?.content || 'Message deleted by daemon'}
              </p>
              <span className="text-[10px] text-gray-500">
                {dateFormat(msg?.sentAt)}
              </span>
            </div>
          ))}
        </motion.div>

        <form
          onSubmit={selectedUser ? handleSubmit : handleSelect}
          className="fixed inset-x-0 bottom-0 left-0 flex w-full h-16 gap-2 p-2 md:absolute md:h-12 bg-linear-to-b from-transparent to-black/50"
        >
          {selectedUser ? (
            <>
              <input
                name="content"
                placeholder="Type something on your mind..."
                type="text"
                // value={sendMsg?.content}
                className="h-full px-3 md:text-sm bg-[#242424] rounded-full focus:outline-none ring-[1.2px] md:ring-1 ring-white/20 w-[84%] md:placeholder:text-xs"
              />
              <div className="aspect-square shrink-0">
                <button
                  type="submit"
                  className="flex items-center justify-center bg-blue-600 rounded-full shadow-md size-full shadow-blue-500/10"
                >
                  <PaperPlaneTiltIcon
                    weight={'fill'}
                    className="size-6 md:size-5"
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              <select
                name="tester"
                className="h-full px-3 md:text-xs bg-[#242424] rounded-sm focus:outline-none ring-[1.2px] md:ring-1 ring-white/20 w-[84%] md:placeholder:text-xs"
              >
                <option value="" className="text-gray-500">
                  Pick your test user
                </option>
                {fakeUsers.map((u) => (
                  <option value={u.id}>{u.username}</option>
                ))}
              </select>
              <div className="w-15 shrink-0">
                <button
                  type="submit"
                  className="flex items-center justify-center bg-blue-600 rounded-sm md:text-xs shadow-md size-full shadow-blue-500/10"
                >
                  Select
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      {/* other */}
    </div>
  );
}
