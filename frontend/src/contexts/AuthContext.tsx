import { createContext, useContext, useState, ReactNode } from 'react';
import { getToken, saveToken, removeToken } from 'utils/auth';

const ROLE_KEY = '@GitCine:role';
const EMAIL_KEY = '@GitCine:email';

type AuthContextData = {
  authenticated: boolean;
  isAdmin: boolean;
  userEmail: string;
  login: (token: string, role?: 'user' | 'admin', email?: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean>(() => Boolean(getToken()));
  const [isAdmin, setIsAdmin] = useState<boolean>(() => localStorage.getItem(ROLE_KEY) === 'admin');
  const [userEmail, setUserEmail] = useState<string>(() => localStorage.getItem(EMAIL_KEY) || '');

  const login = (token: string, role: 'user' | 'admin' = 'user', email: string = '') => {
    saveToken(token);
    localStorage.setItem(ROLE_KEY, role);
    if (email) {
      localStorage.setItem(EMAIL_KEY, email);
    }
    setAuthenticated(true);
    setIsAdmin(role === 'admin');
    setUserEmail(email);
  };

  const logout = () => {
    removeToken();
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EMAIL_KEY);
    setAuthenticated(false);
    setIsAdmin(false);
    setUserEmail('');
  };

  return (
    <AuthContext.Provider value={{ authenticated, isAdmin, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);