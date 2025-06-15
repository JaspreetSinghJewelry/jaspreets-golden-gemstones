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
    console.log('[AuthProvider] Mounting');
    try {
      // Set up auth state listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          console.log('[AuthProvider] State change:', { event, hasSession: !!session });
          setSession(session);
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );

      // Then get initial session
      const getInitialSession = async () => {
        try {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error) {
            console.error('[AuthProvider] Error getting session:', error);
          } else {
            setSession(session);
            setUser(session?.user ?? null);
          }
        } catch (err) {
          console.error('[AuthProvider] Exception getting session:', err);
        } finally {
          setLoading(false);
        }
      };
      getInitialSession();

      return () => {
        console.log('[AuthProvider] Cleaning up subscription');
        subscription.unsubscribe();
      };
    } catch (err) {
      console.error('[AuthProvider] Initialization error:', err);
      setLoading(false);
    }
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
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('Auth: Signup error:', error);
        return { error: { message: error.message } };
      }

      // ---- ADDITION: Fire event so admin panel can reload immediately ----
      window.dispatchEvent(new CustomEvent('user-signed-up', { detail: { email: cleanEmail } }));

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
        
        // Handle different types of authentication errors
        if (error.message.includes('Email not confirmed')) {
          // For users created before we disabled confirmations
          return { error: { message: 'Your account was created when email confirmation was required. Please contact support or create a new account.' } };
        } else if (error.message.includes('Invalid login credentials')) {
          return { error: { message: 'Invalid email or password. Please check your credentials and try again.' } };
        } else {
          return { error: { message: error.message } };
        }
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

  try {
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  } catch (err) {
    console.error('[AuthProvider] Fatal error in provider:', err);
    return (
      <div className="p-8 bg-red-100 text-red-800">
        AuthProvider encountered a fatal error. See console for details.
      </div>
    );
  }
};

export const useAuth = () => {
  try {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  } catch (err) {
    console.error('[useAuth] Hook usage error:', err);
    throw err;
  }
};
