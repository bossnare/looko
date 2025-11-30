import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export const VibesGenerator = () => {
  const [color, setColor] = useState<string | null>(null);
  const [punch, setPunch] = useState<string | null>(null);

  const colors = [
    '#84DCC6',
    '#D63DFF',
    '#ACD7EC',
    '#8B95C9',
    '#478978',
    '#140D4F',
    '#7765E3',
    '#EDD3C4',
    '#3B60E4',
  ];
  const punchs = [
    'Allez vas-y !',
    "Oh lala, j'adore ça !",
    'Spectaculaire !',
    'Tu es un frère de Chuck Norris.',
    'Ta couleur preférée.',
    "Bonne année n'est pas loin !",
    'Pétit frère de Zuckerberg.',
    'Bon voyage !',
    'Bonne chance !',
    "I'm good !",
  ];

  const getRandom = (arr: string[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const textVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      setColor(getRandom(colors));
      setPunch(getRandom(punchs));
    }, 3000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="flex flex-col items-center transition-colors duration-300 will-change-auto justify-center min-h-screen px-4 bg-linear-to-b from-black via-[#242424] to-transparent gap-18"
    >
      <div className="relative flex size-40">
        <span
          style={{ backgroundColor: `${color}` }}
          className="absolute inline-flex animate-ping! opacity-50 h-full w-full rounded-full"
        ></span>
        <span
          style={{ backgroundColor: `${color}` }}
          className="bg-linear-to-b from-[#242424] transition-colors will-change-auto duration-300 linear inline-flex to-transparent animate-pulse! brightness-140 size-full rounded-full"
        ></span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={punch}
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 40,
            mass: 1.2,
          }}
          className="text-3xl font-extrabold transform-gpu"
        >
          {punch}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
