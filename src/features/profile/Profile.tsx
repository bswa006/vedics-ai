import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Calendar, Languages, MapPin, User as UserIcon, Bell, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserDataContext } from '../../contexts/UserDataContext';
import { theme } from '../../styles/theme';
import { utcToLocal } from '../../utils/dateTime';
import { EditableProfile } from './EditableProfile';
import { useUserApi } from '../../hooks/useUserApi';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/user';

export function Profile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userData, error, fetchUserData, loading } = useUserDataContext();
  const { updateProfile } = useUserApi();
  const [isEditing, setIsEditing] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (userData) {
      setIsEmailEnabled(!!userData.email_opt_in);
    }
  }, [userData]);

  const handleEmailToggle = async () => {
    if (!userData) return;
    
    setIsUpdating(true);
    try {
      await updateProfile(userData.id, {
        email_opt_in: !isEmailEnabled
      });
      setIsEmailEnabled(!isEmailEnabled);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update email preferences:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-status-red/20 bg-status-red/5 mx-auto max-w-md rounded-xl border p-6 backdrop-blur-xl"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="flex-shrink-0">
            <AlertCircle className="text-status-red h-5 w-5" />
          </div>
          <p className="text-status-red text-sm font-medium">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (loading || !userData) {
    return (
      <motion.div className="flex min-h-[50vh] items-center justify-center">
        <div className="relative h-24 w-24">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: theme.gradients.primary }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <div className="bg-midnightIndigo absolute inset-1 rounded-full" />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-midnightIndigo relative min-h-screen">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: theme.gradients.background }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {isEditing ? (
            <EditableProfile
              user={userData}
              onUpdate={async () => {
                setIsEditing(false);
                await fetchUserData();
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Header with Email Notifications */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-3xl font-light tracking-tight text-white"
                    >
                      {t('profile.title')}
                    </motion.h1>
                    <p className="text-gray-300">{t('profile.subtitle')}</p>
                  </div>

                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="group relative overflow-hidden rounded-xl p-[1px]"
                    style={{ background: theme.gradients.primary }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="bg-midnightIndigo relative rounded-xl px-6 py-2 transition-all group-hover:bg-transparent">
                      <span className="relative z-10 text-sm font-medium text-white">
                        {t('profile.edit')}
                      </span>
                    </div>
                  </motion.button>
                </div>

                {/* Email Notifications Toggle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="rounded-full bg-purple-100/10 p-3">
                        <Bell className="h-5 w-5 text-purple-300" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white">
                          {t('profile.emailNotifications')}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {isEmailEnabled 
                            ? t('profile.emailNotificationsEnabled') 
                            : t('profile.emailNotificationsDisabled')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {showSuccess && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-sm text-green-400 flex items-center"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {t('common.saved')}
                        </motion.div>
                      )}
                      
                      <button
                        onClick={handleEmailToggle}
                        disabled={isUpdating}
                        className={`relative inline-flex h-7 w-14 cursor-pointer items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                          isEmailEnabled ? 'bg-purple-600' : 'bg-gray-700'
                        }`}
                      >
                        {isUpdating && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                          </span>
                        )}
                        <span
                          className={`${
                            isEmailEnabled ? 'translate-x-8' : 'translate-x-1'
                          } inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Profile Cards */}
              <div className="grid gap-6 md:grid-cols-2">
                {/* Birth Details Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:border-celestialLilac/40 group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `${theme.gradients.primary}10` }}
                  />
                  <div className="relative">
                    <h3 className="mb-6 flex items-center gap-3 text-xl font-medium text-white">
                      <span className="bg-celestialLilac/20 flex h-12 w-12 items-center justify-center rounded-lg text-xl text-white">
                        <Calendar className="h-6 w-6" />
                      </span>
                      {t('profile.birthDetails')}
                    </h3>
                    <div className="space-y-6">
                      <div className="group/field space-y-2">
                        <label className="block text-base font-medium text-gray-200">
                          {t('profile.birthDate')}
                        </label>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <p className="group-hover/field:text-celestialLilac text-lg text-white transition-colors duration-200">
                            {userData.date_of_birth && userData.time_of_birth
                              ? utcToLocal(userData.date_of_birth, userData.time_of_birth).localDate
                              : userData.date_of_birth}
                          </p>
                        </div>
                      </div>
                      <div className="group/field space-y-2">
                        <label className="block text-base font-medium text-gray-200">
                          {t('profile.birthTime')}
                        </label>
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <p className="group-hover/field:text-celestialLilac text-lg text-white transition-colors duration-200">
                            {userData.date_of_birth && userData.time_of_birth
                              ? utcToLocal(userData.date_of_birth, userData.time_of_birth).localTime
                              : userData.time_of_birth}
                          </p>
                        </div>
                      </div>
                      <div className="group/field space-y-2">
                        <label className="block text-base font-medium text-gray-200">
                          {t('profile.birthPlace')}
                        </label>
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <p className="group-hover/field:text-celestialLilac text-lg text-white transition-colors duration-200">
                            {userData.place_of_birth}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Personal Information Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:border-celestialLilac/40 group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: `${theme.gradients.primary}10` }}
                  />
                  <div className="relative">
                    <h3 className="mb-6 flex items-center gap-3 text-xl font-medium text-white">
                      <span className="bg-celestialLilac/20 flex h-12 w-12 items-center justify-center rounded-lg text-xl text-white">
                        <UserIcon className="h-6 w-6" />
                      </span>
                      {t('profile.personalInfo')}
                    </h3>
                    <div className="space-y-6">
                      {[
                        {
                          label: 'preferredLanguage',
                          value: userData.preferred_language,
                          icon: <Languages className="h-5 w-5" />,
                        },
                      ].map(field => (
                        <div key={field.label} className="group/field space-y-2">
                          <label className="block text-base font-medium text-gray-200">
                            {t(`profile.${field.label}`)}
                          </label>
                          <div className="flex items-center gap-3">
                            <div className="text-gray-400">{field.icon}</div>
                            <p className="group-hover/field:text-celestialLilac text-lg text-white transition-colors duration-200">
                              {field.value}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
