import { useState } from 'react';
import { api } from '../services/api';

interface UpdateProfileData {
  date_of_birth?: string;
  time_of_birth?: string;
  place_of_birth?: string;
  preferred_language?: string;
  area_of_interests?: string[];
  email_opt_in?: boolean;
}

export const useUserApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const getLongTermPredictions = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.predictions.getLongTermPredictions();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.profiles.getProfile();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (userId: number, data: UpdateProfileData) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.profiles.updateProfile(userId, data);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getProfile,
    getLongTermPredictions,
    updateProfile,
    loading,
    error,
  };
};
