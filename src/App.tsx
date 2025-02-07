import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from './services/api';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { Layout } from './features/layout/Layout';
import { PredictionContent } from './features/predictions/PredictionContent';
import { Profile } from './features/profile/Profile';
import { Login } from './features/auth/Login';
import { Chat } from './features/chat/Chat';
import { DailyStars } from './features/daily-stars/DailyStars';
import './i18n/config';
import { Modal } from './components/Modal';
import { UserDataProvider, useUserDataContext } from './contexts/UserDataContext';
import { OnboardingFlow } from './features/onboarding/OnboardingFlow';

interface AppContentProps {
  userId: number | null;
  setUserId: (id: number | null) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  handleLogout: () => void;
  showLogoutModal: boolean;
  setShowLogoutModal: (show: boolean) => void;
  confirmLogout: () => void;
}

const AppContent: React.FC<AppContentProps> = React.memo(
  ({
    userId,
    setUserId,
    darkMode,
    setDarkMode,
    handleLogout,
    showLogoutModal,
    setShowLogoutModal,
    confirmLogout,
  }: AppContentProps) => {
    const { t } = useTranslation();
    const { userData, predictions, error } = useUserDataContext();
    const navigate = useNavigate();

    // Data fetching is now handled in useUserData hook
    useEffect(() => {
      console.log('userData: ------------', userData);
    }, [userData]);

    const isProfileIncomplete = useMemo(() => {
      // If we have a token but no userData or incomplete profile data, consider it incomplete
      if (
        !userData ||
        !userData.date_of_birth ||
        !userData.time_of_birth ||
        !userData.place_of_birth
      ) {
        return true;
      }
      return false;
    }, [userData]);

    const isUserOnboarding = useMemo(
      () =>
        userData?.long_term_reading_status === 'pending' ||
        userData?.long_term_reading_status === 'started',
      [userData]
    );

    // Redirect to onboarding if profile is incomplete
    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log(
        'Redirection check - Auth:',
        !!token,
        'Profile Incomplete:',
        isProfileIncomplete,
        'Current Path:',
        window.location.pathname
      );

      if (token) {
        if (isProfileIncomplete && window.location.pathname !== '/onboarding') {
          console.log('Profile incomplete, redirecting to onboarding');
          navigate('/onboarding', { replace: true });
        } else if (
          !isProfileIncomplete &&
          (window.location.pathname === '/login' || window.location.pathname === '/onboarding')
        ) {
          console.log('Profile completed, redirecting to home');
          navigate('/', { replace: true });
        }
      } else if (window.location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    }, [isProfileIncomplete, navigate]);

    return (
      <>
        {/* Modal for logout confirmation */}
        {showLogoutModal && (
          <Modal
            isOpen={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            title={t('auth.logoutConfirmTitle')}
            confirmText={t('common.yes')}
            cancelText={t('common.no')}
            onConfirm={confirmLogout}
          >
            {t('auth.logoutConfirmMessage')}
          </Modal>
        )}
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={!!localStorage.getItem('token') ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/onboarding"
            element={
              <Layout
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onLogout={handleLogout}
                userId={userId}
              >
                <OnboardingFlow
                  onComplete={async (data: unknown) => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    window.location.href = '/';
                    console.log('Onboarding completed:', data);
                    const storedUserId = localStorage.getItem('userId');
                    if (storedUserId) {
                      setUserId(parseInt(storedUserId, 10));
                    }
                    navigate('/', { replace: true });
                  }}
                />
              </Layout>
            }
          />

          {/* Root Route - Protected */}
          <Route
            path="/"
            element={
              !localStorage.getItem('token') ? (
                <Navigate to="/login" replace />
              ) : (
                <Layout
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  onLogout={handleLogout}
                  userId={userId}
                >
                  <div className="mx-auto max-w-5xl space-y-4 pb-4 text-text-light-primary transition-colors duration-200 dark:text-text-dark-primary">
                    {isUserOnboarding && (
                      <div className="mx-auto mt-8 max-w-3xl px-4">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl dark:from-purple-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 dark:shadow-indigo-900/10"
                        >
                          {/* Animated background effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-200/20 via-blue-200/20 to-indigo-200/20 dark:from-purple-500/10 dark:via-blue-500/10 dark:to-indigo-500/10"
                            animate={{
                              opacity: [0.5, 0.8, 0.5],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                          <div className="relative flex items-center gap-6">
                            <div className="flex-none">
                              <div className="relative">
                                {/* Rotating gradient border */}
                                <motion.div
                                  className="absolute -inset-1 rounded-xl bg-gradient-to-r from-violet-600 via-blue-600 to-purple-600 opacity-75 blur-sm group-hover:opacity-100"
                                  animate={{
                                    background: [
                                      'linear-gradient(0deg, #4F46E5, #7C3AED, #2563EB)',
                                      'linear-gradient(360deg, #2563EB, #4F46E5, #7C3AED)',
                                    ],
                                  }}
                                  transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                />
                                <motion.div
                                  animate={{ 
                                    rotate: [0, 360],
                                  }}
                                  transition={{ 
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                  className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-[1px] backdrop-blur-xl"
                                >
                                  {/* Inner content with glass effect */}
                                  <div className="relative h-full w-full overflow-hidden rounded-xl bg-white/90 dark:bg-gray-900/90">
                                    {/* Animated background shapes */}
                                    <motion.div
                                      className="absolute inset-0 opacity-30"
                                      animate={{
                                        background: [
                                          'radial-gradient(circle at 50% 50%, #4F46E5 0%, transparent 50%)',
                                          'radial-gradient(circle at 60% 40%, #7C3AED 0%, transparent 50%)',
                                          'radial-gradient(circle at 40% 60%, #2563EB 0%, transparent 50%)',
                                        ],
                                      }}
                                      transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }}
                                    />
                                    {/* Animated icon */}
                                    <motion.div
                                      className="relative flex h-full w-full items-center justify-center text-2xl"
                                      animate={{
                                        scale: [1, 1.2, 1],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                      }}
                                    >
                                      <motion.span
                                        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                                        animate={{
                                          opacity: [0.7, 1, 0.7],
                                          scale: [1, 1.1, 1],
                                          rotate: [0, 15, -15, 0],
                                        }}
                                        transition={{
                                          duration: 3,
                                          repeat: Infinity,
                                          ease: "easeInOut"
                                        }}
                                      >
                                        ✨
                                      </motion.span>
                                    </motion.div>
                                  </div>
                                </motion.div>
                              </div>
                            </div>
                            <div className="flex-1 min-w-0 space-y-2">
                              <h2 className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 bg-clip-text text-lg font-semibold text-transparent dark:from-purple-200 dark:via-blue-200 dark:to-indigo-200">
                                {t('onboarding.pendingTitle')}
                              </h2>
                              <p className="text-sm leading-relaxed text-purple-800/80 dark:text-purple-200/80">
                                {t('onboarding.pendingDescription')}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                    {error ? (
                      <div className="text-center text-red-500 transition-colors duration-200 dark:text-red-400">
                        {t('common.error')}: {error}
                      </div>
                    ) : !userData ? (
                      <div className="flex items-center justify-center p-8">
                        <div className="text-center">
                          <div className="mb-4 text-4xl">⏳</div>
                          <h2 className="mb-2 text-lg font-medium">{t('common.loading')}</h2>
                        </div>
                      </div>
                    ) : (
                      <>
                        {predictions && predictions.length > 0 && (
                          <PredictionContent predictions={predictions} />
                        )}
                      </>
                    )}
                  </div>
                </Layout>
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              !localStorage.getItem('token') ? (
                <Navigate to="/login" replace />
              ) : isUserOnboarding ? (
                <Navigate to="/onboarding" replace />
              ) : (
                <Layout
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  onLogout={handleLogout}
                  userId={userId}
                >
                  <Profile />
                </Layout>
              )
            }
          />
          <Route
            path="/chat"
            element={
              !localStorage.getItem('token') ? (
                <Navigate to="/login" replace />
              ) : isUserOnboarding ? (
                <Navigate to="/onboarding" replace />
              ) : (
                <Layout
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  onLogout={handleLogout}
                  userId={userId}
                >
                  <Chat />
                </Layout>
              )
            }
          />
          <Route
            path="/daily-stars"
            element={
              !localStorage.getItem('token') ? (
                <Navigate to="/login" replace />
              ) : isUserOnboarding ? (
                <Navigate to="/onboarding" replace />
              ) : (
                <Layout
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  onLogout={handleLogout}
                  userId={userId}
                >
                  <DailyStars userId={userId as number} />
                </Layout>
              )
            }
          />
          {/* Catch all - Protected */}
          <Route
            path="*"
            element={
              !localStorage.getItem('token') ? (
                <Navigate to="/login" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </>
    );
  }
);

const App: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId, 10) : null;
  });

  // Fetch user profile and set userId when token exists but userId doesn't
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const storedUserId = localStorage.getItem('userId');

      if (token && !storedUserId) {
        try {
          const userProfile = await api.profiles.getProfile();
          if (userProfile.id) {
            localStorage.setItem('userId', userProfile.id.toString());
            window.dispatchEvent(new Event('storage'));
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUserId = localStorage.getItem('userId');
      setUserId(storedUserId ? parseInt(storedUserId, 10) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const [darkMode, setDarkMode] = useState(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const confirmLogout = useCallback(() => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setUserId(null);
    setShowLogoutModal(false);
    window.location.href = '/login';
  }, []);

  console.log('app rendering...');

  return (
    <Router>
      <UserDataProvider>
        <AppContent
          userId={userId}
          setUserId={setUserId}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          handleLogout={handleLogout}
          showLogoutModal={showLogoutModal}
          setShowLogoutModal={setShowLogoutModal}
          confirmLogout={confirmLogout}
        />
      </UserDataProvider>
    </Router>
  );
};

export default React.memo(App);
