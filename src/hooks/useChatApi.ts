import { useState, useCallback } from 'react';
import { api } from '../services/api';

export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: string | Date;
  isTyping?: boolean;
}

export interface ChatResponse {
  message: {
    reply: string;
    session_id: string;
  };
}

export const useChatApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSessionId = useCallback(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not authenticated');

    // Check if we already have a session for this user
    const currentSession = sessionStorage.getItem(`chat_session_${userId}`);
    if (currentSession) return currentSession;

    // Create new session
    const currentTime = new Date().getTime();
    const sessionId = `session_${currentTime}`;
    sessionStorage.setItem(`chat_session_${userId}`, sessionId);
    return sessionId;
  }, []);

  const getCurrentSession = useCallback(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) throw new Error('User not authenticated');

    const currentSession = sessionStorage.getItem(`chat_session_${userId}`);
    if (currentSession) return currentSession;
    
    // If no session exists, create one
    return createSessionId();
  }, [createSessionId]);

  const saveMessages = useCallback((sessionId: string, messages: ChatMessage[]) => {
    if (!sessionId) return;
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const messagesToSave = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : msg.timestamp
    }));
    sessionStorage.setItem(`chat_messages_${userId}_${sessionId}`, JSON.stringify(messagesToSave));
  }, []);

  const loadMessages = useCallback((sessionId: string): ChatMessage[] => {
    if (!sessionId) return [];
    const userId = localStorage.getItem('userId');
    if (!userId) return [];

    const saved = sessionStorage.getItem(`chat_messages_${userId}_${sessionId}`);
    if (!saved) return [];
    
    try {
      const messages = JSON.parse(saved);
      return Array.isArray(messages) ? messages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })) : [];
    } catch {
      return [];
    }
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
