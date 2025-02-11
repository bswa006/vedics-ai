import React, { useCallback, useState } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import './App.css';
import './i18n/config';
import { Modal } from './components/Modal';
import { UserDataProvider, useUserDataContext } from './contexts/UserDataContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AppRoutes } from './components/AppRoutes';
import { useTranslation } from 'react-i18next';
import { api } from './services/api';

interface AppContentProps {
  handleLogout: () => void;
  showLogoutModal: boolean;
  setShowLogoutModal: (show: boolean) => void;
  confirmLogout: () => void;
}

const AppContent: React.FC<AppContentProps> = React.memo(
  ({ handleLogout, showLogoutModal, setShowLogoutModal, confirmLogout }: AppContentProps) => {
    const { t } = useTranslation();
    const { userData, loading } = useUserDataContext();

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

        <AppRoutes handleLogout={handleLogout} userData={userData} loading={loading} />
      </>
    );
  }
);

const AppWrapper = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { resetData } = useUserDataContext();

  const handleLogout = useCallback(() => {
    setShowLogoutModal(true);
  }, []);

  const confirmLogout = useCallback(() => {
    try {
      // Close modal first to prevent UI glitches
      setShowLogoutModal(false);

      // Clear any cache headers for API requests
      if (api.clearCache) {
        api.clearCache();
      }

      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();

      // Reset context data
      resetData();

      // Finally navigate
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error during logout:', error);
      // Ensure we still navigate to login even if something fails
      navigate('/login', { replace: true });
    }
  }, [navigate, resetData]);

  return (
    <AppContent
      handleLogout={handleLogout}
      showLogoutModal={showLogoutModal}
      setShowLogoutModal={setShowLogoutModal}
      confirmLogout={confirmLogout}
    />
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <UserDataProvider>
          <AppWrapper />
        </UserDataProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default React.memo(App);
