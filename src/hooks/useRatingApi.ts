import { useState } from 'react';
import { api } from '../services/api';

export const useRatingApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitRating = async (userId: number, predictionId: string, rating: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.ratings.submit(userId, predictionId, rating);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    submitRating,
    loading,
    error,
  };
};
