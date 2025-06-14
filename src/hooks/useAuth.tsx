
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
    
    let mounted = true;

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth: Auth state changed:', { event, hasSession: !!session, hasUser: !!session?.user });
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Then initialize auth state
    const initializeAuth = async () => {
      try {
        console.log('Auth: Getting initial session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('Auth: Error getting initial session:', error);
        } else {
          console.log('Auth: Initial session retrieved:', { hasSession: !!session, hasUser: !!session?.user });
        }
        
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Auth: Exception during initialization:', error);
        if (mounted) {
          setSession(null);
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
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

      // Clean and validate email
      const cleanEmail = email.trim().toLowerCase();
      
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
      
      if (error) {
        console.error('Auth: Signup error:', error);
        
        // Handle specific error cases
        if (error.message.includes('User already registered')) {
          return { error: { message: 'An account with this email already exists. Please sign in instead.' } };
        }
        
        return { error: { message: error.message } };
      }

      console.log('Auth: Signup successful:', data);
      
      // Check if email confirmation is required
      if (data.user && !data.session) {
        return { error: { message: 'Please check your email and click the confirmation link to activate your account.' } };
      }
      
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

      if (password.length < 6) {
        return { error: { message: 'Password must be at least 6 characters long' } };
      }

      // Clean email before sending
      const cleanEmail = email.trim().toLowerCase();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });
      
      if (error) {
        console.error('Auth: Signin error:', error);
        
        // Provide more specific error messages
        if (error.message.includes('Invalid login credentials')) {
          return { error: { message: 'Invalid email or password. Please check your credentials and try again.' } };
        } else if (error.message.includes('Email not confirmed')) {
          return { error: { message: 'Please check your email and click the confirmation link before signing in.' } };
        } else if (error.message.includes('Too many requests')) {
          return { error: { message: 'Too many sign-in attempts. Please wait a moment and try again.' } };
        } else if (error.message.includes('signup_disabled')) {
          return { error: { message: 'Sign ups are currently disabled. Please contact support.' } };
        }
        
        return { error: { message: error.message } };
      }

      if (!data?.user || !data?.session) {
        return { error: { message: 'Authentication failed. Please try again.' } };
      }

      console.log('Auth: Signin successful:', { userId: data.user.id });
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
      
      setSession(null);
      setUser(null);
      localStorage.removeItem('cartItems');
    } catch (err) {
      console.error('Auth: Signout exception:', err);
    }
  };

  const isSessionValid = () => {
    return !!session && !!user && !loading;
  };

  const login = (phoneNumber: string, name: string) => {
    console.log('Auth: Phone login not implemented - redirecting to email auth');
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

  console.log('Auth: Rendering AuthProvider with values:', { 
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
