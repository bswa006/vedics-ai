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
      setMessages(prev => [
        ...prev,
        { text: '', isUser: false, timestamp: new Date(), isTyping: true },
      ]);

      const response = await sendMessage(message, sessionId);

      // Remove typing indicator and add response
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      setMessages(prev => [
        ...prev,
        { text: response.reply, isUser: false, timestamp: new Date() },
      ]);
    } catch (error) {
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      setMessages(prev => [
        ...prev,
        { text: t('common.chatError'), isUser: false, timestamp: new Date() },
      ]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div className="animate-slideIn fixed bottom-4 right-4 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl bg-[#2B3990] shadow-2xl">
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
          className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/20"
        >
          <X className="h-5 w-5 text-white" aria-label={t('common.close')} />
        </button>
      </div>

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
                  {message.text}
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
            onKeyPress={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            className="flex-1 rounded-full bg-white/20 px-4 py-3 text-white placeholder-white/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder={t('common.typeMessage')}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#536DFE] transition-all duration-200 hover:scale-105 hover:bg-white/90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
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
