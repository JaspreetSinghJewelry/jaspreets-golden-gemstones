
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('admin_session');
    if (adminToken) {
      setIsAdminAuthenticated(true);
      // Set the admin context for database operations
      setAdminContext('admin');
    }
    setLoading(false);
  }, []);

  const setAdminContext = async (userId: string) => {
    try {
      // Set admin context for RLS policies
      await supabase.rpc('set_config', {
        setting_name: 'app.admin_user_id',
        setting_value: userId,
        is_local: true
      });
      console.log('Admin context set successfully');
    } catch (error) {
      console.error('Failed to set admin context:', error);
    }
  };

  const adminLogin = async (userId: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting admin login...');
      
      // For demo purposes, using simple comparison
      // In production, you'd hash the password and compare with database
      if (userId === 'admin' && password === 'admin123') {
        // Set admin session in database context
        await setAdminContext(userId);
        
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
      console.error('Admin login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive"
      });
      return false;
    }
  };

  const adminLogout = () => {
    localStorage.removeItem('admin_session');
    setIsAdminAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{
      isAdminAuthenticated,
      adminLogin,
      adminLogout,
      loading
    }}>
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
