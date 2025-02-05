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
    <div className="flex h-full max-h-screen flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <motion.div 
        className="flex-none space-y-3 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
          {t('onboarding.themes.title')}
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl">
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
                "flex items-start space-x-4 p-5 rounded-xl border border-gray-700/50 cursor-pointer backdrop-blur-sm",
                "transition-all duration-300 ease-in-out group",
                "hover:border-blue-500/30 hover:bg-blue-500/5 hover:shadow-lg hover:shadow-blue-500/5",
                selectedInterests.includes(interest.id) && "border-blue-500/50 bg-blue-500/10"
              )}
              onClick={() => toggleInterest(interest.id)}
            >
              <div className="flex-shrink-0 mt-1">
                <Checkbox
                  checked={selectedInterests.includes(interest.id)}
                  className={cn(
                    "h-5 w-5 border-2 transition-all duration-300",
                    "border-gray-500/50 text-blue-500",
                    "group-hover:border-blue-400/50",
                    selectedInterests.includes(interest.id) && "border-blue-500"
                  )}
                  onCheckedChange={() => {
                    toggleInterest(interest.id);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl filter drop-shadow-[0_0_0.5rem_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-300">
                    {interest.icon}
                  </span>
                  <Label className="text-lg font-semibold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                    {interest.title}
                  </Label>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {interest.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="flex-none p-6 space-y-4"
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
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          onClick={handleNext}
          disabled={selectedInterests.length === 0 || isLoading}
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
              {isLoading ? t('common.loading') : t('onboarding.interests.next')}
            </span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};
