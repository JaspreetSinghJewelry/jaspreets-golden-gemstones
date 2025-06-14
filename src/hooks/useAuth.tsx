
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

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting initial session:', error);
        } else {
          console.log('Initial session check:', session?.user?.email);
        }
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      } catch (error) {
        console.error('Session check error:', error);
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
      console.log('Attempting signup for:', email);
      
      // Clean and validate email
      const cleanEmail = email.trim().toLowerCase();
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        return { error: { message: 'Please enter a valid email address' } };
      }

      // Validate password
      if (password.length < 6) {
        return { error: { message: 'Password must be at least 6 characters long' } };
      }

      // Validate required fields
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
      
      console.log('Signup response:', { data, error });
      
      if (error) {
        console.error('Signup error details:', error);
        // Handle specific Supabase errors
        if (error.message?.includes('User already registered')) {
          return { error: { message: 'An account with this email already exists. Please sign in instead.' } };
        }
        if (error.message?.includes('invalid')) {
          return { error: { message: 'Please check your email address and try again.' } };
        }
        return { error: { message: error.message || 'Failed to create account' } };
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
      
      // Clean email
      const cleanEmail = email.trim().toLowerCase();
      
      // Basic validation
      if (!cleanEmail || !password) {
        return { error: { message: 'Please enter both email and password' } };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });
      
      console.log('Signin response:', { 
        user: data?.user?.email, 
        session: !!data?.session,
        error: error?.message 
      });
      
      if (error) {
        console.error('Signin error details:', error);
        // Handle specific errors
        if (error.message?.includes('Invalid login credentials')) {
          return { error: { message: 'Invalid email or password. Please check your credentials and try again.' } };
        }
        if (error.message?.includes('Email not confirmed')) {
          return { error: { message: 'Please check your email and confirm your account before signing in.' } };
        }
        if (error.message?.includes('Email')) {
          return { error: { message: 'Please enter a valid email address.' } };
        }
        return { error: { message: error.message || 'Sign in failed' } };
      }

      // Check if user and session are valid
      if (!data?.user || !data?.session) {
        return { error: { message: 'Authentication failed. Please try again.' } };
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
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Signout error:', error);
      }
      // Clear cart data on logout
      localStorage.removeItem('cartItems');
    } catch (err) {
      console.error('Signout error:', err);
    }
  };

  const isSessionValid = () => {
    return !!session && !!user;
  };

  const login = (phoneNumber: string, name: string) => {
    // This is a mock function for the phone-based login
    // In a real implementation, this would integrate with your phone auth system
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
