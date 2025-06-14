
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
    console.log('Auth: Setting up auth state listener...');

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth: State change event:', { event, hasSession: !!session, hasUser: !!session?.user });
        
        if (!mounted) return;

        if (session?.user) {
          console.log('Auth: User authenticated:', session.user.email);
        } else {
          console.log('Auth: No authenticated user');
        }

        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    const getInitialSession = async () => {
      try {
        console.log('Auth: Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth: Error getting initial session:', error);
        } else {
          console.log('Auth: Initial session retrieved:', { hasSession: !!session, hasUser: !!session?.user });
        }
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth: Exception getting initial session:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getInitialSession();

    return () => {
      mounted = false;
      console.log('Auth: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      console.log('Auth: Starting signup for:', email);
      
      if (!email || !password || !fullName || !phone) {
        console.error('Auth: Missing required fields for signup');
        return { error: { message: 'All fields are required' } };
      }

      // Clear any existing session first
      await supabase.auth.signOut();

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
        console.error('Auth: Signup error:', error);
        return { error: { message: error.message } };
      }

      console.log('Auth: Signup successful for:', email);
      return { error: null };
    } catch (err) {
      console.error('Auth: Signup exception:', err);
      return { error: { message: 'An unexpected error occurred during signup' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Auth: Starting signin for:', email);
      
      if (!email || !password) {
        console.error('Auth: Missing email or password');
        return { error: { message: 'Email and password are required' } };
      }

      setLoading(true);

      // Clear any existing session first
      console.log('Auth: Clearing existing session...');
      await supabase.auth.signOut();

      // Add a small delay to ensure session is cleared
      await new Promise(resolve => setTimeout(resolve, 100));

      console.log('Auth: Attempting sign in...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });
      
      if (error) {
        console.error('Auth: Signin error:', error);
        setLoading(false);
        
        // Provide more specific error messages
        if (error.message?.includes('Invalid login credentials')) {
          return { error: { message: 'Invalid email or password. Please check your credentials and try again.' } };
        } else if (error.message?.includes('Email not confirmed')) {
          return { error: { message: 'Please verify your email before signing in. Check your inbox for a verification email.' } };
        } else if (error.message?.includes('Too many requests')) {
          return { error: { message: 'Too many attempts. Please wait a moment and try again.' } };
        } else if (error.message?.includes('signup_disabled')) {
          return { error: { message: 'New user registration is currently disabled.' } };
        }
        
        return { error: { message: error.message || 'Sign in failed. Please try again.' } };
      }

      if (!data?.user || !data?.session) {
        console.error('Auth: No user or session returned');
        setLoading(false);
        return { error: { message: 'Authentication failed. Please try again.' } };
      }

      console.log('Auth: Signin successful for:', email);
      return { error: null };
    } catch (err) {
      console.error('Auth: Signin exception:', err);
      setLoading(false);
      return { error: { message: 'An unexpected error occurred during sign in' } };
    }
  };

  const signOut = async () => {
    try {
      console.log('Auth: Starting signout...');
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Auth: Signout error:', error);
      } else {
        console.log('Auth: Signout successful');
      }
      
      setSession(null);
      setUser(null);
      setLoading(false);
      
      // Clear local storage
      localStorage.removeItem('cartItems');
    } catch (err) {
      console.error('Auth: Signout exception:', err);
      setLoading(false);
    }
  };

  const isSessionValid = () => {
    const valid = !!session && !!user && !loading;
    console.log('Auth: Session valid check:', { valid, hasSession: !!session, hasUser: !!user, loading });
    return valid;
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
