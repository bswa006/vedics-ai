import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sun, Moon, Clock, MapPin } from 'lucide-react';

export function Login() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    dateOfBirth: '',
    timeOfBirth: '',
    locationOfBirth: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login logic
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-oriental-50 via-white to-oriental-100 px-4 py-12 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('/sacred-geometry.png')] bg-repeat opacity-[0.03] dark:opacity-[0.07] animate-[pulse_15s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-[2px] dark:from-gray-900/80"></div>
      <div className="relative w-full max-w-md space-y-8">
        <div className="absolute left-1/2 top-0 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-oriental-600 to-oriental-800 shadow-xl shadow-oriental-500/20 transition-transform hover:scale-105 dark:from-oriental-700 dark:to-oriental-900 dark:shadow-oriental-900/20">
          <div className="absolute inset-[3px] rounded-full bg-white/90 dark:bg-gray-900/90"></div>
          <img src="/astrology-icon.png" alt="Sacred Geometry" className="relative h-12 w-12 transition-transform hover:rotate-180 duration-1000" />
        </div>
        <div>
          <h2 className="mt-16 text-center font-serif text-4xl font-light tracking-tight text-oriental-900 dark:text-oriental-100">
            {t('login.title', 'Welcome Seeker')}
          </h2>
          <p className="mt-4 text-center text-sm font-light leading-6 text-oriental-700/90 dark:text-oriental-300/90">
            {t('login.subtitle', 'Begin your journey of self-discovery')}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6 rounded-2xl border border-white/50 bg-white/60 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:bg-white/70 dark:border-white/5 dark:bg-gray-800/40 dark:hover:bg-gray-800/50">
            <div>
              <label
                htmlFor="phoneNumber"
                className="mb-1.5 block text-sm font-medium text-oriental-900 dark:text-oriental-200"
              >
                {t('login.phoneNumber', 'Phone Number')}
              </label>
              <div className="relative">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  className="relative block w-full appearance-none rounded-xl border border-oriental-200/50 bg-white/80 py-3 pl-11 pr-4 text-oriental-900 placeholder-oriental-400/80 shadow-sm transition-all duration-200 focus:border-oriental-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-oriental-500/20 hover:bg-white/90 dark:border-oriental-800/50 dark:bg-gray-900/50 dark:text-oriental-100 dark:placeholder-oriental-400/50 dark:focus:bg-gray-900/70 dark:hover:bg-gray-900/60 sm:text-sm"
                  placeholder="+1234567890"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <Sun className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-oriental-400 dark:text-oriental-600" />
              </div>
            </div>
            <div>
              <label
                htmlFor="dateOfBirth"
                className="mb-1.5 block text-sm font-medium text-oriental-900 dark:text-oriental-200"
              >
                {t('login.dateOfBirth', 'Date of Birth')}
              </label>
              <div className="relative">
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  className="relative block w-full appearance-none rounded-xl border border-oriental-200/50 bg-white/80 py-3 pl-11 pr-4 text-oriental-900 placeholder-oriental-400/80 shadow-sm transition-all duration-200 focus:border-oriental-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-oriental-500/20 hover:bg-white/90 dark:border-oriental-800/50 dark:bg-gray-900/50 dark:text-oriental-100 dark:placeholder-oriental-400/50 dark:focus:bg-gray-900/70 dark:hover:bg-gray-900/60 sm:text-sm"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                <Moon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-oriental-400 dark:text-oriental-600" />
              </div>
            </div>
            <div>
              <label
                htmlFor="timeOfBirth"
                className="mb-1.5 block text-sm font-medium text-oriental-900 dark:text-oriental-200"
              >
                {t('login.timeOfBirth', 'Time of Birth')}
              </label>
              <div className="relative">
                <input
                  id="timeOfBirth"
                  name="timeOfBirth"
                  type="time"
                  required
                  className="relative block w-full appearance-none rounded-xl border border-oriental-200/50 bg-white/80 py-3 pl-11 pr-4 text-oriental-900 placeholder-oriental-400/80 shadow-sm transition-all duration-200 focus:border-oriental-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-oriental-500/20 hover:bg-white/90 dark:border-oriental-800/50 dark:bg-gray-900/50 dark:text-oriental-100 dark:placeholder-oriental-400/50 dark:focus:bg-gray-900/70 dark:hover:bg-gray-900/60 sm:text-sm"
                  value={formData.timeOfBirth}
                  onChange={handleChange}
                />
                <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-oriental-400 dark:text-oriental-600" />
              </div>
            </div>
            <div>
              <label
                htmlFor="locationOfBirth"
                className="mb-1.5 block text-sm font-medium text-oriental-900 dark:text-oriental-200"
              >
                {t('login.locationOfBirth', 'Location of Birth')}
              </label>
              <div className="relative">
                <input
                  id="locationOfBirth"
                  name="locationOfBirth"
                  type="text"
                  required
                  className="relative block w-full appearance-none rounded-xl border border-oriental-200/50 bg-white/80 py-3 pl-11 pr-4 text-oriental-900 placeholder-oriental-400/80 shadow-sm transition-all duration-200 focus:border-oriental-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-oriental-500/20 hover:bg-white/90 dark:border-oriental-800/50 dark:bg-gray-900/50 dark:text-oriental-100 dark:placeholder-oriental-400/50 dark:focus:bg-gray-900/70 dark:hover:bg-gray-900/60 sm:text-sm"
                  placeholder="City, Country"
                  value={formData.locationOfBirth}
                  onChange={handleChange}
                />
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-oriental-400 dark:text-oriental-600" />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center overflow-hidden rounded-xl border border-oriental-500/30 bg-gradient-to-r from-oriental-600 to-oriental-700 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-oriental-500/20 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-oriental-500/30 focus:outline-none focus:ring-2 focus:ring-oriental-500 focus:ring-offset-2 active:scale-[0.98] dark:border-oriental-500/20 dark:from-oriental-700 dark:to-oriental-600 dark:shadow-oriental-900/20 dark:hover:shadow-oriental-900/30"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-oriental-400/0 via-white/10 to-oriental-400/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:from-white/0 dark:via-white/5 dark:to-white/0"></div>
              <span className="mr-2 transition-transform duration-500 group-hover:rotate-[360deg]">✨</span>
              {t('login.submit', 'Begin Journey')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
