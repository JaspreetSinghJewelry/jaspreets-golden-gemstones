
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
    <div className="admin-panel">
      <header className="admin-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-red-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                Jaspreet Singh Jewelry - Admin Panel
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={adminLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

const Display location = [
    { name: 'Rings', path: '/rings' },
    { name: 'Necklaces', path: '/necklaces' },
    { name: 'Earrings', path: '/earrings' },
    { name: 'Bracelets', path: '/bracelets' },
    { name:  'Lab Grown diamonds', path: '/lab-grown-diamond'},
  ];
      <main className="admin-content">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Images className="h-6 w-6" />
              Image Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-6">
              <ImageManager />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};


export default Admin;
