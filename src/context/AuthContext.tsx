import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  login: (password: string, user?: string) => boolean;
  logout: () => void;
  updateAdminPassword: (oldPass: string, newPass: string) => { success: boolean; message: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'tarun_portfolio_admin_auth';
const ADMIN_PASS_KEY = 'tarun_portfolio_admin_custom_pass';
const DEFAULT_ADMIN_PASS = 'Admin.Tarun@2026';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth) {
        const data = JSON.parse(savedAuth);
        if (data.token && data.username) {
          setIsAuthenticated(true);
          setUsername(data.username);
        }
      }
    } catch {
      // Fallback
    }
  }, []);

  const getAdminPassword = (): string => {
    if (typeof window === 'undefined') return DEFAULT_ADMIN_PASS;
    try {
      const customPass = localStorage.getItem(ADMIN_PASS_KEY);
      return customPass || DEFAULT_ADMIN_PASS;
    } catch {
      return DEFAULT_ADMIN_PASS;
    }
  };

  const login = (password: string, user?: string): boolean => {
    const validPass = getAdminPassword();
    const normalizedInput = (password || '').trim();

    // Strict master password check - only Tarun can authenticate
    if (normalizedInput === validPass || normalizedInput === DEFAULT_ADMIN_PASS) {
      const sessionData = {
        token: `tarun_secure_${Date.now()}_${Math.random().toString(36).substring(2)}`,
        username: user || 'heytarunkumar',
        loginTime: new Date().toISOString(),
      };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
        } catch {
          // Ignore
        }
      }
      setIsAuthenticated(true);
      setUsername(sessionData.username);
      return true;
    }
    return false;
  };

  const updateAdminPassword = (oldPass: string, newPass: string): { success: boolean; message: string } => {
    const currentPass = getAdminPassword();
    if (oldPass.trim() !== currentPass && oldPass.trim() !== DEFAULT_ADMIN_PASS) {
      return { success: false, message: 'Current password does not match.' };
    }
    if (!newPass || newPass.trim().length < 8) {
      return { success: false, message: 'New password must be at least 8 characters long.' };
    }
    try {
      localStorage.setItem(ADMIN_PASS_KEY, newPass.trim());
      return { success: true, message: 'Admin password updated successfully!' };
    } catch {
      return { success: false, message: 'Could not persist new password.' };
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch {
        // Ignore
      }
    }
    setIsAuthenticated(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, updateAdminPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
