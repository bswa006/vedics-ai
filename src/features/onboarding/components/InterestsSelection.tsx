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

const INTERESTS: Interest[] = [
  {
    id: 'daily-horoscope',
    icon: '⭐',
    title: 'Daily Horoscope',
    description: 'Get daily personalized insights based on planetary movements',
  },
  {
    id: 'career-finance',
    icon: '💼',
    title: 'Career & Finance',
    description: 'Job opportunities, financial planning, business insights',
  },
  {
    id: 'relationships-love',
    icon: '❤️',
    title: 'Relationships & Love',
    description: 'Romantic compatibility, marriage guidance, partner traits',
  },
  {
    id: 'health-wellness',
    icon: '🌿',
    title: 'Health & Wellness',
    description: 'Physical well-being, mental health, lifestyle recommendations',
  },
  {
    id: 'spiritual-growth',
    icon: '🕉️',
    title: 'Spiritual Growth',
    description: 'Meditation guidance, karma insights, spiritual practices',
  },
  {
    id: 'education-learning',
    icon: '📚',
    title: 'Education & Learning',
    description: 'Academic success, skill development, learning opportunities',
  },
  {
    id: 'travel-adventure',
    icon: '✈️',
    title: 'Travel & Adventure',
    description: 'Auspicious travel times, destination compatibility, journey planning',
  },
  {
    id: 'family-home',
    icon: '🏠',
    title: 'Family & Home',
    description: 'Family relationships, domestic harmony, vastu guidance',
  },
  {
    id: 'personal-growth',
    icon: '🌱',
    title: 'Personal Growth',
    description: 'Self-improvement, personality development, life purpose',
  },
  {
    id: 'wealth-prosperity',
    icon: '💰',
    title: 'Wealth & Prosperity',
    description: 'Financial growth, investments, abundance manifestation',
  },
];

interface InterestsSelectionProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  onNext: () => void;
}

export const InterestsSelection: React.FC<InterestsSelectionProps> = ({
  selectedInterests,
  onInterestsChange,
  onNext,
}) => {
  const { t } = useTranslation();

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
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-300">Step 4 of 5</span>
          <span className="text-sm text-blue-400">80%</span>
        </div>
        <div className="h-1 w-full bg-gray-700 rounded-full mb-4">
          <div className="h-1 bg-blue-500 rounded-full" style={{ width: '80%' }} />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mb-8">
          <span>Start</span>
          <span>Finish</span>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">
          Choose Your Interests
        </h2>
        <p className="text-gray-300 text-sm">
          Choose the themes you'd like to focus on
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
                  onCheckedChange={(checked) => {
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

      <div className="flex-none p-6">
        <Button
          onClick={onNext}
          disabled={selectedInterests.length === 0}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors
            disabled:bg-blue-400/50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
