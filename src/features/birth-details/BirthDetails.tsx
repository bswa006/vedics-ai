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
            {new Date(user.date_of_birth).toLocaleDateString()}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-oriental-800 dark:text-oriental-300">
            {t('birthDetails.birthTime')}
          </div>
          <div className="font-medium text-gray-900 dark:text-gray-200">{user.birth_time}</div>
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
