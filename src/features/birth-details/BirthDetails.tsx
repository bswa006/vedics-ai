import { useTranslation } from 'react-i18next';
import { User } from '../../types/user';
import { useUserApi } from '../../hooks/useUserApi';
import { Bell, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface BirthDetailsProps {
  user: User;
}

export function BirthDetails({ user }: BirthDetailsProps) {
  const { t } = useTranslation();
  const { updateProfile } = useUserApi();
  const [isEnabled, setIsEnabled] = useState(user.email_opt_in || false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      await updateProfile(user.id, {
        email_opt_in: !isEnabled
      });
      setIsEnabled(!isEnabled);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update email preferences:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="group relative px-6 py-4 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 hover:bg-white/95 dark:hover:bg-gray-900/95">
        <div className="mb-2 text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">
          {t('birthDetails.birthDate')}
        </div>
        <div className="font-medium text-gray-700 dark:text-gray-300">
          {(() => {
            if (!user.time_of_birth || !user.date_of_birth) {
              return t('birthDetails.unavailable');
            }
            try {
              // Create UTC date from birth date and time
              const utcDateTime = new Date(`${user.date_of_birth}T${user.time_of_birth}Z`);
              // It will automatically convert to local timezone
              return utcDateTime.toLocaleDateString();
            } catch (error) {
              return t('birthDetails.invalidFormat');
            }
          })()}
        </div>
      </div>
      <div className="group relative px-6 py-4 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 hover:bg-white/95 dark:hover:bg-gray-900/95">
        <div className="mb-2 text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">
          {t('birthDetails.birthTime')}
        </div>
        <div className="font-medium text-gray-700 dark:text-gray-300">
          {(() => {
            if (!user.time_of_birth || !user.date_of_birth) {
              return t('birthDetails.unavailable');
            }
            try {
              // Create UTC date from birth date and time
              const utcDateTime = new Date(`${user.date_of_birth}T${user.time_of_birth}Z`);
              // Convert to local time with desired format
              return utcDateTime.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              });
            } catch (error) {
              return t('birthDetails.invalidFormat');
            }
          })()}
        </div>
      </div>
      <div className="group relative px-6 py-4 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 hover:bg-white/95 dark:hover:bg-gray-900/95">
        <div className="mb-2 text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">
          {t('birthDetails.birthPlace')}
        </div>
        <div
          className="truncate font-medium text-gray-700 dark:text-gray-300"
          title={user.place_of_birth}
        >
          {user.place_of_birth}
        </div>
      </div>
      {/* Email Notifications Toggle - Enhanced visibility */}
      <div className="sm:col-span-3 mt-4">
        <div className="group relative px-6 py-5 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-white/95 dark:hover:bg-gray-900/95 shadow-sm hover:shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900/30">
                <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-800 dark:text-white">
                  {t('profile.emailNotifications')}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-md">
                  {isEnabled 
                    ? t('profile.emailNotificationsEnabled') 
                    : t('profile.emailNotificationsDisabled')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 self-end sm:self-auto">
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-green-600 dark:text-green-400 flex items-center"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {t('common.saved')}
                </motion.div>
              )}
              
              <button
                onClick={handleToggle}
                disabled={isUpdating}
                className={`relative inline-flex h-7 w-14 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                  isEnabled ? 'bg-purple-600 dark:bg-purple-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
                aria-label={isEnabled ? t('common.disable') : t('common.enable')}
              >
                {isUpdating && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white"></span>
                  </span>
                )}
                <span
                  className={`${
                    isEnabled ? 'translate-x-8' : 'translate-x-1'
                  } inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
