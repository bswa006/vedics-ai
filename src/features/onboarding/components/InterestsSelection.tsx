import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { cn } from '../../../lib/utils';
import { Checkbox } from '../../../components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../../../styles/theme';

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
      id: "core_personality_and_life_path",
      icon: "🌟",
      title: "Core Personality and Life Path",
      description: "Understand your fundamental nature and life journey",
    },
    {
      id: "career_success_and_wealth",
      icon: "💼",
      title: "Career Success and Wealth",
      description: "Insights into professional growth and financial prosperity",
    },
    {
      id: "health_and_wellbeing",
      icon: "🌿",
      title: "Health and Wellbeing",
      description: "Guidance for physical and mental wellness",
    },
    {
      id: "relationships_love_and_marriage",
      icon: "❤️",
      title: "Relationships, Love and Marriage",
      description: "Understanding personal relationships and romantic life",
    },
    {
      id: "major_life_periods",
      icon: "⏳",
      title: "Major Life Periods",
      description: "Key phases and transitions in your life journey",
    },
    {
      id: "challenges_and_remedies",
      icon: "🛡️",
      title: "Challenges and Remedies",
      description: "Solutions and guidance for life's obstacles",
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
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-midnight-indigo via-[#1f1d3d] to-[#1a1b26] pt-20">
      <motion.div
        className="flex-none space-y-4 bg-gradient-to-b from-midnight-indigo to-midnight-indigo/95 p-8 font-body"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-cream-white">
          {t('onboarding.themes.title')}
        </h2>
        <p className="max-w-2xl text-base font-normal leading-relaxed text-cool-gray">
          {t('onboarding.themes.description')}
        </p>
      </motion.div>

      <motion.div
        className="flex-1 overflow-y-auto px-6 py-4 pb-32 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
      >
        <div className="space-y-4 pb-6">
          {INTERESTS.map((interest, index) => (
            <motion.div
              key={interest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: parseFloat(theme.animations.transition.normal) / 1000,
                delay: index * 0.05,
                ease: 'easeOut'
              }}
              whileHover={{ 
                scale: 1.02,
                y: -2,
                transition: { duration: parseFloat(theme.animations.transition.fast) / 1000 } 
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: parseFloat(theme.animations.transition.fast) / 1000 } 
              }}
              className={cn(
                'group relative flex cursor-pointer items-start gap-4 rounded-lg border p-5',
                'transition-all duration-300 ease-in-out backdrop-blur-md',
                'hover:border-celestial-lilac/30 hover:bg-celestial-lilac/5',
                'hover:shadow-light-md hover:shadow-celestial-lilac/5',
                selectedInterests.includes(interest.id) && 'border-vedic-saffron/50 bg-vedic-saffron/10',
                'font-body'
              )}
              onClick={() => toggleInterest(interest.id)}
            >
              <div className="mt-1 flex-shrink-0">
                <Checkbox
                  checked={selectedInterests.includes(interest.id)}
                  className={cn(
                    'h-5 w-5 border-2 transition-all duration-300',
                    'border-celestial-lilac/50 text-vedic-saffron',
                    'group-hover:border-celestial-lilac',
                    selectedInterests.includes(interest.id) && 'border-vedic-saffron scale-110'
                  )}
                  onCheckedChange={() => {
                    toggleInterest(interest.id);
                  }}
                  onClick={e => e.stopPropagation()}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2">
                  <motion.span 
                    className="text-2xl drop-shadow-[0_0_8px_rgba(127,122,202,0.5)]"
                    animate={{ scale: selectedInterests.includes(interest.id) ? 1.1 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {interest.icon}
                  </motion.span>
                  <Label 
                    className="font-heading text-lg font-medium text-cream-white transition-colors duration-300"
                  >
                    {interest.title}
                  </Label>
                </div>
                <p className="text-sm font-normal leading-relaxed text-cool-gray/80 transition-colors duration-300">
                  {interest.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="fixed inset-x-0 bottom-0 space-y-4 bg-gradient-to-t from-[#1a1b26] to-[#1a1b26]/95 p-8 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.3,
          delay: 0.15,
          ease: 'easeOut'
        }}
      >
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ 
                duration: parseFloat(theme.animations.transition.fast) / 1000,
                ease: 'easeOut'
              }}
              className="rounded-lg border border-status-red/20 bg-status-red/10 px-4 py-3 text-sm font-medium text-status-red font-body"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          onClick={handleNext}
          disabled={selectedInterests.length === 0 || isLoading}
          className={cn(
            'relative w-full overflow-hidden rounded-xl p-[1px] transition-all',
            'bg-gradient-to-r from-[#F6A623] to-[#F6A623]/90',
            'hover:shadow-[0_0_2rem_-0.5rem_#F6A623]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'group'
          )}
        >
          <div className="relative rounded-xl bg-gradient-to-r from-[#F6A623] to-[#F6A623]/90 px-8 py-3.5 transition-all group-hover:bg-opacity-0">
            <span className="relative z-10 text-base font-medium text-white">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  {t('common.loading')}
                </span>
              ) : (
                t('common.next')
              )}
            </span>
          </div>
        </Button>
      </motion.div>
    </div>
  );
};
