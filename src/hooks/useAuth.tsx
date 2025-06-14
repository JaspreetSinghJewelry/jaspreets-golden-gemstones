
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
    console.log('AuthProvider: Setting up authentication...');

    let mounted = true;

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('AuthProvider: Auth state change:', { event, hasSession: !!session });
        
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthProvider: Error getting session:', error);
        }
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
          console.log('AuthProvider: Initial session loaded:', { hasSession: !!session });
        }
      } catch (error) {
        console.error('AuthProvider: Session fetch error:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      console.log('AuthProvider: Attempting signup...');
      
      if (!email || !password || !fullName || !phone) {
        return { error: { message: 'All fields are required' } };
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName.trim(),
            phone: phone.trim()
          }
        }
      });
      
      if (error) {
        console.error('AuthProvider: Signup error:', error);
        return { error: { message: error.message } };
      }

      console.log('AuthProvider: Signup successful');
      return { error: null };
    } catch (err) {
      console.error('AuthProvider: Signup exception:', err);
      return { error: { message: 'An unexpected error occurred during signup' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('AuthProvider: Attempting signin...');
      
      if (!email || !password) {
        return { error: { message: 'Email and password are required' } };
      }

      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });
      
      if (error) {
        console.error('AuthProvider: Signin error:', error);
        setLoading(false);
        
        let errorMessage = 'Sign in failed';
        if (error.message?.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password';
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = 'Please verify your email before signing in';
        } else if (error.message?.includes('Too many requests')) {
          errorMessage = 'Too many attempts. Please wait and try again';
        }
        
        return { error: { message: errorMessage } };
      }

      if (!data?.user || !data?.session) {
        setLoading(false);
        return { error: { message: 'Authentication failed' } };
      }

      console.log('AuthProvider: Signin successful');
      // Don't set loading to false here - let the auth state change handle it
      return { error: null };
    } catch (err) {
      console.error('AuthProvider: Signin exception:', err);
      setLoading(false);
      return { error: { message: 'An unexpected error occurred during sign in' } };
    }
  };

  const signOut = async () => {
    try {
      console.log('AuthProvider: Signing out...');
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('AuthProvider: Signout error:', error);
      }
      
      // Clear local state
      setSession(null);
      setUser(null);
      setLoading(false);
      
      // Clear cart
      localStorage.removeItem('cartItems');
      
      console.log('AuthProvider: Signout complete');
    } catch (err) {
      console.error('AuthProvider: Signout exception:', err);
      setLoading(false);
    }
  };

  const isSessionValid = () => {
    return !!session && !!user && !loading;
  };

  const login = (phoneNumber: string, name: string) => {
    console.log('AuthProvider: Phone login not implemented');
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

  console.log('AuthProvider: Render state:', {
    hasUser: !!user,
    hasSession: !!session,
    isAuthenticated: !!user && !!session,
    loading
  });

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
