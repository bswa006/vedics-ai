import axios from 'axios';
import { PredictionResponse } from '../types/predictions';
import { TodayReadingsResponse } from '../types/readings';

const API_BASE_URL = 'http://152.67.9.249:5001/api';

export interface UserBirthDetails {
  date_of_birth: string;
  birth_time: string;
  place_of_birth: string;
  phone: string;
}

export interface ChatRequest {
  user_id: string;
  session_id: string;
  message: string;
}

export interface ChatResponse {
  reply: string;
}

interface RatingResponse {
  success: boolean;
  message: string;
}

export const api = {
  readings: {
    getTodayReadings: async (userId: number): Promise<TodayReadingsResponse> => {
      try {
        const response = await axios.post(`${API_BASE_URL}/today_readings`, { user_id: userId }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || 'Failed to fetch today\'s readings');
        }
        throw error;
      }
    },
  },
  users: {
    validatePhoneNumber: async (phoneNumber: string) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/phone_number`, {
          params: { phone_number: phoneNumber },
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || 'Failed to validate phone number');
        }
        throw error;
      }
    },
    create: async (birthDetails: UserBirthDetails) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/users`, birthDetails, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || 'Failed to create user');
        }
        throw error;
      }
    },
    getUser: async (userId: number) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || 'Failed to fetch user');
        }
        throw error;
      }
    },
    getReadings: async (userId: number): Promise<PredictionResponse> => {
      try {
        const response = await axios.get<PredictionResponse>(`${API_BASE_URL}/users/${userId}/readings`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || 'Failed to fetch user readings');
        }
        throw error;
      }
    },
  },
  chat: {
    sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
      try {
        const response = await axios.post(`${API_BASE_URL}/chat`, request, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data?.message || 'Failed to send message');
        }
        throw error;
      }
    },
  },
  ratings: {
    submit: async (userId: number, predictionId: string, rating: number): Promise<RatingResponse> => {
      const response = await axios.post(`${API_BASE_URL}/predictions/${predictionId}/rate`, {
        user_id: userId,
        rating
      });
      return response.data;
    }
  }
};

export default api;
