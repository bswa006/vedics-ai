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
    <div className="w-full max-w-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {t('onboarding.progress.step', { current: currentStep, total: totalSteps })}
        </h2>
        <span className="text-sm font-medium text-primary">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>
      
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={cn(
            "absolute left-0 h-full rounded-full bg-primary transition-all duration-500 ease-out",
            currentStep === totalSteps && "animate-pulse"
          )}
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      
      <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Start</span>
        <span>Finish</span>
      </div>
    </div>
  );
};
