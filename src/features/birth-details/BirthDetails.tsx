import { useTranslation } from 'react-i18next';
import { User } from '../../types/user';

interface BirthDetailsProps {
  user: User;
}

export function BirthDetails({ user }: BirthDetailsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="group relative px-6 py-4 transition-all duration-300 bg-purple-50/50 dark:bg-purple-900/10 backdrop-blur-sm rounded-lg hover:bg-purple-50/80 dark:hover:bg-purple-900/20">
        <div className="mb-2 text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">
          {t('birthDetails.birthDate')}
        </div>
        <div className="font-medium text-gray-700 dark:text-gray-300">
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
      <div className="group relative px-6 py-4 transition-all duration-300 bg-purple-50/50 dark:bg-purple-900/10 backdrop-blur-sm rounded-lg hover:bg-purple-50/80 dark:hover:bg-purple-900/20">
        <div className="mb-2 text-xs font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wider">
          {t('birthDetails.birthTime')}
        </div>
        <div className="font-medium text-gray-700 dark:text-gray-300">
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
      <div className="group relative px-6 py-4 transition-all duration-300 bg-purple-50/50 dark:bg-purple-900/10 backdrop-blur-sm rounded-lg hover:bg-purple-50/80 dark:hover:bg-purple-900/20">
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
    </div>
  );
}
