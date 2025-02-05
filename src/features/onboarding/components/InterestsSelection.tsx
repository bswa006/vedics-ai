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
    <div className="flex h-full max-h-screen flex-col">
      <div className="flex-none space-y-2 p-6">
        <h2 className="text-2xl font-semibold">Select Your Areas of Interest</h2>
        <p className="text-muted-foreground">Choose the themes you'd like to focus on</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6">
        <div className="space-y-4 pb-6">
          {INTERESTS.map(interest => (
            <div
              key={interest.id}
              className={cn(
                'hover:bg-accent/5 group relative rounded-lg border p-4',
                'cursor-pointer transition-colors',
                selectedInterests.includes(interest.id) && 'border-primary bg-accent/5'
              )}
              onClick={() => toggleInterest(interest.id)}
            >
              <div className="flex items-start space-x-4">
                <Checkbox
                  id={interest.id}
                  checked={selectedInterests.includes(interest.id)}
                  className="mt-1"
                  onCheckedChange={() => toggleInterest(interest.id)}
                />
                <div className="flex-1 space-y-1">
                  <Label
                    htmlFor={interest.id}
                    className="flex cursor-pointer items-center text-base font-medium"
                  >
                    <span className="mr-2 text-xl">{interest.icon}</span>
                    {interest.title}
                  </Label>
                  <p className="text-muted-foreground text-sm">{interest.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-none p-6">
        <Button
          onClick={onNext}
          className={cn('h-12 w-full text-base', 'disabled:cursor-not-allowed disabled:opacity-50')}
          disabled={selectedInterests.length === 0}
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
