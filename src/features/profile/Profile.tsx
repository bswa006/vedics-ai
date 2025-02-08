import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserDataContext } from '../../contexts/UserDataContext';
import { BirthDetails } from '../birth-details/BirthDetails';
import { EditableProfile } from './EditableProfile';
import { AnimatePresence, motion } from 'framer-motion';

export function Profile() {
  const { t } = useTranslation();
  const { userData, error, fetchUserData, loading } = useUserDataContext();
  const [isEditing, setIsEditing] = useState(false);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-md rounded-xl bg-red-50 p-4 text-center dark:bg-red-900/10"
      >
        <div className="flex items-center justify-center gap-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (loading || !userData) {
    return (
      <motion.div className="flex min-h-[50vh] items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="h-8 w-8 text-purple-500"
        >
          <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="relative z-20 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Profile Header */}
            <div className="flex items-center justify-between px-8 py-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('profile.title')}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600"
              >
                {t('profile.edit')}
              </button>
            </div>

            {/* Birth Details Card */}
            <motion.div className="group relative bg-white px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:bg-white/95 dark:bg-gray-900 dark:hover:bg-gray-900/95">
              <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  ✧
                </span>
                {t('profile.birthDetails')}
              </h3>
              <BirthDetails user={userData} />
            </motion.div>

            {/* Pending Status Card */}
            {userData.long_term_reading_status === 'pending' && (
              <motion.div className="group relative bg-white px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:bg-white/95 dark:bg-gray-900 dark:hover:bg-gray-900/95">
                <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    ✧
                  </span>
                  {t('profile.pendingStatus')}
                </h3>
                <p className="border-l-2 border-purple-200 pl-4 text-base leading-relaxed text-gray-600 transition-colors duration-300 hover:border-purple-400 dark:border-purple-800/30 dark:text-gray-300 dark:hover:border-purple-600/50">
                  {t('profile.pendingMessage')}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
