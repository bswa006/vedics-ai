import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserApi } from '../../hooks/useUserApi';
import { AxiosError } from 'axios';
import { LanguageSelection } from './components/LanguageSelection';
import { BirthDetailsForm } from './components/BirthDetailsForm';
import { InterestsSelection } from './components/InterestsSelection';

import { FinalWelcome } from './components/FinalWelcome';
import { OnboardingProgress } from './components/OnboardingProgress';

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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createUser } = useUserApi();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [error, setError] = useState('');
  const [isChangingLanguage, setIsChangingLanguage] = useState(false);

  const phone = searchParams.get('phone');

  if (!phone) {
    navigate('/login');
    return null;
  }

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

      const userResponse = await createUser({
        date_of_birth: datePart,
        birth_time: timeWithoutSeconds,
        place_of_birth: birthDetails.place.trim(),
        phone: phone,
      });

      if (userResponse.user_id) {
        // Save user ID in localStorage
        localStorage.setItem('userId', userResponse.user_id.toString());
        return true;
      } else {
        setError('Invalid response from server');
        return false;
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || 'An error occurred during user creation');
      return false;
    }
  };

  const handleComplete = () => {
    onComplete({
      language,
      birthDetails,
      selectedThemes,
    });
    navigate('/', { replace: true });
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
      <div className="flex-none p-6">
        <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
      </div>
      <div className="flex-1 overflow-hidden">
        {step === 1 && (
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
              setStep(2);
            }}
            selectedLanguage={language}
            onLanguageChange={lang => setPendingLanguage(lang)}
          />
        )}

        {step === 2 && (
          <BirthDetailsForm
            onNext={() => setStep(3)}
            birthDetails={birthDetails}
            onBirthDetailsChange={details => setBirthDetails({ ...birthDetails, ...details })}
          />
        )}

        {step === 3 && (
          <InterestsSelection
            selectedInterests={selectedThemes}
            onInterestsChange={setSelectedThemes}
            onNext={async () => {
              const success = await handleCreateUser();
              if (success) {
                setStep(4);
              }
            }}
            error={error}
          />
        )}

        {step === 4 && <FinalWelcome onComplete={handleComplete} error={error} />}
      </div>
    </div>
  );
};
