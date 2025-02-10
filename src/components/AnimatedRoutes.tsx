import { ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface AnimatedRoutesProps {
  children: ReactNode;
}

export function AnimatedRoutes({ children }: AnimatedRoutesProps) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const slideVariants = {
    enter: {
      x: shouldReduceMotion ? 0 : 20,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: shouldReduceMotion ? 0 : -20,
      opacity: 0,
    },
  };

  const transition = {
    duration: 0.25,
    ease: [0.32, 0.72, 0, 1],
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
