import { User } from '../types/user';

export const isProfileComplete = (profile: User | null) => {
  if (!profile) return false;

  // Check if any required field is missing or empty
  const requiredFields = [
    profile.date_of_birth,
    profile.time_of_birth,
    profile.place_of_birth?.trim()
  ];

  return requiredFields.every(field => field);
};

export const isLongTermReadingComplete = (profile: User | null) => {
  return profile?.long_term_reading_status === 'completed';
};
