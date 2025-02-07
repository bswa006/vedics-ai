import React, { useCallback, useState, useMemo, useEffect } from 'react';
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
    const { userData, predictions, error, isOnboardingPending } = useUserDataContext();
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
      () => userData?.long_term_reading_status === 'pending',
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
                    {isOnboardingPending && (
                      <div className="relative mx-auto mt-2 max-w-md px-4">
                        {/* Outer glow effect */}
                        <div className="absolute -inset-[1px] rounded-[21px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-[1px]" />

                        {/* Main container */}
                        <div className="group relative overflow-hidden rounded-[20px] bg-[#070B14] p-[1px]">
                          {/* Gradient border */}
                          <div className="absolute inset-0 rounded-[20px] p-[1px]">
                            <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-[20px] bg-[conic-gradient(from_0deg,#1E293B,#3B82F6,#1E293B)] opacity-40" />
                          </div>

                          {/* Inner container with glass effect */}
                          <div className="relative rounded-[20px] bg-[#070B14] p-4">
                            <div className="text-center">
                              <div className="mb-4 text-4xl">🌟</div>
                              <h2 className="mb-2 text-lg font-medium">
                                {t('onboarding.pendingTitle')}
                              </h2>
                              <p className="text-sm text-gray-400">
                                {t('onboarding.pendingDescription')}
                              </p>
                            </div>
                          </div>
                        </div>
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
