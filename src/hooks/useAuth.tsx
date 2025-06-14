
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
    console.log('Auth: Initializing AuthProvider...');
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth: Error getting session:', error);
        } else {
          console.log('Auth: Initial session:', { hasSession: !!session });
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Auth: Exception getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth: State change:', { event, hasSession: !!session });
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    getInitialSession();

    return () => {
      console.log('Auth: Cleaning up subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      console.log('Auth: Starting signup for:', email);
      
      if (!email?.trim() || !password || !fullName?.trim() || !phone?.trim()) {
        return { error: { message: 'All fields are required' } };
      }

      if (password.length < 6) {
        return { error: { message: 'Password must be at least 6 characters long' } };
      }

      const cleanEmail = email.trim().toLowerCase();
      
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
      
      if (error) {
        console.error('Auth: Signup error:', error);
        return { error: { message: error.message } };
      }

      console.log('Auth: Signup successful:', data);
      return { error: null };
    } catch (err) {
      console.error('Auth: Signup exception:', err);
      return { error: { message: 'An unexpected error occurred during signup' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Auth: Starting signin for:', email);
      
      if (!email?.trim() || !password) {
        return { error: { message: 'Email and password are required' } };
      }

      const cleanEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });
      
      if (error) {
        console.error('Auth: Signin error:', error);
        return { error: { message: error.message } };
      }

      console.log('Auth: Signin successful:', { userId: data.user?.id });
      return { error: null };
    } catch (err) {
      console.error('Auth: Signin exception:', err);
      return { error: { message: 'An unexpected error occurred during sign in' } };
    }
  };

  const signOut = async () => {
    try {
      console.log('Auth: Starting signout...');
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Auth: Signout error:', error);
      } else {
        console.log('Auth: Signout successful');
      }
      
      localStorage.removeItem('cartItems');
    } catch (err) {
      console.error('Auth: Signout exception:', err);
    }
  };

  const isSessionValid = () => {
    return !!session && !!user && !loading;
  };

  const login = (phoneNumber: string, name: string) => {
    console.log('Auth: Phone login not implemented');
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user && !!session,
    signUp,
    signIn,
    signOut,
    loading,
    isSessionValid,
    login
  };

  return (
    <AuthContext.Provider value={value}>
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
