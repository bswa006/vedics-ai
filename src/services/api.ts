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

// Add response interceptor to handle 403 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Clear all localStorage
      localStorage.clear();
      
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface UserBirthDetails {
  date_of_birth: string;
  birth_time: string;
  place_of_birth: string;
  phone: string;
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
  phone_number: string;
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
    throw new Error(error.response?.data?.message || 'API request failed');
  }
  throw error;
};

export const api = {
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
  },
  profiles: {
    updateProfile: async (userId: number, data: {
      date_of_birth?: string;
      time_of_birth?: string;
      place_of_birth?: string;
      preferred_language?: string;
      area_of_interests?: string[];
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
        const response = await axiosInstance.get<ProfileResponse>('/profiles/profiles/')
          .then((response) => {
            const profileResponse = response.data;
            if (!profileResponse.results?.length) {
              throw new Error('Profile not found');
            }
            // Assert that we will always have a profile at this point
            return profileResponse.results[0]!;
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              throw new Error(`Failed to fetch profile: ${error.message}`);
            }
            throw error;
          });
        return response;
      } catch (error) {
        return handleAxiosError(error);
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
