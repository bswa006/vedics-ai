import { useState, useCallback } from 'react';
import { api } from '../services/api';

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: string | Date;
  isTyping?: boolean;
}

export interface ChatResponse {
  reply: string;
}

export const useChatApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSessionId = useCallback(() => {
    const now = new Date();
    const sessionId = `${now.getHours()}:${now.getMinutes()}_${now.getTime()}`;
    sessionStorage.setItem('currentChatSession', sessionId);
    return sessionId;
  }, []);

  const getCurrentSession = useCallback(() => {
    return sessionStorage.getItem('currentChatSession');
  }, []);

  const saveMessages = useCallback((sessionId: string, messages: ChatMessage[]) => {
    if (!sessionId) return;
    const messagesToSave = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp
    }));
    sessionStorage.setItem(`chat_${sessionId}`, JSON.stringify(messagesToSave));
  }, []);

  const loadMessages = useCallback((sessionId: string): ChatMessage[] => {
    if (!sessionId) return [];
    const saved = sessionStorage.getItem(`chat_${sessionId}`);
    return saved ? JSON.parse(saved) : [];
  }, []);

  const sendMessage = useCallback(async (message: string, sessionId: string): Promise<ChatResponse> => {
    if (!sessionId) throw new Error('No active session');
    
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
  }, []);

  return {
    loading,
    error,
    createSessionId,
    getCurrentSession,
    saveMessages,
    loadMessages,
    sendMessage
  };
};
