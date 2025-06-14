
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
    console.log('AuthProvider: Initializing auth state');

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        console.log('AuthProvider: Initial session:', { 
          hasSession: !!initialSession, 
          userEmail: initialSession?.user?.email,
          error: error?.message 
        });
        
        if (mounted) {
          setSession(initialSession);
          setUser(initialSession?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('AuthProvider: Error getting initial session:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('AuthProvider: Auth state changed:', { 
          event, 
          hasSession: !!session, 
          userEmail: session?.user?.email 
        });
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          // Only set loading to false on specific events to avoid race conditions
          if (['SIGNED_IN', 'SIGNED_OUT', 'TOKEN_REFRESHED'].includes(event)) {
            setLoading(false);
          }
        }
      }
    );

    // Initialize auth state
    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      console.log('AuthProvider: Attempting signup for:', email);
      
      const cleanEmail = email.trim().toLowerCase();
      
      // Validation
      if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
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
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName.trim(),
            phone: phone.trim()
          }
        }
      });
      
      console.log('AuthProvider: Signup response:', { 
        hasUser: !!data?.user, 
        hasSession: !!data?.session,
        error: error?.message 
      });
      
      if (error) {
        console.error('AuthProvider: Signup error:', error);
        if (error.message?.includes('User already registered')) {
          return { error: { message: 'An account with this email already exists. Please sign in instead.' } };
        }
        return { error: { message: error.message || 'Failed to create account' } };
      }

      return { error: null };
    } catch (err) {
      console.error('AuthProvider: Signup unexpected error:', err);
      return { error: { message: 'An unexpected error occurred. Please try again.' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('AuthProvider: Attempting signin for:', email);
      
      const cleanEmail = email.trim().toLowerCase();
      
      if (!cleanEmail || !password) {
        return { error: { message: 'Please enter both email and password' } };
      }

      // Set loading state
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });
      
      console.log('AuthProvider: Signin response:', { 
        hasUser: !!data?.user, 
        hasSession: !!data?.session,
        userEmail: data?.user?.email,
        error: error?.message 
      });
      
      if (error) {
        console.error('AuthProvider: Signin error:', error);
        setLoading(false);
        
        if (error.message?.includes('Invalid login credentials')) {
          return { error: { message: 'Invalid email or password. Please check your credentials and try again.' } };
        }
        if (error.message?.includes('Email not confirmed')) {
          return { error: { message: 'Please check your email and confirm your account before signing in.' } };
        }
        return { error: { message: error.message || 'Sign in failed' } };
      }

      if (!data?.user || !data?.session) {
        setLoading(false);
        return { error: { message: 'Authentication failed. Please try again.' } };
      }

      // Success will be handled by the auth state change listener
      return { error: null };
    } catch (err) {
      console.error('AuthProvider: Signin unexpected error:', err);
      setLoading(false);
      return { error: { message: 'An unexpected error occurred. Please try again.' } };
    }
  };

  const signOut = async () => {
    try {
      console.log('AuthProvider: Attempting signout');
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('AuthProvider: Signout error:', error);
      }
      localStorage.removeItem('cartItems');
      setLoading(false);
    } catch (err) {
      console.error('AuthProvider: Signout unexpected error:', err);
      setLoading(false);
    }
  };

  const isSessionValid = () => {
    return !!session && !!user && !loading;
  };

  const login = (phoneNumber: string, name: string) => {
    console.log('AuthProvider: Phone login attempted:', phoneNumber, name);
  };

  const contextValue = {
    user,
    session,
    isAuthenticated: !!user && !!session && !loading,
    signUp,
    signIn,
    signOut,
    loading,
    isSessionValid,
    login
  };

  console.log('AuthProvider: Rendering with state:', {
    hasUser: !!user,
    hasSession: !!session,
    isAuthenticated: !!user && !!session && !loading,
    loading
  });

  return (
    <AuthContext.Provider value={contextValue}>
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
