import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { cn } from '../../../lib/utils';
import { Checkbox } from '../../../components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';

interface Interest {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface InterestsSelectionProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  onNext: () => Promise<void>;
  error?: string;
}

export const InterestsSelection: React.FC<InterestsSelectionProps> = ({
  selectedInterests,
  onInterestsChange,
  onNext,
  error,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleNext = async () => {
    setIsLoading(true);
    try {
      await onNext();
    } finally {
      setIsLoading(false);
    }
  };

  const INTERESTS: Interest[] = [
    {
      id: 'daily-horoscope',
      icon: '⭐',
      title: t('onboarding.themes.dailyHoroscope.title'),
      description: t('onboarding.themes.dailyHoroscope.description'),
    },
    {
      id: 'career-finance',
      icon: '💼',
      title: t('onboarding.themes.careerFinance.title'),
      description: t('onboarding.themes.careerFinance.description'),
    },
    {
      id: 'relationships-love',
      icon: '❤️',
      title: t('onboarding.themes.relationshipsLove.title'),
      description: t('onboarding.themes.relationshipsLove.description'),
    },
    {
      id: 'health-wellness',
      icon: '🌿',
      title: t('onboarding.themes.healthWellbeing.title'),
      description: t('onboarding.themes.healthWellbeing.description'),
    },
    {
      id: 'spiritual-growth',
      icon: '🕉️',
      title: t('onboarding.themes.spiritualGrowth.title'),
      description: t('onboarding.themes.spiritualGrowth.description'),
    },
    {
      id: 'family-social',
      icon: '🏠',
      title: t('onboarding.themes.familySocial.title'),
      description: t('onboarding.themes.familySocial.description'),
    },
    {
      id: 'strengths-weaknesses',
      icon: '🌱',
      title: t('onboarding.themes.strengthsWeaknesses.title'),
      description: t('onboarding.themes.strengthsWeaknesses.description'),
    },
    {
      id: 'challenges-remedies',
      icon: '🛡️',
      title: t('onboarding.themes.challengesRemedies.title'),
      description: t('onboarding.themes.challengesRemedies.description'),
    },
    {
      id: 'travel-settlements',
      icon: '✈️',
      title: t('onboarding.themes.travelSettlements.title'),
      description: t('onboarding.themes.travelSettlements.description'),
    },
    {
      id: 'wealth-luck',
      icon: '💰',
      title: t('onboarding.themes.wealthLuck.title'),
      description: t('onboarding.themes.wealthLuck.description'),
    },
  ];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      onInterestsChange(selectedInterests.filter(i => i !== id));
    } else {
      onInterestsChange([...selectedInterests, id]);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[#1a1b26] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-white">
      <motion.div
        className="flex-none space-y-3 p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          {t('onboarding.themes.title')}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-gray-400/80">
          {t('onboarding.themes.description')}
        </p>
      </motion.div>

      <motion.div
        className="flex-1 overflow-y-auto px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-4 pb-6">
          {INTERESTS.map((interest, index) => (
            <motion.div
              key={interest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                'flex cursor-pointer items-start space-x-4 rounded-xl border border-gray-700/50 p-5 backdrop-blur-sm',
                'group transition-all duration-300 ease-in-out',
                'hover:border-blue-500/30 hover:bg-blue-500/5 hover:shadow-lg hover:shadow-blue-500/5',
                selectedInterests.includes(interest.id) && 'border-blue-500/50 bg-blue-500/10'
              )}
              onClick={() => toggleInterest(interest.id)}
            >
              <div className="mt-1 flex-shrink-0">
                <Checkbox
                  checked={selectedInterests.includes(interest.id)}
                  className={cn(
                    'h-5 w-5 border-2 transition-all duration-300',
                    'border-gray-500/50 text-blue-500',
                    'group-hover:border-blue-400/50',
                    selectedInterests.includes(interest.id) && 'border-blue-500'
                  )}
                  onCheckedChange={() => {
                    toggleInterest(interest.id);
                  }}
                  onClick={e => e.stopPropagation()}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl drop-shadow-[0_0_0.5rem_rgba(59,130,246,0.5)] filter transition-transform duration-300 group-hover:scale-110">
                    {interest.icon}
                  </span>
                  <Label className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-lg font-semibold text-transparent">
                    {interest.title}
                  </Label>
                </div>
                <p className="text-sm leading-relaxed text-gray-400">{interest.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex-none space-y-4 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          onClick={handleNext}
          disabled={selectedInterests.length === 0 || isLoading}
          className="relative w-full rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-3.5 transition-all group-hover:bg-opacity-0"
        >
          {t('common.next')}
        </Button>
      </motion.div>
    </div>
  );
};
