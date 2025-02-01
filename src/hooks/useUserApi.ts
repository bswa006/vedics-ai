import { useState } from 'react';
import { api, UserBirthDetails } from '../services/api';

export const useUserApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (birthDetails: UserBirthDetails) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.users.create(birthDetails);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserReadings = async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.users.getReadings(userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.users.getUser(userId);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createUser,
    getUser,
    getUserReadings,
    loading,
    error,
  };
};
