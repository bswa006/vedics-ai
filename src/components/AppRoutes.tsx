import React from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useUserDataContext } from '../contexts/UserDataContext';
import { Login } from '../features/auth/Login';
import { Chat } from '../features/chat/Chat';
import { DailyStars } from '../features/daily-stars/DailyStars';
import { Header } from '../features/layout/Header';
import { Layout } from '../features/layout/Layout';
import { OnboardingFlow } from '../features/onboarding/OnboardingFlow';
import { PredictionContent } from '../features/predictions/PredictionContent';
import { Profile } from '../features/profile/Profile';
import { User } from '../types/user';
import { isProfileComplete } from '../utils/profile';
import { AnimatedRoutes } from './AnimatedRoutes';
import { ProtectedRoute } from './ProtectedRoute';

interface AppRoutesProps {
  handleLogout: () => void;
  userData: User | null;
  loading: boolean;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ handleLogout, userData, loading }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { predictions, loading: predictionsLoading } = useUserDataContext();

  // Not authenticated - only show login route
  const token = localStorage.getItem('token');
  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Don't render routes while loading initial data
  if (loading) {
    return null;
  }

  // If we have userData but no token, clear data and redirect to login
  if (!token && userData) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // Check if profile is incomplete
  const isProfileIncomplete = !isProfileComplete(userData);

  // Handle incomplete profile routing
  if (isProfileIncomplete) {
    // Store profile incomplete status for other components
    localStorage.setItem('isProfileIncomplete', 'true');

    return (
      <>
        <Header onLogout={handleLogout} userId={userData?.id} />
        <Routes location={location}>
          <Route
            path="/onboarding"
            element={
              <AnimatedRoutes>
                <OnboardingFlow
                  onComplete={async () => {
                    localStorage.removeItem('isProfileIncomplete');
                    // Small delay to ensure state updates have propagated
                    await new Promise(resolve => setTimeout(resolve, 100));
                    navigate('/', { replace: true });
                  }}
                />
              </AnimatedRoutes>
            }
          />
          <Route path="*" element={<Navigate to="/onboarding" replace />} />
        </Routes>
      </>
    );
  } else {
    // Ensure profile incomplete flag is removed
    localStorage.removeItem('isProfileIncomplete');
  }

  // Main app routes - user is authenticated and profile is complete

  return (
    <Layout onLogout={handleLogout}>
      <AnimatedRoutes>
        <Routes location={location}>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <PredictionContent predictions={predictions || []} loading={predictionsLoading} userData={userData} />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="chat"
              element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              }
            />
            <Route
              path="daily-stars"
              element={
                <ProtectedRoute>
                  <DailyStars userId={userData?.id || 0} />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatedRoutes>
    </Layout>
  );
};
