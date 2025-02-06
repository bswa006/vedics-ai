import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { Layout } from './features/layout/Layout';
import { PredictionContent } from './features/predictions/PredictionContent';
import { TabNavigation } from './features/tabs/TabNavigation';
import { Profile } from './features/profile/Profile';
import { Login } from './features/auth/Login';
import { Chat } from './features/chat/Chat';
import { DailyStars } from './features/daily-stars/DailyStars';
import './i18n/config';
import { PredictionType } from './types/predictions';
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
  const [activeTab, setActiveTab] = useState<PredictionType>('core_personality_and_life_path');
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
                        <div className="relative rounded-[19px] bg-gradient-to-br from-[#0B1120]/90 via-[#0F172A]/80 to-[#0B1120]/90 px-6 py-1.5 backdrop-blur-xl">
                          {/* Deep space effect */}
                          <div className="absolute inset-0 rounded-[19px] bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
                          <div className="absolute inset-0 rounded-[19px] bg-[radial-gradient(circle_at_80%_20%,rgba(147,197,253,0.1),transparent_50%)]" />
                          <div className="absolute inset-0 rounded-[19px] bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.1),transparent_50%)]" />
                          {/* Enhanced rotating glow */}
                          <div className="absolute inset-0 overflow-hidden rounded-[19px]">
                            {/* Primary rotation */}
                            <div className="absolute -inset-[200%] animate-[glow_12s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,rgba(59,130,246,0.1)_1%,rgba(147,197,253,0.1)_2%,transparent_4%)] opacity-100" />
                            {/* Secondary rotation */}
                            <div className="absolute -inset-[200%] animate-[glow_8s_linear_infinite_reverse] bg-[conic-gradient(from_90deg,transparent,rgba(255,255,255,0.07)_1%,transparent_4%)] opacity-70" />
                          </div>

                          {/* Enhanced ambient light */}
                          <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-30 blur-[80px] transition-all duration-500 group-hover:opacity-40" />

                          {/* Content */}
                          <div className="relative">
                            {/* Main text */}
                            <div className="text-center">
                              <div className="relative z-10 bg-gradient-to-r from-white/90 via-white to-white/90 bg-clip-text text-sm font-medium tracking-wide text-transparent">
                                {t('common.gathering_data')}
                              </div>
                              {/* Subtle text glow */}
                              <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform bg-blue-500 opacity-[0.1] blur-xl">
                                {t('common.gathering_data')}
                              </div>
                            </div>

                            {/* Animated line */}
                            <div className="relative mx-auto mt-0.5 h-[2px] w-16 overflow-hidden rounded-full bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30">
                              {/* Primary shimmer */}
                              <div className="absolute h-full w-2/3 animate-[loading_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white to-transparent" />
                              {/* Blue accent */}
                              <div className="absolute h-full w-1/2 animate-[loading_2s_ease-in-out_infinite_0.3s] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                              {/* Purple accent */}
                              <div className="absolute h-full w-1/2 animate-[loading_2s_ease-in-out_infinite_0.6s] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
                              {/* Cyan accent */}
                              <div className="absolute h-full w-1/3 animate-[loading_2s_ease-in-out_infinite_0.9s] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                              {/* Sparkle overlay */}
                              <div className="absolute inset-0 animate-[shimmer_3s_linear_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>
                          </div>

                          {/* Subtle border glow */}
                          <div className="absolute inset-px rounded-[19px]">
                            <div className="h-full w-full rounded-[19px] bg-gradient-to-b from-white/[0.05] to-transparent" />
                          </div>

                          {/* Random moving stars */}
                          <div className="absolute inset-0 overflow-hidden rounded-[19px]">
                            {/* Layer 1 - Bright stars */}
                            <div className="absolute left-1/4 top-1/4 animate-[star1_10s_linear_infinite] text-white/70">
                              ✨
                            </div>
                            <div className="absolute bottom-1/3 right-1/3 animate-[star2_8s_linear_infinite] text-white/60">
                              ✨
                            </div>
                            <div className="text-white/65 absolute left-[60%] top-[40%] animate-[star3_12s_linear_infinite]">
                              ✨
                            </div>
                            {/* Layer 2 - Medium brightness stars */}
                            <div className="absolute left-[15%] top-[60%] animate-[star4_9s_linear_infinite] text-white/40">
                              ✨
                            </div>
                            <div className="text-white/45 absolute right-[25%] top-[20%] animate-[star5_11s_linear_infinite]">
                              ✨
                            </div>
                            <div className="absolute bottom-[25%] left-[70%] animate-[star6_10s_linear_infinite] text-white/50">
                              ✨
                            </div>
                            {/* Layer 3 - Subtle stars */}
                            <div className="absolute bottom-[15%] left-[40%] animate-[star7_13s_linear_infinite] text-white/20">
                              ✨
                            </div>
                            <div className="absolute right-[10%] top-[40%] animate-[star8_12s_linear_infinite] text-white/25">
                              ✨
                            </div>
                            <div className="absolute left-[20%] top-[30%] animate-[star9_14s_linear_infinite] text-white/30">
                              ✨
                            </div>
                            {/* Extra bright accent stars with glow */}
                            <div className="absolute right-[40%] top-[60%] animate-[star1_9s_linear_infinite] text-white/90">
                              <span className="relative">
                                ✨
                                <span className="absolute inset-0 text-white/50 blur-[1px]">
                                  ✨
                                </span>
                              </span>
                            </div>
                            <div className="absolute bottom-[40%] left-[30%] animate-[star2_11s_linear_infinite] text-white/90">
                              <span className="relative">
                                ✨
                                <span className="absolute inset-0 text-white/50 blur-[1px]">
                                  ✨
                                </span>
                              </span>
                            </div>
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
                      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                      <PredictionContent activeTab={activeTab} predictions={predictions || []} />
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
  const [darkMode, setDarkMode] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // TODO: Replace this with your actual authentication logic
    const storedUserId = localStorage.getItem('userId');
    setUserId(storedUserId ? parseInt(storedUserId) : null);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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
