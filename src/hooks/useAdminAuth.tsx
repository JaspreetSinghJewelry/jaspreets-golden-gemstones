
import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  adminLogin: (userId: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
  loading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AdminAuth: Initializing AdminAuthProvider...');
    
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('admin_session');
    console.log('AdminAuth: Found admin token:', !!adminToken);
    
    if (adminToken) {
      setIsAdminAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const adminLogin = async (userId: string, password: string): Promise<boolean> => {
    try {
      console.log('AdminAuth: Attempting admin login for:', userId);
      
      // For demo purposes, using simple comparison
      // In production, you'd hash the password and compare with database
      if (userId === 'admin' && password === 'admin123') {
        localStorage.setItem('admin_session', 'authenticated');
        setIsAdminAuthenticated(true);
        
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel"
        });
        
        return true;
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid credentials",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('AdminAuth: Admin login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    }
  };

  const adminLogout = () => {
    console.log('AdminAuth: Admin logout');
    localStorage.removeItem('admin_session');
    setIsAdminAuthenticated(false);
  };

  const value = {
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    loading
  };

  console.log('AdminAuth: Provider state:', { isAdminAuthenticated, loading });

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
