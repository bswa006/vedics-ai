import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Layout } from './features/layout/Layout';
import { PredictionContent } from './features/predictions/PredictionContent';
import { TabNavigation } from './features/tabs/TabNavigation';
import { BirthDetails } from './features/birth-details/BirthDetails';
import { Login } from './features/auth/Login';
import './i18n/config';
import { PredictionType } from './types/predictions';
import { useUserData } from './hooks/useUserData';
import { Modal } from './components/Modal';

function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<PredictionType>('core_personality_and_life_path');
  const [isChatOpen, setIsChatOpen] = useState(false);
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

  const { userData, predictions, error } = useUserData(userId);

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
      <Routes>
        <Route path="/login" element={userId ? <Navigate to="/" replace /> : <Login />} />
        <Route
          path="/*"
          element={
            !userId ? (
              <Navigate to="/login" replace />
            ) : (
              <Layout
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                isChatOpen={isChatOpen}
                onLogout={handleLogout}
                setIsChatOpen={setIsChatOpen}
              >
                <div className="mx-auto max-w-5xl space-y-4 py-4 text-text-light-primary transition-colors duration-200 dark:text-text-dark-primary">
                  {error ? (
                    <div className="text-center text-red-500 transition-colors duration-200 dark:text-red-400">
                      {t('common.error')}: {error}
                    </div>
                  ) : !userData ? null : (
                    <>
                      <BirthDetails user={userData} />
                      {userData.status === 'pending' && (
                        <div className="relative mx-auto max-w-md">
                          {/* Outer glow effect */}
                          <div className="absolute -inset-[1px] rounded-[21px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-[1px]" />

                          {/* Main container */}
                          <div className="group relative overflow-hidden rounded-[20px] bg-[#070B14] p-[1px]">
                            {/* Gradient border */}
                            <div className="absolute inset-0 rounded-[20px] p-[1px]">
                              <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-[20px] bg-[conic-gradient(from_0deg,#1E293B,#3B82F6,#1E293B)] opacity-40" />
                            </div>

                            {/* Inner container with glass effect */}
                            <div className="relative rounded-[19px] bg-gradient-to-br from-[#0B1120]/90 via-[#0F172A]/80 to-[#0B1120]/90 px-8 py-4 backdrop-blur-xl">
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
                              <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-30 blur-[80px] transition-all duration-500 group-hover:opacity-40" />

                              {/* Content */}
                              <div className="relative">
                                {/* Main text */}
                                <div className="text-center">
                                  <div className="relative z-10 bg-gradient-to-r from-white/90 via-white to-white/90 bg-clip-text pb-1 text-xl font-medium tracking-wide text-transparent">
                                    {t('common.gathering_data')}
                                  </div>
                                  {/* Subtle text glow */}
                                  <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 transform bg-blue-500 opacity-[0.1] blur-xl">
                                    {t('common.gathering_data')}
                                  </div>
                                </div>

                                {/* Animated line */}
                                <div className="relative mx-auto mt-3 h-[2px] w-20 overflow-hidden rounded-full bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30">
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
                      {predictions && predictions.length > 0 && (
                        <>
                          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                          <PredictionContent activeTab={activeTab} predictions={predictions} />
                        </>
                      )}
                    </>
                  )}
                </div>
              </Layout>
            )
          }
        />
      </Routes>
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirm Logout"
        onConfirm={confirmLogout}
        confirmText="Logout"
      >
        Are you sure you want to logout?
      </Modal>
    </Router>
  );
}

export default App;
