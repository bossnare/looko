import { colors, punchs } from '@/pkg.ts/some';
import { getRandom } from '@/utils/get-random';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export const VibesGenerator = () => {
  const [color, setColor] = useState<string | null>(null);
  const [punch, setPunch] = useState<string | null>(null);

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
          className="bg-linear-to-b from-[#242424] transition-all will-change-auto duration-300 linear inline-flex to-transparent animate-pulse! brightness-200 size-full rounded-full"
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
          className="text-3xl font-extrabold text-center transform-gpu"
        >
          {punch}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
