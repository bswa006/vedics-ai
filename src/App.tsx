import { useEffect, useState } from 'react';
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

function AppContent({
  userId,
  setUserId,
  darkMode,
  setDarkMode,
  handleLogout,
  showLogoutModal,
  setShowLogoutModal,
  confirmLogout,
}: {
  userId: number | null;
  setUserId: (id: number | null) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  handleLogout: () => void;
  showLogoutModal: boolean;
  setShowLogoutModal: (show: boolean) => void;
  confirmLogout: () => void;
}) {
  const { t } = useTranslation();
  const { userData, predictions, error } = useUserDataContext();
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={userId ? <Navigate to="/" replace /> : <Login />} />
        <Route
          path="/onboarding"
          element={
            userId ? (
              <Navigate to="/" replace />
            ) : (
              <Layout
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onLogout={handleLogout}
                userId={null}
              >
                <OnboardingFlow
                  onComplete={data => {
                    console.log('Onboarding completed:', data);
                    const storedUserId = localStorage.getItem('userId');
                    if (storedUserId) {
                      setUserId(parseInt(storedUserId));
                    }
                    navigate('/', { replace: true });
                  }}
                />
              </Layout>
            )
          }
        />

        {/* Root Route - Protected */}
        <Route
          path="/"
          element={
            !userId ? (
              <Navigate to="/login" replace />
            ) : (
              <Layout
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                onLogout={handleLogout}
                userId={userId}
              >
                <div className="mx-auto max-w-5xl space-y-4 pb-4 text-text-light-primary transition-colors duration-200 dark:text-text-dark-primary">
                  {userData?.status === 'pending' && (
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
            !userId ? (
              <Navigate to="/login" replace />
            ) : userData?.status === 'pending' ? (
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
            !userId ? (
              <Navigate to="/login" replace />
            ) : userData?.status === 'pending' ? (
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
            !userId ? (
              <Navigate to="/login" replace />
            ) : userData?.status === 'pending' ? (
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
          element={!userId ? <Navigate to="/login" replace /> : <Navigate to="/" replace />}
        />
      </Routes>
      {showLogoutModal && (
        <Modal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          title={t('common.logoutConfirmation')}
          onConfirm={confirmLogout}
          confirmText={t('common.confirm')}
          cancelText={t('common.cancel')}
        >
          {t('common.logoutMessage')}
        </Modal>
      )}
    </>
  );
}

function App() {
  const [userId, setUserId] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    setShowLogoutModal(false);
  };

  return (
    <Router>
      <UserDataProvider userId={userId}>
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
}

export default App;
