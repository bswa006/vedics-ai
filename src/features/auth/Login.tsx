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
  const { createUser, validatePhoneNumber, loading, error: apiError } = useUserApi();
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
        navigate('/');
        window.location.reload();
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
        localStorage.setItem('userId', response.user.id.toString());
        navigate('/');
        window.location.reload();
      } else {
        setShowAdditionalFields(true);
      }
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to validate phone number');
      setShowAdditionalFields(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="from-background-light via-surface-light dark:from-background-dark dark:via-surface-dark relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br to-oriental-100 px-4 py-12 transition-colors duration-200 dark:to-oriental-950 sm:px-6 lg:px-8">
      <div className="absolute inset-0 animate-[pulse_15s_ease-in-out_infinite] bg-[url('/sacred-geometry.png')] bg-repeat opacity-[0.03] dark:opacity-[0.07]"></div>
      <div className="from-background-light/80 dark:from-background-dark/80 absolute inset-0 bg-gradient-to-t to-transparent backdrop-blur-[2px] transition-colors duration-200"></div>
      <div className="relative w-full max-w-md space-y-8">
        <div className="from-accent-light dark:from-accent-dark absolute left-1/2 top-0 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br to-oriental-600 shadow-xl shadow-oriental-500/20 transition-all duration-200 hover:scale-105 dark:to-oriental-800 dark:shadow-oriental-900/20">
          <div className="bg-background-light/90 dark:bg-background-dark/90 absolute inset-[3px] rounded-full transition-colors duration-200"></div>
          <img
            src="/astrology-icon.png"
            alt="Sacred Geometry"
            className="relative h-12 w-12 transition-transform duration-1000 hover:rotate-180"
          />
        </div>
        <div>
          <h2 className="text-text-light-primary dark:text-text-dark-primary mt-16 text-center font-serif text-4xl font-light tracking-tight transition-colors duration-200">
            Welcome Seeker
          </h2>
          <p className="text-text-light-secondary dark:text-text-dark-secondary mt-4 text-center text-sm font-light leading-6 transition-colors duration-200">
            Begin your journey of self-discovery
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(error || apiError) && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-500 dark:bg-red-900/20 dark:text-red-400">
              {error || apiError}
            </div>
          )}
          <div className="border-border-light bg-surface-light/60 shadow-light-md hover:bg-surface-light/70 dark:border-border-dark dark:bg-surface-dark/40 dark:shadow-dark-md dark:hover:bg-surface-dark/50 space-y-6 rounded-2xl border p-8 backdrop-blur-md transition-all duration-200">
            {/* Phone Number Field with Validation */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="text-text-light-primary dark:text-text-dark-primary mb-1.5 block text-sm font-medium transition-colors duration-200"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  className="border-border-light bg-background-light/80 text-text-light-primary placeholder-text-light-secondary/80 shadow-light-sm focus:border-accent-light focus:bg-background-light focus:ring-accent-light/20 hover:bg-background-light/90 dark:border-border-dark dark:bg-background-dark/50 dark:text-text-dark-primary dark:placeholder-text-dark-secondary/50 dark:shadow-dark-sm dark:focus:border-accent-dark dark:focus:bg-background-dark/70 dark:focus:ring-accent-dark/20 dark:hover:bg-background-dark/60 relative block w-full appearance-none rounded-xl border py-3 pl-11 pr-4 transition-all duration-200 focus:outline-none focus:ring-2 sm:text-sm"
                  placeholder="Enter your phone number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <Sun className="text-text-light-secondary dark:text-text-dark-secondary absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-200" />
              </div>
              {!showAdditionalFields && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => validateAndShowFields(formData.phoneNumber)}
                    className="group relative flex w-full justify-center overflow-hidden rounded-xl border border-oriental-500/30 bg-gradient-to-r from-oriental-600 to-oriental-700 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-oriental-500/20 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-oriental-500/30 focus:outline-none focus:ring-2 focus:ring-oriental-500 focus:ring-offset-2 active:scale-[0.98] dark:border-oriental-500/20 dark:from-oriental-700 dark:to-oriental-600 dark:shadow-oriental-900/20 dark:hover:shadow-oriental-900/30"
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
                    className="text-text-light-primary dark:text-text-dark-primary mb-1.5 block text-sm font-medium transition-colors duration-200"
                  >
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      className="border-border-light bg-background-light/80 text-text-light-primary placeholder-text-light-secondary/80 shadow-light-sm focus:border-accent-light focus:bg-background-light focus:ring-accent-light/20 hover:bg-background-light/90 dark:border-border-dark dark:bg-background-dark/50 dark:text-text-dark-primary dark:placeholder-text-dark-secondary/50 dark:shadow-dark-sm dark:focus:border-accent-dark dark:focus:bg-background-dark/70 dark:focus:ring-accent-dark/20 dark:hover:bg-background-dark/60 relative block w-full appearance-none rounded-xl border py-3 pl-11 pr-4 transition-all duration-200 focus:outline-none focus:ring-2 sm:text-sm"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                    <Moon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-oriental-400 dark:text-oriental-600" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="timeOfBirth"
                    className="text-text-light-primary dark:text-text-dark-primary mb-1.5 block text-sm font-medium transition-colors duration-200"
                  >
                    Time of Birth
                  </label>
                  <div className="relative">
                    <input
                      id="timeOfBirth"
                      name="timeOfBirth"
                      type="time"
                      required
                      className="border-border-light bg-background-light/80 text-text-light-primary placeholder-text-light-secondary/80 shadow-light-sm focus:border-accent-light focus:bg-background-light focus:ring-accent-light/20 hover:bg-background-light/90 dark:border-border-dark dark:bg-background-dark/50 dark:text-text-dark-primary dark:placeholder-text-dark-secondary/50 dark:shadow-dark-sm dark:focus:border-accent-dark dark:focus:bg-background-dark/70 dark:focus:ring-accent-dark/20 dark:hover:bg-background-dark/60 relative block w-full appearance-none rounded-xl border py-3 pl-11 pr-4 transition-all duration-200 focus:outline-none focus:ring-2 sm:text-sm"
                      value={formData.timeOfBirth}
                      onChange={handleChange}
                    />
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-oriental-400 dark:text-oriental-600" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="locationOfBirth"
                    className="text-text-light-primary dark:text-text-dark-primary mb-1.5 block text-sm font-medium transition-colors duration-200"
                  >
                    Location of Birth
                  </label>
                  <div className="relative">
                    <input
                      id="locationOfBirth"
                      name="locationOfBirth"
                      type="text"
                      required
                      className="border-border-light bg-background-light/80 text-text-light-primary placeholder-text-light-secondary/80 shadow-light-sm focus:border-accent-light focus:bg-background-light focus:ring-accent-light/20 hover:bg-background-light/90 dark:border-border-dark dark:bg-background-dark/50 dark:text-text-dark-primary dark:placeholder-text-dark-secondary/50 dark:shadow-dark-sm dark:focus:border-accent-dark dark:focus:bg-background-dark/70 dark:focus:ring-accent-dark/20 dark:hover:bg-background-dark/60 relative block w-full appearance-none rounded-xl border py-3 pl-11 pr-4 transition-all duration-200 focus:outline-none focus:ring-2 sm:text-sm"
                      placeholder="Enter your birth place"
                      value={formData.locationOfBirth}
                      onChange={handleChange}
                    />
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-oriental-400 dark:text-oriental-600" />
                  </div>
                </div>
              </>
            )}
          </div>

          {showAdditionalFields && (
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center overflow-hidden rounded-xl border border-oriental-500/30 bg-gradient-to-r from-oriental-600 to-oriental-700 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-oriental-500/20 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-oriental-500/30 focus:outline-none focus:ring-2 focus:ring-oriental-500 focus:ring-offset-2 active:scale-[0.98] dark:border-oriental-500/20 dark:from-oriental-700 dark:to-oriental-600 dark:shadow-oriental-900/20 dark:hover:shadow-oriental-900/30"
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
