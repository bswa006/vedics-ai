import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import React from 'react';

interface OnboardingStepperProps {
  steps: string[];
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

interface StepStatus {
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
}

const OnboardingStepper: React.FC<OnboardingStepperProps> = ({
  steps,
  currentStep,
  setCurrentStep,
}) => {
  const getStepStatus = (index: number): StepStatus => {
    if (index < 0 || index >= steps.length) {
      return { title: '', status: 'pending' };
    }

    // Since we've checked bounds, we can safely assert the title will exist
    const title = steps[index] ?? ''; // Use nullish coalescing for extra safety

    // Ensure currentStep is within bounds
    const validCurrentStep = Math.max(0, Math.min(currentStep, steps.length - 1));

    if (index < validCurrentStep) return { title, status: 'completed' };
    if (index === validCurrentStep) return { title, status: 'in-progress' };
    return { title, status: 'pending' };
  };

  return (
    <div className="w-full select-none py-2">
      <div className="relative mx-auto flex max-w-2xl justify-between">
        {/* Progress track */}
        <div className="absolute left-8 right-8 top-3">
          {/* Background line */}
          <div className="absolute inset-0 h-[2px] rounded-full bg-gray-700/50" />

          {/* Active line */}
          <motion.div
            className="absolute inset-0 h-[2px] origin-left rounded-full bg-blue-500"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: currentStep / (steps.length - 1),
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </div>

        {/* Steps */}
        {steps.map((_, index) => {
          const status = getStepStatus(index);
          return (
            <div
              key={index}
              className="relative flex flex-col items-center"
              style={{ width: '140px' }}
            >
              <button
                onClick={() => (status.status === 'completed' ? setCurrentStep(index) : undefined)}
                className={`relative z-10 mx-auto flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 focus:outline-none ${status.status === 'completed' ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
              >
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
                    status.status === 'completed'
                      ? 'bg-blue-500 ring-2 ring-blue-500'
                      : status.status === 'in-progress'
                        ? 'bg-blue-500 ring-2 ring-blue-500'
                        : 'bg-gray-800 ring-2 ring-gray-700'
                  }`}
                >
                  {status.status === 'completed' && (
                    <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                  )}
                </div>
              </button>

              <div className="mt-3 text-center">
                <div
                  className={`text-sm font-medium tracking-wide transition-all duration-300 ${
                    status.status === 'completed' || status.status === 'in-progress'
                      ? 'text-blue-500'
                      : 'text-gray-400'
                  }`}
                >
                  {status.title}
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
