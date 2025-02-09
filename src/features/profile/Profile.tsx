import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserDataContext } from '../../contexts/UserDataContext';
import { theme } from '../../styles/theme';
import { utcToLocal } from '../../utils/dateTime';
import { EditableProfile } from './EditableProfile';

export function Profile() {
  const { t } = useTranslation();
  const { userData, error, fetchUserData, loading } = useUserDataContext();
  const [isEditing, setIsEditing] = useState(false);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-statusRed/20 bg-statusRed/5 mx-auto max-w-md rounded-xl border p-6 backdrop-blur-xl"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="flex-shrink-0">
            <svg className="text-statusRed h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-statusRed text-sm font-medium">{error}</p>
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
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-light tracking-tight text-white"
                style={{
                  fontFamily: theme.typography.heading.fontFamily,
                  fontWeight: theme.typography.heading.weights.medium,
                }}
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
                <h3 className="mb-4 flex items-center gap-3 text-xl font-medium text-white">
                  <span className="bg-celestialLilac/20 flex h-10 w-10 items-center justify-center rounded-lg text-white">
                    ✧
                  </span>
                  {t('profile.birthDetails')}
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {t('profile.birthDate')}
                    </label>
                    <p className="text-lg text-white">{userData.date_of_birth && userData.time_of_birth ? utcToLocal(userData.date_of_birth, userData.time_of_birth).localDate : userData.date_of_birth}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {t('profile.birthTime')}
                    </label>
                    <p className="text-lg text-white">{userData.date_of_birth && userData.time_of_birth ? utcToLocal(userData.date_of_birth, userData.time_of_birth).localTime : userData.time_of_birth}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      {t('profile.birthPlace')}
                    </label>
                    <p className="text-lg text-white">{userData.place_of_birth}</p>
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
                <h3 className="mb-4 flex items-center gap-3 text-xl font-medium text-white">
                  <span className="bg-celestialLilac/20 flex h-10 w-10 items-center justify-center rounded-lg text-white">
                    ⭐
                  </span>
                  {t('profile.personalInfo')}
                </h3>
                <div className="grid gap-4">
                  {[
                    { label: 'firstName', value: userData.user.first_name },
                    { label: 'lastName', value: userData.user.last_name },
                    { label: 'phoneNumber', value: userData.phone_number },
                    { label: 'preferredLanguage', value: userData.preferred_language },
                  ].map(field => (
                    <div key={field.label} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">
                        {t(`profile.${field.label}`)}
                      </label>
                      <p className="text-lg text-white">{field.value}</p>
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
