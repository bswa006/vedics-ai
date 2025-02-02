import { Loader2, Send, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useChatApi, ChatMessage } from '../../hooks/useChatApi';

interface ChatWidgetProps {
  onClose: () => void;
}

export function ChatWidget({ onClose }: ChatWidgetProps) {
  const { t } = useTranslation();
  const { createSessionId, sendMessage } = useChatApi();

  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Create new session when chat widget opens
    const newSessionId = createSessionId();
    setSessionId(newSessionId);
    setMessages([{ text: t('common.chatGreeting'), isUser: false }]);

    // Cleanup session when chat widget closes
    return () => {
      setSessionId('');
      setMessages([]);
    };
  }, []);

  const handleSend = async () => {
    const message = inputValue.trim();
    if (!message || isLoading) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { text: message, isUser: true }]);
      setInputValue('');

      const response = await sendMessage(message, sessionId);
      setMessages(prev => [...prev, { text: response.reply, isUser: false }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: t('common.chatError'), isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-slideIn fixed inset-0 z-50 flex flex-col bg-oriental-800">
      {/* Chat Header */}
      <div className="flex items-center justify-between bg-white/10 p-4 backdrop-blur-lg">
        <h3 className="text-lg font-medium text-white">{t('common.chat')}</h3>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/10"
        >
          <X className="h-5 w-5 text-white" aria-label={t('common.close')} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2 ${
                message.isUser ? 'bg-white text-oriental-900' : 'bg-white/10 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="bg-white/10 p-4 backdrop-blur-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            className="flex-1 rounded-lg bg-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder={t('common.chatGreeting')}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 font-medium text-oriental-900 transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('common.sending')}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t('common.send')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
