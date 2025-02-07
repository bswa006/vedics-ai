import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserDataContext } from '../../contexts/UserDataContext';
import { BirthDetails } from '../birth-details/BirthDetails';
import { EditableProfile } from './EditableProfile';
import { AnimatePresence, motion } from 'framer-motion';

export function Profile() {
  const { t } = useTranslation();
  const { userData, error, fetchUserData } = useUserDataContext();
  const [isEditing, setIsEditing] = useState(false);

  if (error) {
    return (
      <div className="text-center text-red-500 transition-colors duration-200 dark:text-red-400">
        {t('common.error')}: {error}
      </div>
    );
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="relative z-20 pb-20">
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
            <div className="group relative bg-white px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:bg-white/95 dark:bg-gray-900 dark:hover:bg-gray-900/95">
              <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                  ✧
                </span>
                {t('profile.birthDetails')}
              </h3>
              <BirthDetails user={userData} />
            </div>

            {/* Pending Status Card */}
            {userData.long_term_reading_status === 'pending' && (
              <div className="group relative bg-white px-8 py-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:bg-white/95 dark:bg-gray-900 dark:hover:bg-gray-900/95">
                <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                    ✧
                  </span>
                  {t('profile.pendingStatus')}
                </h3>
                <p className="border-l-2 border-purple-200 pl-4 text-base leading-relaxed text-gray-600 transition-colors duration-300 hover:border-purple-400 dark:border-purple-800/30 dark:text-gray-300 dark:hover:border-purple-600/50">
                  {t('profile.pendingMessage')}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
