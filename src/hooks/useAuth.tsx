
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

    // Initialize auth state
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
        setLoading(false);
      } catch (error) {
        console.error('Auth: Exception during initialization:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        console.log('Auth: Auth state changed:', { event, hasSession: !!session, hasUser: !!session?.user });
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

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
      
      // Validate inputs
      if (!email || !password || !fullName || !phone) {
        console.error('Auth: Missing required fields');
        return { error: { message: 'All fields are required' } };
      }

      if (password.length < 6) {
        console.error('Auth: Password too short');
        return { error: { message: 'Password must be at least 6 characters long' } };
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
      
      // Validate inputs
      if (!email || !password) {
        console.error('Auth: Missing email or password');
        return { error: { message: 'Email and password are required' } };
      }

      if (password.length < 6) {
        console.error('Auth: Password too short');
        return { error: { message: 'Password must be at least 6 characters long' } };
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });
      
      if (error) {
        console.error('Auth: Signin error:', error);
        let errorMessage = error.message;
        
        // Provide more user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and click the confirmation link before signing in.';
        }
        
        return { error: { message: errorMessage } };
      }

      if (!data?.user || !data?.session) {
        console.error('Auth: No user or session returned from signin');
        return { error: { message: 'Authentication failed. Please try again.' } };
      }

      console.log('Auth: Signin successful:', { userId: data.user.id, sessionId: data.session.access_token.substring(0, 10) + '...' });
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
      
      // Clear any stored data
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
    // This is a placeholder for phone-based login
    // For now, users should use email authentication
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
