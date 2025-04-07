// context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// ✅ Définir le type du contexte
type AuthContextType = {
  isAuthenticated: boolean;
  signup: (data: { username: string; password: string }) => Promise<void>;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => void;
};

// ✅ Créer un contexte avec une valeur initiale "undefined"
const AuthContext = createContext<AuthContextType | null>(null);

// ✅ Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const signup = async ({ }: { username: string; password: string }) => setIsAuthenticated(true);
  const login = async ({ }: { username: string; password: string }) => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const value = {
    isAuthenticated,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Hook personnalisé pour accéder au contexte
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
