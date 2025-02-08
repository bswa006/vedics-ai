import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React from 'react';

interface OnboardingStepperProps {
  steps: Array<{
    title: string;
    subtitle: string;
  }>;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

interface StepStatus {
  title: string;
  subtitle: string;
  status: 'completed' | 'in-progress' | 'pending';
}

const OnboardingStepper: React.FC<OnboardingStepperProps> = ({
  steps,
  currentStep,
  setCurrentStep,
}) => {
  const getStepStatus = (index: number): StepStatus => {
    if (index < 0 || index >= steps.length) {
      return { title: '', subtitle: '', status: 'pending' };
    }

    // Since we've checked bounds, we can safely assert the title will exist
    const step = steps[index] ?? { title: '', subtitle: '' }; // Use nullish coalescing for extra safety

    // Ensure currentStep is within bounds
    const validCurrentStep = Math.max(0, Math.min(currentStep, steps.length - 1));

    if (index < validCurrentStep) return { title: step.title, subtitle: step.subtitle, status: 'completed' };
    if (index === validCurrentStep) return { title: step.title, subtitle: step.subtitle, status: 'in-progress' };
    return { title: step.title, subtitle: step.subtitle, status: 'pending' };
  };

  return (
    <div className="w-full select-none py-8">
      <div className="relative mx-auto flex max-w-xl justify-between px-4">
        {/* Progress track */}
        <div className="absolute left-12 right-12 top-3">
          {/* Background line */}
          <div className="absolute inset-0 h-0.5 rounded-full bg-gray-700/30" />

          {/* Active line */}
          <motion.div
            className="absolute inset-0 h-0.5 origin-left rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: currentStep / (steps.length - 1),
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>

        {/* Steps */}
        {steps.map((_, index) => {
          const status = getStepStatus(index);
          return (
            <div
              key={index}
              className="relative flex flex-col items-center"
              style={{ width: '120px' }}
            >
              <button
                onClick={() => (status.status === 'completed' ? setCurrentStep(index) : undefined)}
                className={`relative z-10 mx-auto flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 focus:outline-none ${status.status === 'completed' ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
                    status.status === 'completed'
                      ? 'bg-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-400/50'
                      : status.status === 'in-progress'
                        ? 'bg-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-400/50'
                        : 'bg-gray-800/50 backdrop-blur-sm ring-2 ring-gray-700/50'
                  }`}
                >
                  {status.status === 'completed' && (
                    <Check className="h-4 w-4 text-white" strokeWidth={2.5} />
                  )}
                </div>
              </button>

              <div className="mt-3.5 flex h-10 flex-col items-center justify-center text-center">
                <div
                  className={`text-sm font-medium leading-tight tracking-wide transition-all duration-300 ${
                    status.status === 'completed' || status.status === 'in-progress'
                      ? 'text-blue-400'
                      : 'text-gray-500/50'
                  }`}
                >
                  {status.title}
                </div>
                <div
                  className={`text-xs font-medium leading-tight tracking-wide transition-all duration-300 ${
                    status.status === 'completed' || status.status === 'in-progress'
                      ? 'text-blue-400/70'
                      : 'text-gray-500/30'
                  }`}
                >
                  {status.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingStepper;
