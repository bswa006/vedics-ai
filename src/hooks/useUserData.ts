import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/user';
import { PredictionResponse } from '../types/predictions';
import { useUserApi } from './useUserApi';
import { useNavigate } from 'react-router-dom';

export const useUserData = () => {
  const { getLongTermPredictions, getProfile } = useUserApi();
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOnboardingPending, setIsOnboardingPending] = useState(true);

  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching profile...');
      const profileResponse = await getProfile();
      console.log('Profile response:', profileResponse);
      
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
        console.log('Profile complete, fetching long term predictions...');
        const predictionsResponse = await getLongTermPredictions();
        console.log('Predictions response:', predictionsResponse);
        setPredictions(predictionsResponse);
      } else {
        console.log('Profile incomplete, skipping predictions fetch');
        setPredictions(null);
      }
      setUserData(user);
      
      // Update onboarding status
      const isOnboardingRequired = !(
        user.time_of_birth && 
        user.date_of_birth && 
        user.place_of_birth &&
        user.preferred_language &&
        user.area_of_interests.length > 0
      );
      setIsOnboardingPending(isOnboardingRequired);
    } catch (err: any) {
      console.error('Error fetching user data:', err);
      if (err.response?.status === 403) {
        // Clear all localStorage
        localStorage.clear();
        // Navigate to login page
        navigate('/login');
        return;
      }
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [getProfile, getLongTermPredictions, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    console.log('useEffect running with:', { userId, token, loading, userData });
    
    if (!token || !userId) {
      // Clear any remaining localStorage items
      localStorage.clear();
      // Only navigate if we're not already on the login page
      if (window.location.pathname !== '/login') {
        navigate('/login');
      }
      return;
    }

    // Start polling if we're on the home page and long-term reading is pending
    const shouldPoll = 
      window.location.pathname === '/' && 
      userData?.long_term_reading_status !== 'completed';

    let pollInterval: NodeJS.Timeout | null = null;

    if (shouldPoll) {
      console.log('Starting polling for profile and predictions...');
      pollInterval = setInterval(fetchUserData, 5000); // Poll every 5 seconds
    } else if (!userData && !loading && !error) {
      // Initial fetch if no data
      fetchUserData();
    }

    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [navigate, loading, error, fetchUserData, userData?.long_term_reading_status]);

  return { userData, predictions, loading, error, fetchUserData, isOnboardingPending };
};

export default useUserData;
