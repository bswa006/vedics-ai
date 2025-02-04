import { createContext, useContext, ReactNode } from 'react';
import { User } from '../types/user';
import { PredictionResponse } from '../types/predictions';
import { useUserData } from '../hooks/useUserData';

interface UserDataContextType {
  userData: User | null;
  predictions: PredictionResponse | null;
  loading: boolean;
  error: string | null;
}

const UserDataContext = createContext<UserDataContextType | null>(null);

export function UserDataProvider({ children, userId }: { children: ReactNode; userId: number | null }) {
  const userDataResult = useUserData(userId);

  return (
    <UserDataContext.Provider value={userDataResult}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserDataContext must be used within a UserDataProvider');
  }
  return context;
}
