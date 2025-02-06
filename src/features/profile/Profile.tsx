import { useTranslation } from 'react-i18next';
import { useUserDataContext } from '../../contexts/UserDataContext';
import { BirthDetails } from '../birth-details/BirthDetails';

export function Profile() {
  const { t } = useTranslation();
  const { userData, error } = useUserDataContext();

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
      {/* Birth Details Card */}
      <div className="group relative px-8 py-6 mb-6 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm hover:scale-[1.01] hover:bg-white/95 dark:hover:bg-gray-900/95">
        <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">✧</span>
          {t('profile.birthDetails').toUpperCase()}
        </h3>
        <BirthDetails user={userData} />
      </div>

      {/* Pending Status Card */}
      {userData.status === 'pending' && (
        <div className="group relative px-8 py-6 transition-all duration-300 bg-white dark:bg-gray-900 backdrop-blur-sm hover:scale-[1.01] hover:bg-white/95 dark:hover:bg-gray-900/95">
          <h3 className="mb-5 flex items-center gap-2 text-xl font-medium text-gray-900 dark:text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">✧</span>
            {t('profile.pendingStatus').toUpperCase()}
          </h3>
          <p className="border-l-2 border-purple-200 pl-4 text-base leading-relaxed text-gray-600 transition-colors duration-300 hover:border-purple-400 dark:border-purple-800/30 dark:text-gray-300 dark:hover:border-purple-600/50">
            {t('profile.pendingMessage')}
          </p>
        </div>
      )}
    </div>
  );
}
