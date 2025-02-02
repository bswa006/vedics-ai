import { useState } from 'react';
import { api } from '../services/api';

export interface ChatMessage {
  text: string;
  isUser: boolean;
}

export const useChatApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSessionId = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}_${now.getTime()}`;
  };

  interface ChatResponse {
    reply: string;
  }

  const sendMessage = async (message: string, sessionId: string): Promise<ChatResponse> => {
    try {
      setLoading(true);
      setError(null);
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await api.chat.sendMessage({
        user_id: userId,
        session_id: sessionId,
        message
      });

      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createSessionId,
    sendMessage
  };
};
