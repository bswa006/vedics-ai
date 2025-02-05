import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import { Checkbox } from '../../../components/ui/checkbox';
import { Label } from '../../../components/ui/label';

export interface Theme {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export const PREDICTION_THEMES: Theme[] = [
  {
    id: 'daily-horoscope',
    icon: '🌟',
    title: 'onboarding.themes.dailyHoroscope.title',
    description: 'onboarding.themes.dailyHoroscope.description',
  },
  {
    id: 'career-finance',
    icon: '💼',
    title: 'onboarding.themes.careerFinance.title',
    description: 'onboarding.themes.careerFinance.description',
  },
  {
    id: 'relationships-love',
    icon: '❤️',
    title: 'onboarding.themes.relationshipsLove.title',
    description: 'onboarding.themes.relationshipsLove.description',
  },
  {
    id: 'health-wellbeing',
    icon: '🧘‍♂️',
    title: 'onboarding.themes.healthWellbeing.title',
    description: 'onboarding.themes.healthWellbeing.description',
  },
  {
    id: 'family-social',
    icon: '👨‍👩‍👧‍👦',
    title: 'onboarding.themes.familySocial.title',
    description: 'onboarding.themes.familySocial.description',
  },
  {
    id: 'spiritual-growth',
    icon: '🕉️',
    title: 'onboarding.themes.spiritualGrowth.title',
    description: 'onboarding.themes.spiritualGrowth.description',
  },
  {
    id: 'strengths-weaknesses',
    icon: '💪',
    title: 'onboarding.themes.strengthsWeaknesses.title',
    description: 'onboarding.themes.strengthsWeaknesses.description',
  },
  {
    id: 'challenges-remedies',
    icon: '🔮',
    title: 'onboarding.themes.challengesRemedies.title',
    description: 'onboarding.themes.challengesRemedies.description',
  },
  {
    id: 'travel-settlements',
    icon: '✈️',
    title: 'onboarding.themes.travelSettlements.title',
    description: 'onboarding.themes.travelSettlements.description',
  },
  {
    id: 'wealth-luck',
    icon: '🎯',
    title: 'onboarding.themes.wealthLuck.title',
    description: 'onboarding.themes.wealthLuck.description',
  },
];

export interface PredictionThemesProps {
  onNext: () => void;
  selectedThemes: string[];
  onThemeToggle: (themeId: string) => void;
}

export const PredictionThemes: React.FC<PredictionThemesProps> = ({
  onNext,
  selectedThemes,
  onThemeToggle,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          {t('onboarding.themes.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('onboarding.themes.description')}
        </p>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        {PREDICTION_THEMES.map((theme) => (
          <div
            key={theme.id}
            className="flex items-start space-x-3 p-3 rounded-lg border"
          >
            <Checkbox
              id={theme.id}
              checked={selectedThemes.includes(theme.id)}
              onCheckedChange={() => onThemeToggle(theme.id)}
            />
            <div className="space-y-1">
              <Label
                htmlFor={theme.id}
                className="text-base font-medium cursor-pointer"
              >
                {theme.icon} {t(theme.title)}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t(theme.description)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <Button
          onClick={onNext}
          className="w-full"
          size="lg"
          disabled={selectedThemes.length === 0}
        >
          {t('common.next')}
        </Button>
      </div>
    </div>
  );
};
