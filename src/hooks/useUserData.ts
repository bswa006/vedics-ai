import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PredictionResponse } from '../types/predictions';
import { User } from '../types/user';
import { useUserApi } from './useUserApi';

export const useUserData = () => {
  const { getLongTermPredictions, getProfile } = useUserApi();
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOnboardingPending, setIsOnboardingPending] = useState(false);
  const hasFetchedRef = useRef(false);
  const location = useLocation();

  const resetData = useCallback(() => {
    setUserData(null);
    setPredictions(null);
    setError(null);
    setLoading(false);
    setIsOnboardingPending(false);
    hasFetchedRef.current = false;
  }, []);

  const fetchUserData = useCallback(async (isPolling = false, skipPredictions = false, existingProfile?: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      resetData();
      return;
    }

    try {
      if (!isPolling) setLoading(true);
      setError(null);

      const profileResponse = existingProfile || await getProfile();
      if (!profileResponse) {
        throw new Error('No profile data found');
      }
      
      const user: User = {
        id: profileResponse.id,
        user: profileResponse.user,
        date_of_birth: profileResponse.date_of_birth,
        time_of_birth: profileResponse.time_of_birth,
        place_of_birth: profileResponse.place_of_birth,
        preferred_language: profileResponse.preferred_language,
        area_of_interests: profileResponse.area_of_interests,
        long_term_reading_status: profileResponse.long_term_reading_status,
        is_deleted: profileResponse.is_deleted,
        created_at: profileResponse.created_at,
        updated_at: profileResponse.updated_at
      };

      if (!skipPredictions) {
        const hasAllRequiredFields = 
          profileResponse.time_of_birth && 
          profileResponse.date_of_birth && 
          profileResponse.place_of_birth;

        if (hasAllRequiredFields) {
          const predictionsResponse = await getLongTermPredictions();
          // Only update predictions if we get valid data
          if (predictionsResponse) {
            setPredictions(predictionsResponse);
          }
        } else if (!isPolling) {
          // Clear predictions only on initial load if required fields are missing
          setPredictions(null);
        }
      } else if (!isPolling) {
        // Clear predictions only on initial load if skipping predictions
        setPredictions(null);
      }

      setUserData(user);
      setIsOnboardingPending(user.long_term_reading_status === 'pending' || user.long_term_reading_status === 'started');
    } catch (err: any) {
      if (err.response?.status === 403) {
        localStorage.clear();
        return;
      }
      if (err.response?.status >= 500) {
        setError('Server error occurred. Please try again later.');
        return;
      }
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      if (!isPolling) setLoading(false);
    }
  }, [getProfile, getLongTermPredictions]);

  // Initial data fetch
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || hasFetchedRef.current) return;
    
    hasFetchedRef.current = true;
    fetchUserData();
  }, [fetchUserData]);

  // Handle polling
  useEffect(() => {
    if (!userData || location.pathname !== '/' || userData.long_term_reading_status === 'completed' || error) {
      return;
    }

    const jitter = Math.random() * 1000;
    const pollInterval = setInterval(() => fetchUserData(true), 5000 + jitter);

    return () => clearInterval(pollInterval);
  }, [userData, location.pathname, error, fetchUserData]);

  return { userData, predictions, loading, error, fetchUserData, isOnboardingPending };
};

export default useUserData;
