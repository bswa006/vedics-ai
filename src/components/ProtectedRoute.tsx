import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserDataContext } from '../contexts/UserDataContext';
import { isProfileComplete } from '../utils/profile';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresCompleteProfile?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresCompleteProfile = true 
}) => {
  const location = useLocation();
  const { userData } = useUserDataContext();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiresCompleteProfile) {
    const isProfileIncomplete = !isProfileComplete(userData);
    const isLongTermStarted = userData?.long_term_reading_status === 'started';

    if (isProfileIncomplete || isLongTermStarted) {
      return <Navigate to="/onboarding" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
};
