import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';
import { Home, Sparkles, MessageCircle, User } from 'lucide-react';

interface NavItem {
  id: string;
  icon: React.ElementType;
  label: string;
  path: string;
}

interface BottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function BottomNav({ currentPath, onNavigate }: BottomNavProps) {
  const { t } = useTranslation();

  const navItems: NavItem[] = [
    {
      id: 'home',
      icon: Home,
      label: t('navigation.home'),
      path: '/',
    },
    {
      id: 'predictions',
      icon: Sparkles,
      label: t('navigation.predictions'),
      path: '/daily-stars',
    },
    {
      id: 'chat',
      icon: MessageCircle,
      label: t('navigation.chat'),
      path: '/chat',
    },
    {
      id: 'profile',
      icon: User,
      label: t('navigation.profile'),
      path: '/profile',
    },
  ];

  return (
    <nav 
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/5 bg-[#1a1b26]/95 backdrop-blur-lg" 
      style={{ 
        transform: 'translate3d(0, 0, 0)', 
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        willChange: 'transform'
      }}>
      <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2">
        {navItems.map(item => (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.path)}
            className={cn(
              'group relative flex flex-col items-center gap-1 px-4 py-2',
              'transition-all duration-300 ease-in-out',
              currentPath === item.path ? 'text-[#7F7ACA]' : 'text-gray-500 hover:text-gray-300'
            )}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="flex flex-col items-center"
              animate={{
                y: currentPath === item.path ? -2 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {React.createElement(item.icon, {
                size: 20,
                className: cn(
                  'transition-all duration-300',
                  currentPath === item.path ? 'stroke-[#7F7ACA]' : 'stroke-current'
                ),
              })}
              <span className="mt-1 text-[10px] font-medium">{item.label}</span>
            </motion.div>
            {currentPath === item.path && (
              <motion.div
                className="absolute -bottom-2 h-[2px] w-12 bg-[#7F7ACA]"
                layoutId="bottomNav"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </nav>
  );
}
