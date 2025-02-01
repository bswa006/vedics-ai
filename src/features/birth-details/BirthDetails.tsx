import { useTranslation } from 'react-i18next';
import { User } from '../../types/user';
import { useEffect, useState } from 'react';
import { getAddressFromCoordinates } from '../../utils/geocoder';

interface BirthDetailsProps {
  user: User;
}

export function BirthDetails({ user }: BirthDetailsProps) {
  const { t } = useTranslation();
  const [locationName, setLocationName] = useState<string>(user.place_of_birth);

  useEffect(() => {
    // Check if place_of_birth contains coordinates
    const coordsMatch = user.place_of_birth.match(/^(-?\d+\.?\d*),\s*(-?\d+\.?\d*)$/);
    if (coordsMatch) {
      const [_, latitude, longitude] = coordsMatch;
      getAddressFromCoordinates(parseFloat(latitude), parseFloat(longitude))
        .then((address) => {
          if (address) {
            setLocationName(address);
          }
        })
        .catch((error) => {
          console.error('Error converting coordinates to address:', error);
        });
    }
  }, [user.place_of_birth]);

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
            title={locationName}
          >
            {locationName}
          </div>
        </div>
      </div>
    </div>
  );
}
