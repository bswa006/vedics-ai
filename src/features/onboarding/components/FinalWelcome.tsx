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
    <div className="flex h-full max-h-screen flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-6xl"
          >
            🎉
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-3xl font-bold text-primary">
              {t('onboarding.final.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('onboarding.final.description')}
            </p>
            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <div className="flex-none p-6">
        <Button
          onClick={onComplete}
          className="h-12 w-full text-base"
        >
          {t('onboarding.final.cta')}
        </Button>
      </div>
    </div>
  );
};
