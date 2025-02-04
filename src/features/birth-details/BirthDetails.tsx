import { useTranslation } from 'react-i18next';
import { User } from '../../types/user';

interface BirthDetailsProps {
  user: User;
}

export function BirthDetails({ user }: BirthDetailsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl bg-[#35397E]/10 p-4 dark:bg-[#35397E]/20">
        <div className="mb-2 text-xs font-medium text-oriental-800 dark:text-oriental-300">
          {t('birthDetails.birthDate')}
        </div>
        <div className="font-medium text-gray-900 dark:text-gray-200">
          {(() => {
            if (!user.birth_time || !user.date_of_birth) {
              return t('birthDetails.unavailable');
            }
            try {
              // Create UTC date from birth date and time
              const utcDateTime = new Date(`${user.date_of_birth}T${user.birth_time}Z`);
              // It will automatically convert to local timezone
              return utcDateTime.toLocaleDateString();
            } catch (error) {
              return t('birthDetails.invalidFormat');
            }
          })()}
        </div>
      </div>
      <div className="rounded-xl bg-[#35397E]/10 p-4 dark:bg-[#35397E]/20">
        <div className="mb-2 text-xs font-medium text-oriental-800 dark:text-oriental-300">
          {t('birthDetails.birthTime')}
        </div>
        <div className="font-medium text-gray-900 dark:text-gray-200">
          {(() => {
            if (!user.birth_time || !user.date_of_birth) {
              return t('birthDetails.unavailable');
            }
            try {
              // Create UTC date from birth date and time
              const utcDateTime = new Date(`${user.date_of_birth}T${user.birth_time}Z`);
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
      <div className="rounded-xl bg-[#35397E]/10 p-4 dark:bg-[#35397E]/20">
        <div className="mb-2 text-xs font-medium text-oriental-800 dark:text-oriental-300">
          {t('birthDetails.birthPlace')}
        </div>
        <div
          className="truncate font-medium text-gray-900 dark:text-gray-200"
          title={user.place_of_birth}
        >
          {user.place_of_birth}
        </div>
      </div>
    </div>
  );
}
