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
              // Convert UTC to local time by adding 5 hours and 30 minutes
              const [hours = 0, minutes = 0] = user.birth_time.split(':').map(Number);
              const localHours = hours + 5;
              const localMinutes = minutes + 30;
              const adjustedHours = localHours + Math.floor(localMinutes / 60);
              const adjustedMinutes = localMinutes % 60;
              try {
                const localDateTime = new Date(`${user.date_of_birth}T${String(adjustedHours).padStart(2, '0')}:${String(adjustedMinutes).padStart(2, '0')}`);
                return localDateTime.toLocaleDateString();
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
              // Convert UTC to local time by adding 5 hours and 30 minutes
              const [hours = 0, minutes = 0] = user.birth_time.split(':').map(Number);
              const localHours = hours + 5;
              const localMinutes = minutes + 30;
              const adjustedHours = localHours + Math.floor(localMinutes / 60);
              const adjustedMinutes = localMinutes % 60;
              try {
                const localDateTime = new Date(`${user.date_of_birth}T${String(adjustedHours).padStart(2, '0')}:${String(adjustedMinutes).padStart(2, '0')}`);
                return localDateTime.toLocaleTimeString('en-US', {
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
