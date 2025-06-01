
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  phone: string;
  name: string;
  sessionExpiry: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, name: string) => void;
  logout: () => void;
  isSessionValid: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session timeout: 24 hours
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const isSessionValid = () => {
    if (!user) return false;
    return Date.now() < user.sessionExpiry;
  };

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Check if session is still valid
        if (parsedUser.sessionExpiry && Date.now() < parsedUser.sessionExpiry) {
          setUser(parsedUser);
        } else {
          // Session expired, clear it
          localStorage.removeItem('user');
          localStorage.removeItem('cartItems');
        }
      } catch (error) {
        console.error('Error parsing user session:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    // Set up session check interval
    const sessionCheckInterval = setInterval(() => {
      if (user && !isSessionValid()) {
        logout();
      }
    }, 60000); // Check every minute

    return () => clearInterval(sessionCheckInterval);
  }, [user]);

  const login = (phone: string, name: string) => {
    // Input validation and sanitization
    const sanitizedPhone = phone.replace(/\D/g, '').slice(0, 10);
    const sanitizedName = name.trim().replace(/[<>]/g, ''); // Basic XSS protection
    
    if (sanitizedPhone.length !== 10 || !sanitizedName) {
      throw new Error('Invalid input data');
    }

    const sessionExpiry = Date.now() + SESSION_TIMEOUT;
    const newUser = { 
      id: `user_${Date.now()}`, 
      phone: sanitizedPhone, 
      name: sanitizedName,
      sessionExpiry
    };
    
    setUser(newUser);
    try {
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Failed to save user session:', error);
    }
  };

  const logout = () => {
    setUser(null);
    // Clear all user data securely
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    // Clear any other sensitive data
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user && isSessionValid(),
      login,
      logout,
      isSessionValid
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
