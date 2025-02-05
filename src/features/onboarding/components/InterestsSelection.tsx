import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { cn } from '../../../lib/utils';
import { Checkbox } from '../../../components/ui/checkbox';

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
    <div className="flex h-full max-h-screen flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="flex-none space-y-2 p-6">
        <h2 className="text-2xl font-semibold text-white mb-2">
          {t('onboarding.themes.title')}
        </h2>
        <p className="text-gray-300 text-sm">
          {t('onboarding.themes.description')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        <div className="space-y-6 pb-6">
          {INTERESTS.map(interest => (
            <div
              key={interest.id}
              className={cn(
                "flex items-start space-x-3 p-4 rounded-lg border border-gray-700/50 cursor-pointer",
                "transition-all duration-200 hover:border-blue-500/30 hover:bg-blue-500/5",
                selectedInterests.includes(interest.id) && "border-blue-500/50 bg-blue-500/10"
              )}
              onClick={() => toggleInterest(interest.id)}
            >
              <div className="flex-shrink-0 mt-1">
                <Checkbox
                  checked={selectedInterests.includes(interest.id)}
                  className="h-5 w-5 border-2 border-gray-200 text-blue-500"
                  onCheckedChange={() => {
                    toggleInterest(interest.id);
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{interest.icon}</span>
                  <Label
                    className="text-base text-white font-medium"
                  >
                    {interest.title}
                  </Label>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {interest.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-none p-6 space-y-4">
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-500/90">
            {error}
          </div>
        )}
        <Button
          onClick={handleNext}
          disabled={selectedInterests.length === 0 || isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors
            disabled:bg-blue-400/50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
        >
          {t('onboarding.interests.next')}
        </Button>
      </div>
    </div>
  );
};
