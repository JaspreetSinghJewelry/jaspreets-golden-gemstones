
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
    }
    setLoading(false);
  }, []);

  const adminLogin = async (userId: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting admin login...');
      
      // Use secure database function to verify admin credentials
      const { data, error } = await supabase.rpc('verify_admin_credentials', {
        input_user_id: userId,
        input_password: password
      });

      if (error) {
        console.error('Admin login error:', error);
        toast({
          title: "Authentication Failed",
          description: "Unable to verify credentials",
          variant: "destructive"
        });
        return false;
      }

      if (data === true) {
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
