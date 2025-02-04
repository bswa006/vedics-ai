import { ReactNode } from 'react';

import { Header } from './Header';
import { BottomNavigation } from '../../components/ui/BottomNavigation';

interface LayoutProps {
  children: ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;

  onLogout: () => void;
}

export function Layout({
  children,
  darkMode,
  setDarkMode,

  onLogout,
}: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} onLogout={onLogout} />

      <main className="relative flex-1 overflow-hidden">
        <div
          className="relative z-20 mx-auto h-[calc(100vh-4rem-4rem)] w-full max-w-lg overflow-y-auto"
          style={{ height: 'calc(100vh - 4rem - 4rem)' }} // 4rem for header, 4rem for bottom nav
        >
          {children}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
