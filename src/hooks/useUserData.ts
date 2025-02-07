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

      if (hasAllRequiredFields && window.location.pathname === '/login') {
        navigate('/');
      }
      setUserData(user);

      console.log('Fetching long term predictions...');
      const predictionsResponse = await getLongTermPredictions();
      console.log('Predictions response:', predictionsResponse);
      setPredictions(predictionsResponse);
    } catch (err) {
      console.error('Error fetching user data:', err);
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
      if (!token) {
        // Only navigate if we're not already on the login page
        if (window.location.pathname !== '/login') {
          navigate('/login');
        }
      }
      return;
    }

    // Only fetch if we don't have data and aren't already loading
    if (!userData && !loading && !error) {
      fetchUserData();
    }
  }, [navigate, loading, error, fetchUserData]);

  return { userData, predictions, loading, error, fetchUserData };
};

export default useUserData;
