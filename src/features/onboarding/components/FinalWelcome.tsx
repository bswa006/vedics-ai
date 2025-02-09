import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../../lib/utils';

export interface FinalWelcomeProps {
  onComplete: () => Promise<void>;
  error?: string;
}

export const FinalWelcome: React.FC<FinalWelcomeProps> = ({ onComplete, error }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-[#2E2A5D] via-[#1f1d3d] to-[#1a1b26] text-white pt-20">
      <motion.div
        className="flex-none space-y-3 bg-gradient-to-b from-[#2E2A5D] to-[#2E2A5D]/95 p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center text-7xl filter drop-shadow-[0_0_1rem_rgba(59,130,246,0.3)]"
        >
          🎉
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-6 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white/90">
            {t('onboarding.final.title')}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-gray-300/80 mx-auto">
            {t('onboarding.final.description')}
          </p>
            <AnimatePresence mode="wait">
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-sm text-red-400 bg-red-500/10 rounded-lg px-4 py-3 border border-red-500/20"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
      </motion.div>

      <motion.div 
        className="flex-none p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button
          onClick={() => onComplete()}
          className={cn(
            "w-full relative overflow-hidden rounded-xl p-[1px] transition-all",
            "bg-gradient-to-r from-blue-500 to-blue-600",
            "hover:shadow-[0_0_2rem_-0.5rem_#3b82f6]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "group"
          )}
        >
          <div className="relative rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3.5 transition-all group-hover:bg-opacity-0">
            <span className="relative z-10 text-base font-medium text-white">
              {t('onboarding.final.cta')}
            </span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};
