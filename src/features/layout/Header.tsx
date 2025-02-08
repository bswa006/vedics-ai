import { useTranslation } from 'react-i18next';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import LanguageSwitcher from '../../components/LanguageSwitcher';

interface HeaderProps {
  onLogout: (() => void) | undefined;
  userId: number | null | undefined;
}

export function Header({ onLogout, userId }: HeaderProps) {
  const { t } = useTranslation();
  const currentTime = new Date();
  const hours = currentTime.getHours();

  const getGreeting = () => {
    if (hours < 12) return t('greetings.morning');
    if (hours < 17) return t('greetings.afternoon');
    return t('greetings.evening');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 top-0 z-50 h-20 bg-[#1a1b26]/95 backdrop-blur-md"
    >
      <div className="relative mx-auto flex h-full max-w-lg items-center justify-between px-6">
        {/* Content */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7F7ACA]">
              <span className="text-lg">🌟</span>
            </div>
            <div>
              <h1 className="text-lg font-medium text-white">{getGreeting()}</h1>
              <p className="text-sm text-gray-400">{format(currentTime, 'MMMM d')}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          {userId && onLogout && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2A2B3B] text-gray-400 transition-all duration-300 hover:bg-[#363748] hover:text-white"
              title={t('common.logout')}
            >
              <LogOut className="text-creamWhite h-5 w-5" />
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
