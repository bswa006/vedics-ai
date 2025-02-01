import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Layout } from './features/layout/Layout';
import { PredictionContent } from './features/predictions/PredictionContent';
import { TabNavigation } from './features/tabs/TabNavigation';
import { BirthDetails } from './features/birth-details/BirthDetails';
import { Login } from './features/auth/Login';
import { useUserApi } from './hooks/useUserApi';
import './i18n/config';
import { PredictionResponse, PredictionType } from './types/predictions';
import { User } from './types/user';

function App() {
  const { t } = useTranslation();
  const { getUserReadings, getUser, loading, error } = useUserApi();
  const [predictions, setPredictions] = useState<PredictionResponse | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<PredictionType>('core_personality_and_life_path');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, readingsResponse] = await Promise.all([
          getUser(6),
          getUserReadings(6),
        ]);

        setUserData(userResponse.user);

        const modifiedData = readingsResponse.map((prediction: any) => {
          return { ...prediction, content: prediction.content[prediction.type] };
        });
        setPredictions(modifiedData);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" />} />
        <Route
          path="/*"
          element={
            userData ? (
              <Layout
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                isChatOpen={isChatOpen}
                setIsChatOpen={setIsChatOpen}
              >
                <div className="text-text-light-primary dark:text-text-dark-primary mx-auto max-w-5xl space-y-4 py-4 transition-colors duration-200">
                  {loading && (
                    <div className="text-text-light-secondary dark:text-text-dark-secondary text-center transition-colors duration-200">
                      {t('common.loading')}
                    </div>
                  )}
                  {error && (
                    <div className="text-center text-red-500 transition-colors duration-200 dark:text-red-400">
                      {t('common.error')}: {error}
                    </div>
                  )}
                  {userData && <BirthDetails user={userData} />}
                  {predictions && Array.isArray(predictions) && predictions.length > 0 && (
                    <>
                      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                      <PredictionContent activeTab={activeTab} predictions={predictions} />
                    </>
                  )}
                </div>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
