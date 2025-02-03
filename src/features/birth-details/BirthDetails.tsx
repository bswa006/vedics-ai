import { useTranslation } from 'react-i18next';
import { User } from '../../types/user';

interface BirthDetailsProps {
  user: User;
}

export function BirthDetails({ user }: BirthDetailsProps) {
  const { t } = useTranslation();

  return (
    <div className="mb-3 rounded-lg bg-white p-3 shadow dark:bg-gray-800">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-xs font-medium text-oriental-800 dark:text-oriental-300">
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
        <div>
          <div className="text-xs font-medium text-oriental-800 dark:text-oriental-300">
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
        <div>
          <div className="text-xs font-medium text-oriental-800 dark:text-oriental-300">
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
    </div>
  );
}
