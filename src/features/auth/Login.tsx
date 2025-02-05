import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Clock, MapPin } from 'lucide-react';
import { useUserApi } from '../../hooks/useUserApi';
import { AxiosError } from 'axios';

interface FormData {
  phoneNumber: string;
  dateOfBirth: string;
  timeOfBirth: string;
  locationOfBirth: string;
}

interface ValidationResponse {
  user?: {
    id: number;
  };
}

export function Login() {
  const navigate = useNavigate();
  const { createUser, validatePhoneNumber, loading } = useUserApi();
  const [error, setError] = useState('');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: '',
    dateOfBirth: '',
    timeOfBirth: '',
    locationOfBirth: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Validate required fields
      if (
        !formData.dateOfBirth ||
        !formData.timeOfBirth ||
        !formData.locationOfBirth ||
        !formData.phoneNumber
      ) {
        setError('All fields are required');
        return;
      }

      // Combine date and time into a single UTC datetime
      const localDateTime = new Date(`${formData.dateOfBirth}T${formData.timeOfBirth}`);
      const utcDateTime = localDateTime.toISOString();

      // Format the date and time strings according to the API requirements
      const [datePart = '', timePart = ''] = utcDateTime.split('T');
      const timeWithoutSeconds: string = timePart.substring(0, 5); // Get only HH:mm

      const userResponse = await createUser({
        date_of_birth: datePart,
        birth_time: timeWithoutSeconds,
        place_of_birth: formData.locationOfBirth?.trim() || '',
        phone: formData.phoneNumber.replace(/\D/g, ''),
      });

      if (userResponse.user_id) {
        localStorage.setItem('userId', userResponse.user_id.toString());
        navigate(
          `/onboarding?phone=${encodeURIComponent(formData.phoneNumber.replace(/\D/g, ''))}`
        );
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || 'An error occurred during login');
    } finally {
      // setLoading(false); // Removed this line
    }
  };

  const validateAndShowFields = async (phoneNumber: string) => {
    try {
      setError('');
      const response = (await validatePhoneNumber(phoneNumber)) as ValidationResponse;

      if (response.user) {
        // Store user ID and trigger a page reload to ensure App state is updated
        localStorage.setItem('userId', response.user.id.toString());
        window.location.href = '/';
      } else {
        setShowAdditionalFields(true);
      }
    } catch (err) {
      const error = err as AxiosError;
      console.log('catch block error', error);
      if (error) {
        navigate(`/onboarding?phone=${encodeURIComponent(phoneNumber)}`);
      } else {
        setError('Failed to validate phone number');
        setShowAdditionalFields(true);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-r from-[#0B1026] via-[#2B3990] to-[#0B1026] px-4 py-12 sm:px-6 lg:px-8">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {/* Small stars */}
        <div className="absolute h-1 w-1 rounded-full bg-white/30 shadow-glow animate-[twinkle_3s_ease-in-out_infinite,float-1_15s_ease-in-out_infinite]" style={{ top: '10%', left: '15%' }} />
        <div className="absolute h-1 w-1 rounded-full bg-white/30 shadow-glow animate-[twinkle_3s_ease-in-out_infinite,float-2_18s_ease-in-out_infinite]" style={{ top: '50%', left: '75%', animationDelay: '0.5s' }} />
        <div className="absolute h-1 w-1 rounded-full bg-white/30 shadow-glow animate-[twinkle_3s_ease-in-out_infinite,float-3_20s_ease-in-out_infinite]" style={{ top: '30%', left: '45%', animationDelay: '1s' }} />
        <div className="absolute h-1 w-1 rounded-full bg-white/30 shadow-glow animate-[twinkle_3s_ease-in-out_infinite,float-1_17s_ease-in-out_infinite]" style={{ top: '70%', left: '25%', animationDelay: '1.5s' }} />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-white/30 shadow-glow animate-[twinkle_4s_ease-in-out_infinite,float-2_19s_ease-in-out_infinite]" style={{ top: '20%', left: '85%', animationDelay: '2s' }} />
        <div className="absolute h-1.5 w-1.5 rounded-full bg-white/30 shadow-glow animate-[twinkle_4s_ease-in-out_infinite,float-3_21s_ease-in-out_infinite]" style={{ top: '80%', left: '65%', animationDelay: '2.5s' }} />
        {/* Medium stars */}
        <div className="absolute h-2 w-2 rounded-full bg-white/40 shadow-glow animate-[twinkle-slow_4s_ease-in-out_infinite,float-2_22s_ease-in-out_infinite]" style={{ top: '15%', left: '55%', animationDelay: '0.7s' }} />
        <div className="absolute h-2 w-2 rounded-full bg-white/40 shadow-glow animate-[twinkle-slow_4s_ease-in-out_infinite,float-3_25s_ease-in-out_infinite]" style={{ top: '65%', left: '35%', animationDelay: '1.2s' }} />
        <div className="absolute h-2 w-2 rounded-full bg-white/40 shadow-glow animate-[twinkle-slow_4s_ease-in-out_infinite,float-1_23s_ease-in-out_infinite]" style={{ top: '40%', left: '85%', animationDelay: '1.7s' }} />
        {/* Large stars */}
        <div className="absolute h-3 w-3 rounded-full bg-white/50 shadow-glow animate-[twinkle-slow_5s_ease-in-out_infinite,float-3_28s_ease-in-out_infinite]" style={{ top: '25%', left: '75%', animationDelay: '0.3s' }} />
        <div className="absolute h-3 w-3 rounded-full bg-white/50 shadow-glow animate-[twinkle-slow_5s_ease-in-out_infinite,float-1_30s_ease-in-out_infinite]" style={{ top: '75%', left: '15%', animationDelay: '1.8s' }} />
      </div>

      <div className="relative w-full max-w-md space-y-8 text-white">
        <div className="absolute left-1/2 top-2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          {/* Outer glow with rainbow pulse */}
          <div className="absolute inset-0 animate-[pulse-rainbow_4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-[2px]" />

          {/* Main container */}
          <div className="group relative h-full w-full rounded-full bg-[#070B14] p-[1px]">
            {/* Rotating border */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-0 animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,#1E293B,#3B82F6,#A855F7,#EC4899,#3B82F6,#1E293B)] opacity-60" />
            </div>

            {/* Glass background */}
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#0B1120]/90 via-[#0F172A]/80 to-[#0B1120]/90">
              {/* Deep space effects */}
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.2),transparent_70%)]" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.15),transparent_50%)]" />
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.15),transparent_50%)]" />

              {/* Ambient glow */}
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />

              {/* Stars */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute left-1/4 top-1/4 animate-[star1_10s_linear_infinite] text-xs text-white/60">
                  ✨
                </div>
                <div className="absolute bottom-1/3 right-1/3 animate-[star2_8s_linear_infinite] text-xs text-white/50">
                  ✨
                </div>
                <div className="absolute left-2/3 top-1/3 animate-[star3_12s_linear_infinite] text-xs text-white/70">
                  ✨
                </div>
              </div>

              {/* Sacred Geometry Icon */}
              <svg
                viewBox="0 0 100 100"
                className="relative z-10 h-12 w-12 animate-[color-shift_8s_ease-in-out_infinite] text-white transition-all duration-700"
              >
                <defs>
                  <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="50%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
                {/* Outer rotating circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#iconGradient)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  className="animate-[spin_12s_linear_infinite]"
                />
                {/* Main triangle */}
                <path
                  d="M50 5 L95 90 L5 90 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:animate-[pulse_2s_ease-in-out_infinite]"
                />
                {/* Inner circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:animate-[spin_4s_linear_infinite]"
                />
                {/* Inner triangle */}
                <path
                  d="M50 25 L75 75 L25 75 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="group-hover:animate-[spin_6s_linear_infinite_reverse]"
                />
                {/* Center dot */}
                <circle cx="50" cy="50" r="4" fill="url(#iconGradient)" className="animate-pulse" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <h2 className="mt-16 text-center font-serif text-2xl font-light tracking-tight text-white">
            vedics.ai
          </h2>
          <h2 className="text-center font-serif text-4xl font-light tracking-tight text-white">
            Welcome Seeker
          </h2>
          <p className="mt-4 text-center text-sm font-light leading-6 text-white/80">
            Begin your journey of self-discovery
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* {(error || apiError) && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
              {error || apiError}
            </div>
          )} */}
          <div className="space-y-6 rounded-2xl border border-white/20 bg-black/20 p-8 shadow-light-md backdrop-blur-md transition-all duration-200 hover:bg-black/30">
            {/* Phone Number Field with Validation */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="mb-1.5 block text-sm font-medium text-white"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  className="relative block w-full appearance-none rounded-xl border border-white/20 bg-white py-3 pl-11 pr-4 text-gray-900 placeholder-gray-500 shadow-light-sm transition-all duration-200 hover:bg-gray-50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 sm:text-sm"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <Sun className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
              </div>
              {!showAdditionalFields && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => validateAndShowFields(formData.phoneNumber)}
                    className="group relative flex w-full justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 active:scale-[0.98]"
                    disabled={loading || !formData.phoneNumber}
                  >
                    {loading ? 'Validating...' : 'Continue'}
                  </button>
                </div>
              )}
            </div>
            {/* Additional Fields - Only visible after phone number is entered */}
            {showAdditionalFields && (
              <>
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="mb-1.5 block text-sm font-medium text-white"
                  >
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      className="relative block w-full appearance-none rounded-xl border border-white/20 bg-white py-3 pl-11 pr-4 text-gray-900 placeholder-gray-500 shadow-light-sm transition-all duration-200 hover:bg-gray-50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 sm:text-sm"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                    <Moon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="timeOfBirth"
                    className="mb-1.5 block text-sm font-medium text-white"
                  >
                    Time of Birth
                  </label>
                  <div className="relative">
                    <input
                      id="timeOfBirth"
                      name="timeOfBirth"
                      type="time"
                      required
                      className="relative block w-full appearance-none rounded-xl border border-white/20 bg-white py-3 pl-11 pr-4 text-gray-900 placeholder-gray-500 shadow-light-sm transition-all duration-200 hover:bg-gray-50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 sm:text-sm"
                      value={formData.timeOfBirth}
                      onChange={handleChange}
                    />
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="locationOfBirth"
                    className="mb-1.5 block text-sm font-medium text-white"
                  >
                    Location of Birth
                  </label>
                  <div className="relative">
                    <input
                      id="locationOfBirth"
                      name="locationOfBirth"
                      type="text"
                      required
                      className="relative block w-full appearance-none rounded-xl border border-white/20 bg-white py-3 pl-11 pr-4 text-gray-900 placeholder-gray-500 shadow-light-sm transition-all duration-200 hover:bg-gray-50 focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 sm:text-sm"
                      placeholder="Enter your birth place"
                      value={formData.locationOfBirth}
                      onChange={handleChange}
                    />
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                  </div>
                </div>
                {error && (
                  <div className="mt-4 text-sm text-red-500 dark:text-red-400">{error}</div>
                )}
              </>
            )}
          </div>

          {showAdditionalFields && (
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-3.5 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 active:scale-[0.98]"
                disabled={loading}
              >
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-oriental-400/0 via-white/10 to-oriental-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/0 dark:via-white/5 dark:to-white/0"></div>
                <span className="mr-2 transition-transform duration-500 group-hover:rotate-[360deg]">
                  ✨
                </span>
                Begin Journey
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
