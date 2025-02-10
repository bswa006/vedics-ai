import { Loader2, Send, Bot, User } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatApi, ChatMessage } from '../../hooks/useChatApi';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

// Using ChatMessage directly since it now includes all needed fields
type ExtendedChatMessage = ChatMessage & {
  timestamp: Date; // Override to ensure timestamp is Date in runtime
};

export function Chat() {
  const { t } = useTranslation();
  const { createSessionId, getCurrentSession, saveMessages, sendMessage, loadMessages } = useChatApi();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize chat and clear messages on page load
  const suggestedQuestions = [
    t('chat.suggestedQuestions.relationships'),
    t('chat.suggestedQuestions.luckyColors'),
    t('chat.suggestedQuestions.remedies'),
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    handleSend(question);
  };

  useEffect(() => {
    // Get or create session
    const currentSessionId = getCurrentSession();
    setSessionId(currentSessionId);

    // Load existing messages or set initial message
    const existingMessages = loadMessages(currentSessionId);
    if (existingMessages.length > 0) {
      // Convert timestamps to Date objects
      const messagesWithDateTimestamps = existingMessages.map(msg => ({
        ...msg,
        timestamp: msg.timestamp instanceof Date ? msg.timestamp : new Date(msg.timestamp)
      }));
      setMessages(messagesWithDateTimestamps);
    } else {
      const initialMessage: ExtendedChatMessage = {
        text: t('common.chatGreeting'),
        isUser: false,
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
      // Save initial message
      saveMessages(currentSessionId, [initialMessage]);
    }
  }, [getCurrentSession, createSessionId, saveMessages, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = useCallback(
    async (forcedMessage?: string) => {
      const message = forcedMessage || inputValue.trim();
      if (!message || isLoading || !sessionId) return;

      try {
        setIsLoading(true);
        setIsTyping(true); // Show typing indicator when sending message

        // Add user message
        const userMessage: ExtendedChatMessage = {
          text: message,
          isUser: true,
          timestamp: new Date(),
        };

        // Update messages with user message
        setMessages(prev => {
          const newMessages = [...prev, userMessage];
          saveMessages(sessionId, newMessages);
          return newMessages;
        });
        setInputValue('');

        // Send message and wait for response
        const response = await sendMessage(message, sessionId);

        // Update messages with response
        setMessages(prev => {
          const messagesWithoutTyping = prev.filter(msg => !msg.isTyping);
          const botMessage: ExtendedChatMessage = {
            text: response.message.reply,
            isUser: false,
            timestamp: new Date(),
          };
          const newMessages = [...messagesWithoutTyping, botMessage];
          saveMessages(sessionId, newMessages);
          return newMessages;
        });
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prev => {
          const messagesWithoutTyping = prev.filter(msg => !msg.isTyping);
          const errorMessage: ExtendedChatMessage = {
            text: t('common.error'),
            isUser: false,
            timestamp: new Date(),
          };
          return [...messagesWithoutTyping, errorMessage];
        });
      } finally {
        setIsLoading(false);
        setIsTyping(false); // Hide typing indicator after response
      }
    },
    [inputValue, isLoading, sessionId, sendMessage, saveMessages, t]
  );

  return (
    <div className="flex h-[calc(100vh-13rem)] flex-col overflow-hidden bg-[#1a1b26]">
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7F7ACA] text-white">
                  <Bot className="h-5 w-5" />
                </div>
              )}
              <div
                className={`group relative max-w-[80%] rounded-lg px-4 py-2 ${
                  message.isUser ? 'bg-[#7F7ACA] text-white' : 'bg-[#2A2B3B] text-gray-200'
                }`}
              >
                {message.isTyping ? (
                  <Loader2 className="text-vedicSaffron dark:text-celestialLilac h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ReactMarkdown className="prose dark:prose-invert max-w-none">
                      {message.text}
                    </ReactMarkdown>
                    <div className="mt-1 text-xs text-gray-400">
                      {format(message.timestamp, 'HH:mm')}
                    </div>
                  </>
                )}
              </div>
              {message.isUser && (
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7F7ACA] text-white">
                  <User className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 p-2 text-gray-300">
              <Bot className="h-6 w-6 text-[#7F7ACA]" />
              <Loader2 className="h-4 w-4 animate-spin text-[#7F7ACA]" />
              <span className="text-sm text-gray-400">{t('common.typing')}</span>
            </div>
          )}
          {messages.length === 1 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="rounded-full bg-[#2A2B3B] py-1.5 pl-3 pr-4 text-sm font-medium text-gray-200 hover:bg-[#7F7ACA]/20"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="fixed bottom-[4.5rem] left-0 right-0 mx-auto w-full max-w-lg border-t border-white/5 bg-[#1a1b26]/95 px-4 py-3 backdrop-blur-md">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t('chat.inputPlaceholder')}
            className="w-full rounded-xl border border-white/5 bg-[#2A2B3B] px-4 py-2 pr-12 text-white placeholder-gray-500 focus:border-[#7F7ACA]/50 focus:outline-none focus:ring-2 focus:ring-[#7F7ACA]/20"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isLoading}
            className="text-coolGray hover:text-vedicSaffron dark:text-coolGray/60 dark:hover:text-celestialLilac absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
