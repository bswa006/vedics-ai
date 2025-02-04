
import { ReactNode } from 'react';
import { ChatWidget } from '../chat/ChatWidget';
import { Header } from './Header';
import { BottomNavigation } from '../../components/ui/BottomNavigation';

interface LayoutProps {
  children: ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  isChatOpen: boolean;
  setIsChatOpen: (value: boolean) => void;
  onLogout: () => void;
}

export function Layout({
  children,
  darkMode,
  setDarkMode,
  isChatOpen,
  setIsChatOpen,
  onLogout,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} onLogout={onLogout} />

      <div className="relative z-20 mx-auto max-w-lg px-4 pb-20">{children}</div>

      {isChatOpen && <ChatWidget onClose={() => setIsChatOpen(false)} />}
      <BottomNavigation onAskAnything={() => setIsChatOpen(true)} />
    </div>
  );
}
