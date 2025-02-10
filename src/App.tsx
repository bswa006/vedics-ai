import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from './services/api';
import { useTranslation } from 'react-i18next';
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { AnimatedRoutes } from './components/AnimatedRoutes';
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
import { GoogleOAuthProvider } from '@react-oauth/google';

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
    handleLogout,
    showLogoutModal,
    setShowLogoutModal,
    confirmLogout,
  }: AppContentProps) => {
    const { t } = useTranslation();
    const { userData, predictions, error, loading } = useUserDataContext();
    const navigate = useNavigate();

    // Data fetching is now handled in useUserData hook

    const isProfileIncomplete = useMemo(() => {
      // Don't consider incomplete while loading
      if (loading) return false;

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
    }, [userData, loading]);

    const isUserOnboarding = useMemo(
      () =>
        userData?.long_term_reading_status === 'pending' ||
        userData?.long_term_reading_status === 'started',
      [userData]
    );

    const location = useLocation();

    // Handle routing based on auth state and profile completion
    useEffect(() => {
      const token = localStorage.getItem('token');
      const currentPath = location.pathname;

      // Don't make any routing decisions while loading
      if (loading) return;

      // Not authenticated - redirect to login
      if (!token && currentPath !== '/login') {
        navigate('/login', { replace: true });
        return;
      }

      // Wait for user data to be loaded
      if (!userData && token) return;

      // Authenticated with data - handle routing
      if (token && userData) {
        if (isProfileIncomplete && currentPath !== '/onboarding') {
          navigate('/onboarding', { replace: true });
        } else if (
          !isProfileIncomplete &&
          (currentPath === '/login' || currentPath === '/onboarding')
        ) {
          navigate('/', { replace: true });
        }
      }
    }, [isProfileIncomplete, navigate, loading, userData, location]);

    return (
      <>
        {/* Show loading state during initial data fetch */}
        {loading && !userData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-xl">
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                <span className="text-sm text-white/90">{t('common.loading')}</span>
              </div>
            </div>
          </div>
        )}

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
        <AnimatedRoutes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={!!localStorage.getItem('token') ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/onboarding"
            element={
              <Layout onLogout={handleLogout} userId={userId}>
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
                <Layout onLogout={handleLogout} userId={userId}>
                  <div className="mx-auto flex min-h-0 w-full max-w-5xl flex-col text-text-light-primary transition-colors duration-200 dark:text-text-dark-primary">
                    <div className="pt-20">
                      {isUserOnboarding && (
                        <div className="z-50 mx-auto mt-6 w-full max-w-3xl px-4">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-midnightIndigo mt-4 overflow-hidden rounded-xl border border-white/10 p-3 backdrop-blur-xl"
                          >
                            <div className="relative flex items-center gap-4">
                              <div className="flex-none">
                                <div className="relative">
                                  <motion.div
                                    animate={{
                                      rotate: [0, 360],
                                    }}
                                    transition={{
                                      duration: 8,
                                      repeat: Infinity,
                                      ease: 'linear',
                                    }}
                                    className="bg-celestialLilac/20 relative flex h-10 w-10 items-center justify-center rounded-lg"
                                  >
                                    <motion.span
                                      className="text-white"
                                      animate={{
                                        scale: [1, 1.1, 1],
                                      }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                      }}
                                    >
                                      ✨
                                    </motion.span>
                                  </motion.div>
                                </div>
                              </div>
                              <div className="min-w-0 flex-1">
                                <h2 className="text-base font-medium text-white">
                                  {t('onboarding.pendingTitle')}
                                </h2>
                                <p className="text-sm text-gray-400">
                                  {t('onboarding.pendingDescription')}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </div>
                    {error ? (
                      <div className="text-center text-red-500 transition-colors duration-200 dark:text-red-400">
                        {t('common.error')}: {error}
                      </div>
                    ) : !userData ? (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
                        <div className="rounded-lg bg-white/10 p-6 backdrop-blur-xl">
                          <div className="flex items-center space-x-3">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
                            <span className="text-sm text-white/90">{t('common.loading')}</span>
                          </div>
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
                <Layout onLogout={handleLogout} userId={userId}>
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
                <Layout onLogout={handleLogout} userId={userId}>
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
                <Layout onLogout={handleLogout} userId={userId}>
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
        </AnimatedRoutes>
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

  const [darkMode, setDarkMode] = useState<boolean>(false);
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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
    </GoogleOAuthProvider>
  );
};

export default React.memo(App);
