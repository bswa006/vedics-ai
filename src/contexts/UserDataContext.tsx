import { createContext, useContext, ReactNode, useMemo } from 'react';
import { User } from '../types/user';
import { PredictionResponse } from '../types/predictions';
import { useUserData } from '../hooks/useUserData';

interface UserDataContextType {
  userData: User | null;
  predictions: PredictionResponse | null;
  loading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
  isOnboardingPending: boolean;
}

const UserDataContext = createContext<UserDataContextType | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const userDataResult = useUserData();

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      userData: userDataResult.userData,
      predictions: userDataResult.predictions,
      loading: userDataResult.loading,
      error: userDataResult.error,
      fetchUserData: userDataResult.fetchUserData,
      isOnboardingPending: userDataResult.isOnboardingPending,
    }),
    [userDataResult]
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
