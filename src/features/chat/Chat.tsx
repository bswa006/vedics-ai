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
    'How can I improve my relationships?',
    'What are my lucky colors for today?',
    'What remedies should I follow this week?',
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
            text: response.reply,
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
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] pb-2">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute h-1 w-1 animate-[twinkle_3s_ease-in-out_infinite] rounded-full bg-white opacity-60"
          style={{ top: '10%', left: '15%' }}
        />
        <div
          className="absolute h-1 w-1 animate-[twinkle_3s_ease-in-out_infinite] rounded-full bg-white opacity-60"
          style={{ top: '50%', left: '75%', animationDelay: '0.5s' }}
        />
        <div
          className="absolute h-1 w-1 animate-[twinkle_3s_ease-in-out_infinite] rounded-full bg-white opacity-60"
          style={{ top: '30%', left: '45%', animationDelay: '1s' }}
        />
        <div
          className="absolute h-1 w-1 animate-[twinkle_3s_ease-in-out_infinite] rounded-full bg-white opacity-60"
          style={{ top: '70%', left: '25%', animationDelay: '1.5s' }}
        />
        <div
          className="absolute h-1 w-1 animate-[twinkle_3s_ease-in-out_infinite] rounded-full bg-white opacity-60"
          style={{ top: '20%', left: '85%', animationDelay: '2s' }}
        />
      </div>
      <div className="relative z-10 flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2 ${
                message.isUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!message.isUser && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Bot className="text-primary h-5 w-5" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.isUser
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'bg-black/20 text-white backdrop-blur-sm'
                }`}
              >
                {message.isTyping ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ReactMarkdown className="prose dark:prose-invert max-w-none">
                      {message.text}
                    </ReactMarkdown>
                    <div
                      className={`mt-1 text-xs ${
                        message.isUser ? 'text-white/70' : 'text-text-light-secondary'
                      }`}
                    >
                      {format(message.timestamp, 'HH:mm')}
                    </div>
                  </>
                )}
              </div>
              {message.isUser && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <User className="text-primary h-5 w-5" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 p-2 text-white/70">
              <Bot className="h-6 w-6" />
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Typing...</span>
            </div>
          )}
          {messages.length === 1 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm hover:bg-white/20"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10 bg-black/20 p-4 backdrop-blur-sm">
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
            placeholder={t('common.typeMessage')}
            className="focus:ring-primary w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 pr-10 text-white placeholder-white/50 backdrop-blur-sm focus:outline-none focus:ring-2"
            disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/70 hover:text-white disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
