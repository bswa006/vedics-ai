import React from 'react';
import { motion } from 'framer-motion';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Your profile is currently being reviewed. We\'ll notify you once the verification is complete.'
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-sm dark:from-blue-900/20 dark:to-indigo-900/20"
    >
      <div className="flex-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-2xl"
        >
          ⭐️
        </motion.div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-blue-900/80 dark:text-blue-100/80">
          {message}
        </p>
      </div>
    </motion.div>
  );
};
