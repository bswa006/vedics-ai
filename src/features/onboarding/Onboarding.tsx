import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../../services/api';
import { InterestsSelection } from './components/InterestsSelection';
import { theme } from '../../styles/theme';

type OnboardingStep = 'welcome' | 'birth-details' | 'interests';

interface BirthDetails {
  date: string;
  time: string;
  place: string;
}

export function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [birthDetails, setBirthDetails] = useState<BirthDetails>({
    date: '',
    time: '',
    place: '',
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (currentStep === 'welcome') setCurrentStep('birth-details');
    else if (currentStep === 'birth-details') setCurrentStep('interests');
  };

  const handleBack = () => {
    if (currentStep === 'interests') setCurrentStep('birth-details');
    else if (currentStep === 'birth-details') setCurrentStep('welcome');
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      // Update user profile with birth details
      const userId = Number(localStorage.getItem('userId'));
      await api.profiles.updateProfile(userId, {
        date_of_birth: birthDetails.date,
        time_of_birth: birthDetails.time,
        place_of_birth: birthDetails.place,
        area_of_interests: selectedInterests,
      });

      // Navigate to home page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-midnightIndigo">
      {/* Background gradient */}
      <div 
        className="pointer-events-none absolute inset-0" 
        style={{ background: theme.gradients.background }}
      />
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-0 h-64 w-64 rounded-full bg-celestialLilac/30 blur-3xl" />
        <div className="absolute -right-4 bottom-0 h-64 w-64 rounded-full bg-vedicSaffron/30 blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and title */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto h-24 w-24"
            >
              <div 
                className="relative h-full w-full rounded-full p-[2px]"
                style={{ background: theme.gradients.primary }}
              >
                <div className="h-full w-full rounded-full bg-midnightIndigo p-4">
                  <div 
                    className="h-full w-full rounded-full opacity-90"
                    style={{ background: theme.gradients.accent }}
                  />
                </div>
              </div>
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`mt-6 text-3xl font-light tracking-tight text-creamWhite ${theme.typography.heading.fontFamily}`}
              style={{ fontWeight: theme.typography.heading.weights.medium }}
            >
              Welcome to Vedics.ai
            </motion.h2>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {currentStep === 'welcome' && (
              <motion.div
                key="welcome"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 rounded-2xl border border-celestialLilac/20 bg-white/5 p-8 backdrop-blur-xl"
              >
                <div className="space-y-4 text-center text-creamWhite">
                  <p className="text-lg">
                    Begin your journey of self-discovery through ancient Vedic wisdom.
                  </p>
                  <p className="text-sm text-creamWhite/80">
                    We'll need some information to provide you with personalized insights.
                  </p>
                </div>
                <button
                  onClick={handleNext}
                  className={`group relative flex w-full justify-center overflow-hidden px-6 py-3.5 text-sm font-medium text-creamWhite shadow-lg backdrop-blur-sm transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-celestialLilac/50 focus:ring-offset-2 active:scale-[0.98] ${theme.typography.body.fontFamily}`}
                style={{ 
                  background: theme.gradients.primary,
                  borderRadius: theme.borderRadius.lg,
                  fontWeight: theme.typography.body.weights.medium 
                }}
                >
                  Begin Journey
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </motion.div>
            )}

            {currentStep === 'birth-details' && (
              <motion.div
                key="birth-details"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 rounded-2xl border border-celestialLilac/20 bg-white/5 p-8 backdrop-blur-xl"
              >
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-creamWhite">
                    Date of Birth
                    <input
                      type="date"
                      value={birthDetails.date}
                      onChange={e => setBirthDetails({ ...birthDetails, date: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-celestialLilac/20 bg-white/5 px-4 py-2 text-creamWhite placeholder-coolGray shadow-sm backdrop-blur-sm transition-all duration-200 focus:border-celestialLilac/40 focus:outline-none focus:ring-2 focus:ring-celestialLilac/20"
                    />
                  </label>
                  <label className="block text-sm font-medium text-creamWhite">
                    Time of Birth
                    <input
                      type="time"
                      value={birthDetails.time}
                      onChange={e => setBirthDetails({ ...birthDetails, time: e.target.value })}
                      className="mt-1 block w-full rounded-xl border border-celestialLilac/20 bg-white/5 px-4 py-2 text-creamWhite placeholder-coolGray shadow-sm backdrop-blur-sm transition-all duration-200 focus:border-celestialLilac/40 focus:outline-none focus:ring-2 focus:ring-celestialLilac/20"
                    />
                  </label>
                  <label className="block text-sm font-medium text-creamWhite">
                    Place of Birth
                    <input
                      type="text"
                      value={birthDetails.place}
                      onChange={e => setBirthDetails({ ...birthDetails, place: e.target.value })}
                      placeholder="Enter your place of birth"
                      className="mt-1 block w-full rounded-xl border border-celestialLilac/20 bg-white/5 px-4 py-2 text-creamWhite placeholder-coolGray shadow-sm backdrop-blur-sm transition-all duration-200 focus:border-celestialLilac/40 focus:outline-none focus:ring-2 focus:ring-celestialLilac/20"
                    />
                  </label>
                </div>
                <div className="flex justify-between space-x-4">
                  <button
                    onClick={handleBack}
                    className={`flex items-center justify-center border border-celestialLilac/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-creamWhite shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-celestialLilac/50 focus:ring-offset-2 active:scale-[0.98] ${theme.typography.body.fontFamily}`}
                    style={{ 
                      borderRadius: theme.borderRadius.lg,
                      fontWeight: theme.typography.body.weights.medium 
                    }}
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!birthDetails.date || !birthDetails.time || !birthDetails.place}
                    className={`flex flex-1 items-center justify-center px-6 py-3.5 text-sm font-medium text-creamWhite shadow-lg backdrop-blur-sm transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-celestialLilac/50 focus:ring-offset-2 active:scale-[0.98] ${theme.typography.body.fontFamily}`}
                    style={{ 
                      background: theme.gradients.primary,
                      borderRadius: theme.borderRadius.lg,
                      fontWeight: theme.typography.body.weights.medium 
                    }}
                  >
                    Next
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 'interests' && (
              <motion.div
                key="interests"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 rounded-2xl border border-celestialLilac/20 bg-white/5 p-8 backdrop-blur-xl"
              >
                <InterestsSelection
                  selectedInterests={selectedInterests}
                  onInterestsChange={setSelectedInterests}
                  onNext={handleSubmit}
                />
                {error && (
                  <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                  </div>
                )}
                <div className="flex justify-between space-x-4">
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center rounded-xl border border-celestialLilac/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-creamWhite shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-celestialLilac/50 focus:ring-offset-2 active:scale-[0.98]"
                  >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading || selectedInterests.length === 0}
                    className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-celestialLilac to-vedicSaffron px-6 py-3.5 text-sm font-medium text-creamWhite shadow-lg backdrop-blur-sm transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-celestialLilac/50 focus:ring-offset-2 active:scale-[0.98]"
                  >
                    {loading ? 'Completing Setup...' : 'Complete Setup'}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
