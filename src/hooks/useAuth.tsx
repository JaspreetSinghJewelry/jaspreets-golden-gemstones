
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  isSessionValid: () => boolean;
  login: (phoneNumber: string, name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        console.log('Initializing auth...');
        
        // Set up auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            if (!mounted) return;
            console.log('Auth state changed:', event, session?.user?.id || 'no user');
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
          }
        );

        // Check for existing session
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          console.log('Initial session check:', session?.user?.id || 'no session');
        }
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }

        return () => {
          mounted = false;
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      console.log('Attempting signup for:', email);
      
      const cleanEmail = email.trim().toLowerCase();
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        return { error: { message: 'Please enter a valid email address' } };
      }

      if (password.length < 6) {
        return { error: { message: 'Password must be at least 6 characters long' } };
      }

      if (!fullName.trim()) {
        return { error: { message: 'Full name is required' } };
      }

      if (!phone.trim()) {
        return { error: { message: 'Phone number is required' } };
      }

      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim()
          }
        }
      });
      
      console.log('Signup response:', { data, error });
      
      if (error) {
        if (error.message?.includes('User already registered')) {
          return { error: { message: 'An account with this email already exists. Please sign in instead.' } };
        }
        if (error.message?.includes('invalid')) {
          return { error: { message: 'Please check your email address and try again.' } };
        }
        return { error };
      }

      return { error: null };
    } catch (err) {
      console.error('Signup error:', err);
      return { error: { message: 'An unexpected error occurred. Please try again.' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting signin for:', email);
      
      const cleanEmail = email.trim().toLowerCase();
      
      if (!cleanEmail || !password) {
        return { error: { message: 'Please enter both email and password' } };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });
      
      console.log('Signin response:', { data, error });
      
      if (error) {
        if (error.message?.includes('Invalid login credentials')) {
          return { error: { message: 'Invalid email or password. Please check your credentials and try again.' } };
        }
        if (error.message?.includes('Email not confirmed')) {
          return { error: { message: 'Please check your email and confirm your account before signing in.' } };
        }
        return { error };
      }

      return { error: null };
    } catch (err) {
      console.error('Signin error:', err);
      return { error: { message: 'An unexpected error occurred. Please try again.' } };
    }
  };

  const signOut = async () => {
    try {
      console.log('Attempting signout');
      await supabase.auth.signOut();
      localStorage.removeItem('cartItems');
    } catch (err) {
      console.error('Signout error:', err);
    }
  };

  const isSessionValid = () => {
    return !!session && !!user;
  };

  const login = (phoneNumber: string, name: string) => {
    console.log('Phone login attempted:', phoneNumber, name);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isAuthenticated: !!user && !!session,
      signUp,
      signIn,
      signOut,
      loading,
      isSessionValid,
      login
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.warn('useAuth called outside AuthProvider, returning default state');
    return {
      user: null,
      session: null,
      isAuthenticated: false,
      signUp: async () => ({ error: { message: 'Auth not available' } }),
      signIn: async () => ({ error: { message: 'Auth not available' } }),
      signOut: async () => {},
      loading: false,
      isSessionValid: () => false,
      login: () => {}
    };
  }
  return context;
};
