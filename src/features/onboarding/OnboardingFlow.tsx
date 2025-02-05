import React, { useState } from 'react';
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
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { createUser } = useUserApi();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [error, setError] = useState('');

  const phone = searchParams.get('phone');

  if (!phone) {
    navigate('/login');
    return null;
  }

  // State for each step
  const [language, setLanguage] = useState(i18n.language);
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
    window.location.reload();
  };

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="flex-none p-6">
        <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
      </div>
      <div className="flex-1 overflow-hidden">
        {step === 1 && (
          <LanguageSelection
            onNext={() => setStep(2)}
            selectedLanguage={language}
            onLanguageChange={lang => {
              setLanguage(lang);
              i18n.changeLanguage(lang);
            }}
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
