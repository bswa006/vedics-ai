import { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Header } from './Header';
import { BottomNavigation } from '../../components/ui/BottomNavigation';

interface LayoutProps {
  children: ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onLogout: () => void;
  userId?: number | null;
}

export function Layout({ children, darkMode, setDarkMode, onLogout, userId }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 transition-colors duration-200 dark:bg-gray-900">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} onLogout={onLogout} />

      <main className="relative flex-1 overflow-hidden">
        <div
          className={cn(
            'relative z-20 mx-auto w-full max-w-lg overflow-y-auto',
            userId ? 'h-[calc(100vh-8rem)]' : 'h-[calc(100vh-4rem)]'
          )}
        >
          {children}
        </div>
      </main>

      {userId && <BottomNavigation />}
    </div>
  );
}
