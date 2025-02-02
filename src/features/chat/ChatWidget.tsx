import { Loader2, Send, X, Bot, User } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatApi, ChatMessage } from '../../hooks/useChatApi';
import { format } from 'date-fns';

interface ChatWidgetProps {
  onClose: () => void;
}

interface ExtendedChatMessage extends ChatMessage {
  timestamp: Date;
  isTyping?: boolean;
}

export function ChatWidget({ onClose }: ChatWidgetProps) {
  const { t } = useTranslation();
  const { createSessionId, sendMessage } = useChatApi();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Create new session when chat widget opens
    const newSessionId = createSessionId();
    setSessionId(newSessionId);
    setMessages([{ text: t('common.chatGreeting'), isUser: false, timestamp: new Date() }]);

    // Cleanup session when chat widget closes
    return () => {
      setSessionId('');
      setMessages([]);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const message = inputValue.trim();
    if (!message || isLoading) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { text: message, isUser: true, timestamp: new Date() }]);
      setInputValue('');

      // Show typing indicator
      setIsTyping(true);
      setMessages(prev => [...prev, { text: '', isUser: false, timestamp: new Date(), isTyping: true }]);

      const response = await sendMessage(message, sessionId);
      
      // Remove typing indicator and add response
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      setMessages(prev => [...prev, { text: response.reply, isUser: false, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      setMessages(prev => [...prev, { text: t('common.chatError'), isUser: false, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="animate-slideIn fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-oriental-900 to-oriental-800">
      {/* Chat Header */}
      <div className="flex items-center justify-between bg-white/5 p-4 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">{t('common.chat')}</h3>
            <p className="text-sm text-white/60">{isTyping ? t('common.typing') : t('common.online')}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/10"
        >
          <X className="h-5 w-5 text-white" aria-label={t('common.close')} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-end gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            {!message.isUser && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 flex-shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              {message.isTyping ? (
                <div className="flex gap-2 rounded-2xl bg-white/10 px-4 py-3">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white/60 [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-white/60"></div>
                </div>
              ) : (
                <div
                  className={`max-w-[280px] md:max-w-[400px] break-words rounded-2xl px-4 py-3 ${
                    message.isUser
                      ? 'bg-white text-oriental-900'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {message.text}
                </div>
              )}
              <span className="text-xs text-white/40 px-1">
                {format(message.timestamp, 'HH:mm')}
              </span>
            </div>
            {message.isUser && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white flex-shrink-0">
                <User className="h-5 w-5 text-oriental-900" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="bg-white/5 p-4 backdrop-blur-lg border-t border-white/10">
        <div className="flex gap-3 max-w-3xl mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            className="flex-1 rounded-full bg-white/10 px-6 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
            placeholder={t('common.typeMessage')}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white transition-all duration-200 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50 hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-oriental-900" />
            ) : (
              <Send className="h-5 w-5 text-oriental-900" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
