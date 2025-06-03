
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Images, Settings } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/AdminLogin';
import ImageManager from '@/components/ImageManager';

const Admin = () => {
  const { isAdminAuthenticated, adminLogout, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <div className="flex items-center space-x-2 md:space-x-3">
              <Settings className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
              <h1 className="text-sm md:text-xl font-semibold text-gray-900 truncate">
                Jaspreet Singh Jewelry - Admin Panel
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={adminLogout}
              className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
              size="sm"
            >
              <LogOut className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 md:py-8">
        <div className="space-y-4 md:space-y-8">
          <Card>
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
                <Images className="h-5 w-5 md:h-6 md:w-6" />
                Image Management
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <ImageManager />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
