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
  const { createSessionId, getCurrentSession, saveMessages, sendMessage } = useChatApi();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize chat and clear messages on page load
  const suggestedQuestions = [
    'how can i improve my relationships?',
    'what are my lucky colors for today?',
    'what remedies should i follow this week?',
  ];

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    handleSend(question);
  };

  useEffect(() => {
    // Get or create session
    const currentSessionId = getCurrentSession();
    setSessionId(currentSessionId);

    // Clear existing messages and set initial message on every page load
    const initialMessage = {
      text: t('common.chatGreeting'),
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
    // Save initial message
    saveMessages(currentSessionId, [initialMessage]);
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
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 pb-2 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-0 h-64 w-64 rounded-full bg-gradient-to-br from-purple-100/30 to-transparent blur-3xl dark:from-purple-900/10" />
        <div className="absolute -right-4 bottom-0 h-64 w-64 rounded-full bg-gradient-to-br from-purple-100/30 to-transparent blur-3xl dark:from-purple-900/10" />
      </div>
      <div className="relative z-10 flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!message.isUser && (
                <div className="animate-fade-in flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-200 to-purple-300 text-purple-700 shadow-md transition-transform duration-200 hover:scale-110 dark:from-purple-800/40 dark:to-purple-900/60 dark:text-purple-300">
                  <Bot className="h-5 w-5" />
                </div>
              )}
              <div
                className={`group relative max-w-[80%] rounded-lg px-4 py-2 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                  message.isUser
                    ? 'bg-gradient-to-br from-purple-200 to-purple-300 text-purple-900 dark:from-purple-800/40 dark:to-purple-900/60 dark:text-purple-100'
                    : 'bg-white/80 text-gray-800 dark:bg-gray-800/80 dark:text-gray-200'
                }`}
              >
                {message.isTyping ? (
                  <Loader2 className="h-5 w-5 animate-spin text-purple-600 dark:text-purple-400" />
                ) : (
                  <>
                    <ReactMarkdown className="prose dark:prose-invert max-w-none">
                      {message.text}
                    </ReactMarkdown>
                    <div className="mt-1 text-xs text-gray-600/90 transition-opacity group-hover:opacity-100 dark:text-gray-400/90">
                      {format(message.timestamp, 'HH:mm')}
                    </div>
                  </>
                )}
              </div>
              {message.isUser && (
                <div className="animate-fade-in flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-200 to-purple-300 text-purple-700 shadow-md transition-transform duration-200 hover:scale-110 dark:from-purple-800/40 dark:to-purple-900/60 dark:text-purple-300">
                  <User className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 p-2 text-gray-600 dark:text-gray-300">
              <Bot className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <Loader2 className="h-4 w-4 animate-spin text-purple-600 dark:text-purple-400" />
              <span className="text-sm">Typing...</span>
            </div>
          )}
          {messages.length === 1 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="group relative rounded-full bg-gradient-to-r from-purple-100 to-purple-200 py-1.5 pl-3 pr-4 text-sm font-medium text-purple-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:from-purple-800/30 dark:to-purple-900/40 dark:text-purple-200"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="relative z-10 border-t border-gray-200 bg-white/70 p-4 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-900/70">
        <div className="relative mx-auto max-w-3xl">
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
            placeholder={t('common.typeMessage')}
            className="w-full rounded-lg border-2 border-gray-200 bg-white/80 px-4 py-3 pr-10 text-gray-900 placeholder-gray-500 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-purple-300 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500 dark:focus:ring-offset-gray-900"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-200 to-purple-300 p-2 text-purple-700 opacity-90 transition-all duration-200 hover:opacity-100 hover:shadow-md disabled:opacity-50 disabled:hover:opacity-50 dark:from-purple-800/40 dark:to-purple-900/60 dark:text-purple-200"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
