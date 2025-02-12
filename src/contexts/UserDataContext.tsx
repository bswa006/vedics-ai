import { createContext, useContext, ReactNode, useMemo, useCallback } from 'react';
import { User } from '../types/user';
import { PredictionResponse } from '../types/predictions';
import { useUserData } from '../hooks/useUserData';

interface UserDataContextType {
  userData: User | null;
  predictions: PredictionResponse | null;
  loading: boolean;
  error: string | null;
  fetchUserData: (isPolling?: boolean, skipPredictions?: boolean, existingProfile?: any) => Promise<void>;
  isOnboardingPending: boolean;
  resetData: () => void;
}

const UserDataContext = createContext<UserDataContextType | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const userDataResult = useUserData();

  // Memoize the context value to prevent unnecessary re-renders
  const resetData = useCallback(() => {
    if (userDataResult.userData) {
      userDataResult.userData = null;
    }
    if (userDataResult.predictions) {
      userDataResult.predictions = null;
    }
    userDataResult.error = null;
    userDataResult.loading = false;
    userDataResult.isOnboardingPending = false;
  }, [userDataResult]);

  const contextValue = useMemo(
    () => ({
      userData: userDataResult.userData,
      predictions: userDataResult.predictions,
      loading: userDataResult.loading,
      error: userDataResult.error,
      fetchUserData: userDataResult.fetchUserData,
      isOnboardingPending: userDataResult.isOnboardingPending,
      resetData,
    }),
    [userDataResult, resetData]
  );

  return <UserDataContext.Provider value={contextValue}>{children}</UserDataContext.Provider>;
}

export function useUserDataContext() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserDataContext must be used within a UserDataProvider');
  }
  return context;
}
