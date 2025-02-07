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
    // Check if we already have a session for this page load
    const pageLoadTime = sessionStorage.getItem('pageLoadTime');
    const currentTime = new Date().getTime();

    // If this is a page reload or first load
    if (!pageLoadTime || (currentTime - parseInt(pageLoadTime)) > 1000) {
      // Clear previous chat data
      Object.keys(sessionStorage).forEach(key => {
        if (key.startsWith('chat_') || key === 'currentChatSession') {
          sessionStorage.removeItem(key);
        }
      });
      // Set new page load time
      sessionStorage.setItem('pageLoadTime', currentTime.toString());
      
      // Create new session
      const sessionId = `session_${currentTime}`;
      sessionStorage.setItem('currentChatSession', sessionId);
      return sessionId;
    }

    // If we're just reopening the widget, use existing session
    const existingSession = sessionStorage.getItem('currentChatSession');
    if (existingSession) {
      return existingSession;
    }

    // Fallback: create new session
    const sessionId = `session_${currentTime}`;
    sessionStorage.setItem('currentChatSession', sessionId);
    return sessionId;
  }, []);

  const getCurrentSession = useCallback(() => {
    const currentSession = sessionStorage.getItem('currentChatSession');
    if (currentSession) return currentSession;
    
    // If no session exists, create one
    return createSessionId();
  }, [createSessionId]);

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
    if (!saved) return [];
    
    try {
      const messages = JSON.parse(saved);
      return Array.isArray(messages) ? messages : [];
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
