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

function App() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<PredictionType>('core_personality_and_life_path');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [userId, setUserId] = useState<number | null>(null);

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

  const { userData, predictions, loading, error } = useUserData(userId);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
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
                  {loading ? (
                    <div className="text-center text-text-light-secondary transition-colors duration-200 dark:text-text-dark-secondary">
                      {t('common.loading')}
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-500 transition-colors duration-200 dark:text-red-400">
                      {t('common.error')}: {error}
                    </div>
                  ) : !userData ? null : (
                    <>
                      <BirthDetails user={userData} />
                      {userData.status === 'pending' ? (
                        <div className="space-y-4 p-8 text-center">
                          <div className="text-2xl font-semibold">{t('common.gathering_data')}</div>
                          <div className="text-text-light-secondary dark:text-text-dark-secondary">
                            {t('common.please_wait')}
                          </div>
                          <div className="animate-pulse text-3xl">✨</div>
                        </div>
                      ) : (
                        predictions && predictions.length > 0 && (
                          <>
                            <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                            <PredictionContent activeTab={activeTab} predictions={predictions} />
                          </>
                        )
                      )}
                    </>
                  )}
                </div>
              </Layout>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
