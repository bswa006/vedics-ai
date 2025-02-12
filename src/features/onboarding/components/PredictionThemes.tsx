import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-[#2E2A5D] via-[#1f1d3d] to-[#1a1b26] text-white pt-20">
      <motion.div
        className="flex-none space-y-3 bg-gradient-to-b from-[#2E2A5D] to-[#2E2A5D]/95 p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight text-white/90">
          {t('onboarding.themes.title')}
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-gray-300/80">
          {t('onboarding.themes.description')}
        </p>
      </motion.div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto px-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
        {PREDICTION_THEMES.map((theme) => (
          <div
            key={theme.id}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white/10 hover:shadow-[0_0_1rem_-0.25rem_#3b82f6]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="relative flex items-start space-x-4">
              <Checkbox
                id={theme.id}
                checked={selectedThemes.includes(theme.id)}
                onCheckedChange={() => onThemeToggle(theme.id)}
                className="h-5 w-5 mt-1 border-white/20 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500 transition-colors"
              />
              <div className="space-y-2 flex-1">
                <Label
                  htmlFor={theme.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <span className="text-2xl filter group-hover:brightness-110">{theme.icon}</span>
                  <span className="text-lg font-medium bg-gradient-to-r from-white via-white to-white/90 bg-clip-text text-transparent group-hover:to-white">
                    {t(theme.title)}
                  </span>
                </Label>
                <p className="bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent text-sm pl-1">
                  {t(theme.description)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <Button
          onClick={onNext}
          disabled={selectedThemes.length === 0}
          className={`group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-[1px] transition-all hover:shadow-[0_0_2rem_-0.5rem_#3b82f6] ${selectedThemes.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <div className="relative rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 transition-all group-hover:bg-opacity-0">
            <span className="relative z-10 text-base font-medium text-white">
              {t('common.next')}
            </span>
          </div>
        </Button>
      </div>
    </div>
  );
};
