import { Loader2, Send, X, Bot, User } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatApi, ChatMessage } from '../../hooks/useChatApi';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';

interface ChatWidgetProps {
  onClose: () => void;
}

// Using ChatMessage directly since it now includes all needed fields
type ExtendedChatMessage = ChatMessage & {
  timestamp: Date; // Override to ensure timestamp is Date in runtime
};

export function ChatWidget({ onClose }: ChatWidgetProps) {
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

        // Show typing indicator
        setIsTyping(true);
        setMessages(prev => [
          ...prev,
          { text: '', isUser: false, timestamp: new Date(), isTyping: true } as ExtendedChatMessage,
        ]);

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
        // Remove typing indicator and add error message
        setMessages(prev => {
          const messagesWithoutTyping = prev.filter(msg => !msg.isTyping);
          const errorMessage: ExtendedChatMessage = {
            text: t('common.chatError'),
            isUser: false,
            timestamp: new Date(),
          };
          const newMessages = [...messagesWithoutTyping, errorMessage];
          saveMessages(sessionId, newMessages);
          return newMessages;
        });
      } finally {
        setIsTyping(false);
        setIsLoading(false);
      }
    },
    [inputValue, isLoading, sessionId, t, sendMessage, saveMessages]
  );

  return (
    <div className="animate-slideIn fixed bottom-4 left-4 right-4 z-50 flex h-[500px] w-[calc(100%-2rem)] max-w-[350px] flex-col overflow-hidden rounded-2xl bg-[#2B3990] shadow-2xl">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div>
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Chat with us</h3>
            <p className="text-sm text-white/80">
              {isTyping ? t('common.typing') : t('common.online')}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 transition-all duration-200 hover:from-blue-500/30 hover:via-purple-500/30 hover:to-pink-500/30"
        >
          <X className="h-5 w-5 text-white" aria-label={t('common.close')} />
        </button>
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="space-y-2 p-4">
          <p className="text-sm text-white/80">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="rounded-full bg-white/10 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-white/20"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isUser && (
              <div className="hidden">
                <Bot className="h-5 w-5 text-white" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              {message.isTyping ? (
                <div className="flex gap-2 rounded-2xl bg-[#3A4DB1] px-4 py-3">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white/60"></div>
                </div>
              ) : (
                <div
                  className={`max-w-[280px] break-words rounded-2xl px-4 py-3 ${
                    message.isUser ? 'bg-white text-[#2B3990]' : 'bg-[#3A4DB1] text-white'
                  }`}
                >
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="m-0">{children}</p>,
                      strong: ({ children }) => <span className="font-bold">{children}</span>,
                      em: ({ children }) => <span className="italic">{children}</span>,
                      ul: ({ children }) => <ul className="ml-4 mt-1 list-disc">{children}</ul>,
                      ol: ({ children }) => <ol className="ml-4 mt-1 list-decimal">{children}</ol>,
                      li: ({ children }) => <li className="mt-0.5">{children}</li>,
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          className="text-blue-300 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              )}
              <span className="px-1 text-xs text-white/60">
                {format(message.timestamp, 'HH:mm')}
              </span>
            </div>
            {message.isUser && (
              <div className="hidden">
                <User className="h-5 w-5 text-oriental-900" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t border-white/10 bg-[#3A4DB1] p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter' && !e.shiftKey && !isLoading && inputValue.trim()) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="flex-1 rounded-full bg-white/20 px-4 py-3 text-white placeholder-white/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={isLoading ? t('common.processing') : t('common.typeMessage')}
            disabled={isLoading}
            aria-disabled={isLoading}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-200 hover:scale-105 hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={isLoading ? t('common.processing') : t('common.send')}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <Send className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
