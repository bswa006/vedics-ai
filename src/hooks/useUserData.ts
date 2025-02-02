import { useState, useEffect } from 'react';
import { User } from '../types/user';
import { PredictionResponse } from '../types/predictions';
import { useUserApi } from './useUserApi';

export const useUserData = (userId: number | null) => {
  const { getUserReadings, getUser } = useUserApi();
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const [userResponse, readingsResponse] = await Promise.all([
        getUser(id),
        getUserReadings(id),
      ]);

      const user = userResponse.user;
      setUserData(user);

      const modifiedData = readingsResponse.map((prediction: any) => ({
        ...prediction,
        content: prediction.content[prediction.type],
      }));
      setPredictions(modifiedData);

      return user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user data';
      setError(errorMessage);
      localStorage.removeItem('userId');
      setUserData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    let isSubscribed = true;
    let pollTimeout: NodeJS.Timeout | null = null;

    const pollUserStatus = async () => {
      if (!isSubscribed) return;

      try {
        const user = await fetchUserData(userId);
        
        if (user?.status === 'pending' && isSubscribed) {
          pollTimeout = setTimeout(pollUserStatus, 5000);
        }
      } catch (err) {
        console.error('Polling failed:', err);
        if (pollTimeout) {
          clearTimeout(pollTimeout);
        }
      }
    };

    pollUserStatus();

    return () => {
      isSubscribed = false;
      if (pollTimeout) {
        clearTimeout(pollTimeout);
      }
    };
  }, [userId]); // Only re-run if userId changes

  return { userData, predictions, loading, error };
};
