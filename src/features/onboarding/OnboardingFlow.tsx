import { AxiosError } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserApi } from '../../hooks/useUserApi';
import { BirthDetailsForm } from './components/BirthDetailsForm';
import { InterestsSelection } from './components/InterestsSelection';
import { LanguageSelection } from './components/LanguageSelection';

import OnboardingStepper from '../../components/OnboardingStepper';

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export interface OnboardingData {
  language: string;
  birthDetails: {
    date: Date | undefined;
    time: string;
    place: string;
  };
  selectedThemes: string[];
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { t, i18n } = useTranslation();
  const { updateProfile } = useUserApi();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  // State for each step
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng') || i18n.language);
  const [pendingLanguage, setPendingLanguage] = useState<string | null>(null);
  const [birthDetails, setBirthDetails] = useState<{
    date: Date | undefined;
    time: string;
    place: string;
  }>({
    date: undefined,
    time: '',
    place: '',
  });
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const handleCreateUser = async () => {
    try {
      setError('');

      if (!birthDetails.date || !birthDetails.time || !birthDetails.place) {
        setError('Birth details are required');
        return false;
      }

      // Format date and time for API
      const localDateTime = new Date(
        `${birthDetails.date.toISOString().split('T')[0]}T${birthDetails.time}`
      );
      const utcDateTime = localDateTime.toISOString();
      const [datePart = '', timePart = ''] = utcDateTime.split('T');
      const timeWithoutSeconds = timePart.substring(0, 5); // Get only HH:mm

      // Update the user's profile with onboarding data
      const userId = parseInt(localStorage.getItem('userId') || '', 10);
      if (!userId) {
        setError('User ID not found');
        return false;
      }

      await updateProfile(userId, {
        date_of_birth: datePart,
        time_of_birth: timeWithoutSeconds,
        place_of_birth: birthDetails.place.trim(),
        preferred_language: language,
        area_of_interests: selectedThemes,
      });

      return true;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || 'An error occurred during user creation');
      return false;
    }
  };

  return (
    <div className="relative flex h-full flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <AnimatePresence>
        {isChangingLanguage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="flex items-center space-x-3 text-lg text-white"
            >
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
              <span className="animate-pulse">{t('common.loading')}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-none">
        <OnboardingStepper
          steps={['Choose Language', 'Birth Details', 'Select Interests']}
          currentStep={step}
          setCurrentStep={setStep}
        />
      </div>
      <div className="flex-1 overflow-hidden">
        {step === 0 && (
          <LanguageSelection
            onNext={async () => {
              if (pendingLanguage && pendingLanguage !== language) {
                setIsChangingLanguage(true);
                try {
                  await i18n.changeLanguage(pendingLanguage);
                  localStorage.setItem('i18nextLng', pendingLanguage);
                  setLanguage(pendingLanguage);
                  // Add a small delay for smooth transition
                  await new Promise(resolve => setTimeout(resolve, 300));
                } catch (error) {
                  console.error('Error changing language:', error);
                } finally {
                  setIsChangingLanguage(false);
                }
              }
              setStep(1);
            }}
            selectedLanguage={language}
            onLanguageChange={lang => setPendingLanguage(lang)}
          />
        )}

        {step === 1 && (
          <BirthDetailsForm
            onNext={() => setStep(2)}
            birthDetails={birthDetails}
            onBirthDetailsChange={details => setBirthDetails({ ...birthDetails, ...details })}
          />
        )}

        {step === 2 && (
          <InterestsSelection
            selectedInterests={selectedThemes}
            onInterestsChange={setSelectedThemes}
            onNext={async () => {
              const success = await handleCreateUser();
              if (success) {
                onComplete({
                  language,
                  birthDetails,
                  selectedThemes,
                });
              }
            }}
            error={error}
          />
        )}

      </div>
    </div>
  );
};
