import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNav } from '../../components/navigation/BottomNav';
import { useUserDataContext } from '../../contexts/UserDataContext';
import { cn } from '../../lib/utils';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
  onLogout?: () => void;
}

export function Layout({ children, onLogout }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isOnboarding = location.pathname === '/onboarding';
  const { userData } = useUserDataContext();

  return (
    <div className="from-midnight-indigo text-cream-white min-h-screen bg-gradient-to-b via-[#1f1d3d] to-[#1a1b26] font-body transition-colors duration-300">
      {/* Header is already fixed in its component */}
      <Header onLogout={onLogout} userId={userData?.id} />

      {/* Content area with proper spacing for fixed header */}
      <div className="flex min-h-[calc(100vh-5rem)] flex-col pt-20">
        <main
          className={cn(
            'mx-auto w-full max-w-lg flex-1 overflow-y-auto',
            'pb-16', // Extra padding for bottom nav
            '[&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar]:w-2',
            '[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20'
          )}
        >
          {children}
        </main>

        {localStorage.getItem('token') &&
          !isOnboarding &&
          !localStorage.getItem('isProfileIncomplete') && (
            <div className="pb-safe fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#1a1b26] via-[#1a1b26] to-transparent pt-4">
              <BottomNav currentPath={location.pathname} onNavigate={path => navigate(path)} />
            </div>
          )}
      </div>
    </div>
  );
}
