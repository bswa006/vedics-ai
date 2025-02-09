import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../../lib/utils';

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-md px-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-white/90">
          {t('onboarding.progress.step', { current: currentStep, total: totalSteps })}
        </h2>
        <span className="text-sm font-medium text-blue-400">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
        <div
          className={cn(
            "absolute left-0 h-full rounded-full bg-gradient-to-r from-[#2E2A5D] to-[#4A4494] transition-all duration-500 ease-out",
            currentStep === totalSteps && "animate-pulse shadow-[0_0_1rem_0_rgba(46,42,93,0.5)]"
          )}
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      <div className="mt-2 flex justify-between text-xs">
        <span className="text-gray-300/80">Start</span>
        <span className="text-gray-300/80">Finish</span>
      </div>
    </div>
  );
};
