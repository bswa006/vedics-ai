import { ReactNode, useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { Header } from './Header';
import { BottomNav } from '../../components/navigation/BottomNav';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { theme } from '../../styles/theme';

interface LayoutProps {
  children: ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onLogout?: () => void;
  userId?: number | null;
}

export function Layout({ children, darkMode, setDarkMode, onLogout, userId }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const isOnboarding = location.pathname === '/onboarding';
  const shouldReduceMotion = useReducedMotion();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    if (location.pathname) {
      setIsRouteChanging(true);
      const timer = setTimeout(() => setIsRouteChanging(false), 300);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
  };

  const transition = {
    type: shouldReduceMotion ? 'tween' : 'spring',
    duration: shouldReduceMotion ? parseFloat(theme.animations.transition.fast) / 1000 : undefined,
    stiffness: 200,
    damping: 20,
  };

  return (
    <motion.div className="from-midnight-indigo text-cream-white relative min-h-screen overflow-hidden bg-gradient-to-b via-[#1f1d3d] to-[#1a1b26] font-body transition-colors duration-300">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} onLogout={onLogout} userId={userId} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          className={cn(
            'relative mx-auto w-full max-w-lg overflow-y-auto',
            'transition-all duration-300 ease-in-out',
            'mt-20 pb-32', // Account for fixed header and bottom nav
            '[&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar]:w-2',
            '[&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20',
            isRouteChanging ? 'opacity-50' : 'opacity-100',
            !shouldReduceMotion && 'perspective-1000 preserve-3d'
          )}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {userId && !isOnboarding && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          <BottomNav
            currentPath={location.pathname}
            onNavigate={path => {
              setIsRouteChanging(true);
              navigate(path);
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
