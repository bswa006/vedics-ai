import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { motion } from 'framer-motion';

export interface FinalWelcomeProps {
  onComplete: () => void;
  error?: string;
}

export const FinalWelcome: React.FC<FinalWelcomeProps> = ({ onComplete, error }) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full max-h-screen flex-col bg-gradient-to-br from-[#0B1120]/90 via-[#0F172A]/80 to-[#0B1120]/90">

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-7xl filter drop-shadow-[0_0_1rem_rgba(59,130,246,0.3)]"
          >
            🎉
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {t('onboarding.final.title')}
            </h1>
            <p className="text-lg bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              {t('onboarding.final.description')}
            </p>
            {error && (
              <p className="text-sm text-red-500/90 bg-red-500/10 rounded-lg px-4 py-2 border border-red-500/20">
                {error}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="flex-none p-6">
        <Button
          onClick={onComplete}
          className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-[1px] transition-all hover:shadow-[0_0_2rem_-0.5rem_#3b82f6]"
        >
          <div className="relative rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 transition-all group-hover:bg-opacity-0">
            <span className="relative z-10 text-base font-medium text-white">
              {t('onboarding.final.cta')}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};
