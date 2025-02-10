import { useState, useEffect, useCallback, useRef } from 'react';
import { User } from '../types/user';
import { PredictionResponse } from '../types/predictions';
import { useUserApi } from './useUserApi';
import { useNavigate, useLocation } from 'react-router-dom';

export const useUserData = () => {
  const { getLongTermPredictions, getProfile } = useUserApi();
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOnboardingPending, setIsOnboardingPending] = useState(false);
  const hasFetchedRef = useRef(false);

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const profileResponse = await getProfile();

      
      if (!profileResponse) {
        throw new Error('No profile data found');
      }
      
      const user: User = {
        id: profileResponse.id,
        user: profileResponse.user,
        date_of_birth: profileResponse.date_of_birth,
        time_of_birth: profileResponse.time_of_birth,
        place_of_birth: profileResponse.place_of_birth,
        phone_number: profileResponse.phone_number,
        preferred_language: profileResponse.preferred_language,
        area_of_interests: profileResponse.area_of_interests,
        long_term_reading_status: profileResponse.long_term_reading_status,
        is_deleted: profileResponse.is_deleted,
        created_at: profileResponse.created_at,
        updated_at: profileResponse.updated_at
      };

      // Check if all required fields are present
      const hasAllRequiredFields = 
        profileResponse.time_of_birth && 
        profileResponse.date_of_birth && 
        profileResponse.place_of_birth;

      if (hasAllRequiredFields) {
        if (window.location.pathname === '/login') {
          navigate('/');
        }
        // Only fetch predictions if profile is complete

        const predictionsResponse = await getLongTermPredictions();

        setPredictions(predictionsResponse);
      } else {

        setPredictions(null);
      }
      setUserData(user);
      
      // Update onboarding status based on long_term_reading_status
      setIsOnboardingPending(user.long_term_reading_status === 'pending' || user.long_term_reading_status === 'started');
    } catch (err: any) {

      if (err.response?.status === 403) {
        // Clear all localStorage
        localStorage.clear();
        // Navigate to login page
        navigate('/login');
        return;
      }
      // Stop polling on 500 errors
      if (err.response?.status >= 500) {
        setError('Server error occurred. Please try again later.');
        return;
      }
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [getProfile, getLongTermPredictions, navigate]);

  const location = useLocation();
  const initialProfile = location.state?.initialProfile;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      localStorage.clear();
      if (window.location.pathname !== '/login') {
        navigate('/login');
      }
      return;
    }

    // Only fetch if we haven't already fetched and don't have userData
    if (!hasFetchedRef.current && !userData) {
      hasFetchedRef.current = true;
      fetchUserData();
    }

    // Setup polling only if needed and no errors
    const shouldPoll = 
      window.location.pathname === '/' && 
      userData?.long_term_reading_status !== 'completed' &&
      !error; // Don't poll if there's an error

    let pollInterval: NodeJS.Timeout | null = null;

    if (shouldPoll) {
      // Add jitter to prevent thundering herd
      const jitter = Math.random() * 1000; // Random delay between 0-1000ms
      pollInterval = setInterval(fetchUserData, 5000 + jitter);
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [userData, fetchUserData, initialProfile, navigate, error]);

  return { userData, predictions, loading, error, fetchUserData, isOnboardingPending };
};

export default useUserData;
