
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Images, Settings, Package, Upload } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/AdminLogin';
import ImageManager from '@/components/ImageManager';
import ProductManager from '@/components/ProductManager';
import BulkProductUpload from '@/components/BulkProductUpload';
import SimpleImageUpload from '@/components/SimpleImageUpload';

const Admin = () => {
  const { isAdminAuthenticated, adminLogout, loading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'bulk-upload' | 'simple-upload' | 'images'>('products');

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

      <main className="admin-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'products'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Package className="h-4 w-4 inline mr-2" />
                  Product Manager
                </button>
                <button
                  onClick={() => setActiveTab('bulk-upload')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'bulk-upload'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Upload className="h-4 w-4 inline mr-2" />
                  Bulk Product Upload
                </button>
                <button
                  onClick={() => setActiveTab('simple-upload')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'simple-upload'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Images className="h-4 w-4 inline mr-2" />
                  Simple Upload
                </button>
                <button
                  onClick={() => setActiveTab('images')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'images'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Images className="h-4 w-4 inline mr-2" />
                  Image Manager (Legacy)
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                {activeTab === 'products' && (
                  <>
                    <Package className="h-6 w-6" />
                    Product Management
                  </>
                )}
                {activeTab === 'bulk-upload' && (
                  <>
                    <Upload className="h-6 w-6" />
                    Bulk Product Upload
                  </>
                )}
                {activeTab === 'simple-upload' && (
                  <>
                    <Images className="h-6 w-6" />
                    Simple Image Upload
                  </>
                )}
                {activeTab === 'images' && (
                  <>
                    <Images className="h-6 w-6" />
                    Image Management (Legacy)
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6">
                {activeTab === 'products' && <ProductManager />}
                {activeTab === 'bulk-upload' && <BulkProductUpload />}
                {activeTab === 'simple-upload' && <SimpleImageUpload />}
                {activeTab === 'images' && <ImageManager />}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
