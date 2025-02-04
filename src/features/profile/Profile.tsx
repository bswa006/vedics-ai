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
    <div className="relative z-20 mx-auto max-w-lg px-4 pb-20">
      {/* Birth Details Card */}
      <div className="my-6 overflow-hidden rounded-[20px] bg-white p-6 shadow-lg transition-colors duration-200 dark:bg-[#1C1F2E]">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#35397E] text-white">
            🌟
          </div>
          <h2 className="text-lg font-medium text-oriental-800 dark:text-oriental-300">
            {t('profile.birthDetails')}
          </h2>
        </div>
        <BirthDetails user={userData} />
      </div>

      {/* Pending Status Card */}
      {userData.status === 'pending' && (
        <div className="relative mx-auto w-full max-w-md">
          {/* Outer glow effect */}
          <div className="absolute -inset-[1px] rounded-[21px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-[1px]" />

          {/* Main container */}
          <div className="group relative overflow-hidden rounded-[20px] bg-[#070B14] p-[1px]">
            {/* Gradient border */}
            <div className="absolute inset-0 rounded-[20px] p-[1px]">
              <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-[20px] bg-[conic-gradient(from_0deg,#1E293B,#3B82F6,#1E293B)] opacity-40" />
            </div>

            {/* Inner container with glass effect */}
            <div className="relative rounded-[19px] bg-gradient-to-br from-[#0B1120]/90 via-[#0F172A]/80 to-[#0B1120]/90 px-8 py-6 backdrop-blur-xl">
              {/* Deep space effect */}
              <div className="absolute inset-0 rounded-[19px] bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
              <div className="absolute inset-0 rounded-[19px] bg-[radial-gradient(circle_at_80%_20%,rgba(147,197,253,0.1),transparent_50%)]" />

              <div className="relative">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#35397E] text-white">
                    ⏳
                  </div>
                  <h2 className="text-lg font-medium text-white">{t('profile.pendingStatus')}</h2>
                </div>
                <p className="text-sm text-gray-300">{t('profile.pendingMessage')}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
