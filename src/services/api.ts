import axios, { AxiosInstance } from 'axios';
import { PredictionResponse } from '../types/predictions';
import { TodayReadingsResponse } from '../types/readings';

const API_BASE_URL = 'https://staging-api.vedics.ai/api/v1/';

// Create axios instance with default config
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Navigation callback for auth redirects
let navigationCallback: ((path: string) => void) | null = null;

// Function to set the navigation callback
export const setNavigationCallback = (callback: (path: string) => void) => {
  navigationCallback = callback;
};

// Add response interceptor to handle auth errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle auth-related errors (401, 403)
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Don't clear localStorage for requests to auth endpoints
      const isAuthEndpoint = error.config?.url?.includes('/api/v1/api-token-auth/') || 
                            error.config?.url?.includes('/api/v1/users/');
      
      if (!isAuthEndpoint) {
        // Clear all localStorage only for non-auth endpoint failures
        localStorage.clear();
        
        // Use navigation callback if set, otherwise fallback to window.location
        if (navigationCallback) {
          navigationCallback('/login');
        } else {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export interface UserBirthDetails {
  date_of_birth: string;
  birth_time: string;
  place_of_birth: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface TokenResponse {
  token: string;
}

export interface LoginResponse {
  user_id: number;
  token: string;
}

export interface UserData {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserProfile {
  id: number;
  user: UserData;
  date_of_birth: string | null;
  time_of_birth: string | null;
  place_of_birth: string;
  preferred_language: string;
  area_of_interests: string[];
  long_term_reading_status: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfileResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserProfile[];
}

export interface ChatRequest {
  session_id: string;
  message: string;
}

export interface ChatResponse {
  message: {
    reply: string;
    session_id: string;
  };
}

interface RatingResponse {
  success: boolean;
  message: string;
}

// Helper function to handle axios errors
export const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (responseData?.errors) {
      // Convert array values to single strings
      const formattedErrors = Object.fromEntries(
        Object.entries(responseData.errors).map(([key, value]) => [
          key,
          Array.isArray(value) ? value[0] : value
        ])
      );

      throw new Error(JSON.stringify(formattedErrors));
    }

    throw new Error(responseData?.message || 'API request failed');
  }
  throw error;
};

export const api = {
  clearCache: () => {
    // Remove any existing cache headers
    delete axiosInstance.defaults.headers['Cache-Control'];
    delete axiosInstance.defaults.headers['Pragma'];
    localStorage.clear();
  },
  readings: {
    getTodayReadings: async (): Promise<TodayReadingsResponse> => {
      try {
        const response = await axiosInstance.get<TodayReadingsResponse>('/predictions/daily/', {
          params: { },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        return handleAxiosError(error);
      }
    },
  },
  auth: {
    getToken: async (credentials: LoginCredentials): Promise<TokenResponse> => {
      try {
        const response = await axiosInstance.post('/api-token-auth/', credentials);
        return response.data;
      } catch (error) {
        return handleAxiosError(error);
      }
    },
    createUser: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      try {
        const response = await axiosInstance.post('/users/', credentials);
        return response.data;
      } catch (error) {
        return handleAxiosError(error);
      }
    },
    googleLogin: async (data: { access_token: string }): Promise<LoginResponse> => {
      try {
        const response = await axiosInstance.post('/auth/google/', data, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        return response.data;
      } catch (error) {
        return handleAxiosError(error);
      }
    },
  },
  profiles: {
    updateProfile: async (userId: number, data: {
      date_of_birth?: string;
      time_of_birth?: string;
      place_of_birth?: string;
      preferred_language?: string;
      area_of_interests?: string[];
      first_name?: string;
      last_name?: string;
    }): Promise<UserProfile> => {
      try {
        const response = await axiosInstance.patch(`/profiles/profiles/${userId}/`, data);
        return response.data;
      } catch (error) {
        return handleAxiosError(error);
      }
    },
    getProfile: async (): Promise<UserProfile> => {
      try {
        const response = await axiosInstance.get<ProfileResponse>('/profiles/profiles/');
        const profileResponse = response.data;
        
        // Check if we have any results
        if (!profileResponse.results?.length) {
          throw new Error('Profile not found');
        }
        
        // Return the first profile with type assertion
        return profileResponse.results[0] as UserProfile;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Profile fetch error:', error.response?.data);
          throw new Error(`Failed to fetch profile: ${error.message}`);
        }
        throw error;
      }
    },
  },
  predictions: {
    getLongTermPredictions: async (): Promise<PredictionResponse> => {
      try {
        const response = await axiosInstance.get<{ message: PredictionResponse }>('/predictions/longterm/');
        return response.data.message;
      } catch (error) {
        return handleAxiosError(error);
      }
    },
  },
  users: {
    updateUser(userId: string, data: {
      first_name?: string;
      last_name?: string;
    }): Promise<UserData> {
      return axiosInstance
        .patch(`/users/${userId}/`, data)
        .then((response) => response.data)
        .catch(handleAxiosError);
    },
  },
  chat: {
    sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
      try {
        const response = await axiosInstance.post('assistant/chat/', request, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        return handleAxiosError(error);
      }
    },
  },
  ratings: {
    submit: async (userId: number, predictionId: string, rating: number): Promise<RatingResponse> => {
      try {
        const response = await axiosInstance.post(`/predictions/${predictionId}/rate`, {
          user_id: userId,
          rating
        });
        return response.data;
      } catch (error) {
        return handleAxiosError(error);
      }
    }
  }
};

export default api;
