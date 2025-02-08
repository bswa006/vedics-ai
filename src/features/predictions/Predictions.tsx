import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/ui/Card';

type PredictionType = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface PredictionData {
  type: PredictionType;
  content: string;
  aspects: {
    love: string;
    career: string;
    health: string;
  };
}

export function Predictions() {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<PredictionType>('daily');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual API calls
  const predictions: Record<PredictionType, PredictionData> = {
    daily: {
      type: 'daily',
      content: t('predictions.daily.content'),
      aspects: {
        love: t('predictions.daily.love'),
        career: t('predictions.daily.career'),
        health: t('predictions.daily.health'),
      },
    },
    weekly: {
      type: 'weekly',
      content: t('predictions.weekly.content'),
      aspects: {
        love: t('predictions.weekly.love'),
        career: t('predictions.weekly.career'),
        health: t('predictions.weekly.health'),
      },
    },
    monthly: {
      type: 'monthly',
      content: t('predictions.monthly.content'),
      aspects: {
        love: t('predictions.monthly.love'),
        career: t('predictions.monthly.career'),
        health: t('predictions.monthly.health'),
      },
    },
    yearly: {
      type: 'yearly',
      content: t('predictions.yearly.content'),
      aspects: {
        love: t('predictions.yearly.love'),
        career: t('predictions.yearly.career'),
        health: t('predictions.yearly.health'),
      },
    },
  };

  const timeframes = [
    { type: 'daily', icon: '📅', label: t('predictions.timeframes.daily') },
    { type: 'weekly', icon: '📆', label: t('predictions.timeframes.weekly') },
    { type: 'monthly', icon: '📊', label: t('predictions.timeframes.monthly') },
    { type: 'yearly', icon: '🌟', label: t('predictions.timeframes.yearly') },
  ] as const;

  const aspectIcons = {
    love: '❤️',
    career: '💼',
    health: '🌿',
  };

  return (
    <div className="space-y-6 px-4 py-6">
      {/* Header */}
      <section className="space-y-2">
        <h1 className="font-heading text-2xl font-bold text-deepCharcoal dark:text-creamWhite">
          {t('predictions.title')}
        </h1>
        <p className="text-coolGray dark:text-coolGray/80">
          {t('predictions.subtitle')}
        </p>
      </section>

      {/* Timeframe Selection */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {timeframes.map(({ type, icon, label }) => (
          <motion.button
            key={type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setIsLoading(true);
              setSelectedType(type);
              // Simulate API loading
              setTimeout(() => setIsLoading(false), 500);
            }}
            className={`flex flex-col items-center rounded-xl p-3 text-center transition-colors ${
              selectedType === type
                ? 'bg-celestialLilac/20 text-vedicSaffron'
                : 'bg-celestialLilac/10 text-coolGray hover:bg-celestialLilac/15'
            }`}
          >
            <span className="text-2xl">{icon}</span>
            <span className="mt-1 text-sm font-medium">{label}</span>
          </motion.button>
        ))}
      </section>

      {/* Prediction Content */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-12"
          >
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-vedicSaffron" />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Main Prediction */}
            <Card
              variant="default"
              className="prose prose-lg dark:prose-invert"
              contentClassName="space-y-4"
            >
              <p className="text-lg text-deepCharcoal dark:text-creamWhite">
                {predictions[selectedType].content}
              </p>
            </Card>

            {/* Aspects */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {Object.entries(predictions[selectedType].aspects).map(
                ([aspect, content]) => (
                  <Card
                    key={aspect}
                    variant="interactive"
                    icon={aspectIcons[aspect as keyof typeof aspectIcons]}
                    title={t(`predictions.aspects.${aspect}`)}
                    description={content}
                    className="h-full"
                  />
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
