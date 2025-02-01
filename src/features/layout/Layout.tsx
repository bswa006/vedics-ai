import { MessageCircle } from "lucide-react";
import { ReactNode } from "react";
import { ChatWidget } from "../chat/ChatWidget";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (value: boolean) => void;
}

export function Layout({
  children,
  darkMode,
  setDarkMode,
  isChatOpen,
  setIsChatOpen,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="max-w-lg mx-auto px-4 -mt-8">{children}</div>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(true)}
          className="bg-oriental-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
      {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}
