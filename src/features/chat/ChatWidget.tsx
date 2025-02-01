import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ChatWidgetProps {
  onClose: () => void;
}

export function ChatWidget({ onClose }: ChatWidgetProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([{ text: t("common.chatGreeting"), isUser: false }]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue, isUser: true }]);
      setInputValue("");
    }
  };

  return (
    <div className="fixed inset-0 bg-oriental-800 z-50 flex flex-col animate-slideIn">
      {/* Chat Header */}
      <div className="p-4 flex items-center justify-between bg-white/10 backdrop-blur-lg">
        <h3 className="text-white text-lg font-medium">{t("common.chat")}</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-white" aria-label={t("common.close")} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2 ${
                message.isUser
                  ? "bg-white text-oriental-900"
                  : "bg-white/10 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white/10 backdrop-blur-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
            placeholder={t("common.chatGreeting")}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-white text-oriental-900 rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            {t("common.send")}
          </button>
        </div>
      </div>
    </div>
  );
}
