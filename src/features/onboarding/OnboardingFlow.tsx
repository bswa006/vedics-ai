import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserApi } from '../../hooks/useUserApi';
import { AxiosError } from 'axios';
import { WelcomeScreen } from './components/WelcomeScreen';
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
  const totalSteps = 5;
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

  const handleComplete = async () => {
    try {
      setError('');

      if (!birthDetails.date || !birthDetails.time || !birthDetails.place) {
        setError('Birth details are required');
        return;
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

        // Complete onboarding
        onComplete({
          language,
          birthDetails,
          selectedThemes,
        });

        // Redirect to home page
        navigate('/', { replace: true });
        window.location.reload();
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || 'An error occurred during user creation');
    }
  };

  return (
    <div className="flex h-full flex-col space-y-6 p-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <OnboardingProgress currentStep={step} totalSteps={totalSteps} />
      </div>

      <div className="flex-1 overflow-hidden rounded-xl">
        <div className="flex h-full flex-col">
          {step === 1 && <WelcomeScreen onContinue={() => setStep(2)} />}

          {step === 2 && (
            <LanguageSelection
              onNext={() => setStep(3)}
              selectedLanguage={language}
              onLanguageChange={lang => {
                setLanguage(lang);
                i18n.changeLanguage(lang);
              }}
            />
          )}

          {step === 3 && (
            <BirthDetailsForm
              onNext={() => setStep(4)}
              birthDetails={birthDetails}
              onBirthDetailsChange={details => setBirthDetails({ ...birthDetails, ...details })}
            />
          )}

          {step === 4 && (
            <InterestsSelection
              selectedInterests={selectedThemes}
              onInterestsChange={setSelectedThemes}
              onNext={() => setStep(5)}
            />
          )}

          {step === 5 && <FinalWelcome onComplete={handleComplete} error={error} />}
        </div>
      </div>
    </div>
  );
};
