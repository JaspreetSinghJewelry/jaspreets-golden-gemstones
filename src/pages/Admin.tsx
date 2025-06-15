import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Images, Settings, Package, Upload, ShoppingBag, Users } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/AdminLogin';
import ImageManager from '@/components/ImageManager';
import ProductManager from '@/components/ProductManager';
import BulkProductUpload from '@/components/BulkProductUpload';
import OrdersManager from '@/components/OrdersManager';
import UserManager from '@/components/UserManager';

const Admin = () => {
  const { isAdminAuthenticated, adminLogout, loading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'bulk-upload' | 'images' | 'orders' | 'users'>('products');

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
    <div className="admin-panel min-h-screen bg-white">
      <header className="admin-header border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto py-3 sm:py-0">
            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
              <Settings className="h-8 w-8 text-red-600" />
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                Jaspreet Singh Jewelry - Admin Panel
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={adminLogout}
              className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="admin-content">
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          {/* Tab Navigation */}
          <div className="mb-4 sm:mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex flex-wrap gap-2 sm:space-x-8 -mb-px">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-2 px-2 text-xs sm:text-sm border-b-2 font-medium ${
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
                  className={`py-2 px-2 text-xs sm:text-sm border-b-2 font-medium ${
                    activeTab === 'bulk-upload'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Upload className="h-4 w-4 inline mr-2" />
                  Bulk Product Upload
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-2 px-2 text-xs sm:text-sm border-b-2 font-medium ${
                    activeTab === 'orders'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <ShoppingBag className="h-4 w-4 inline mr-2" />
                  Orders Management
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`py-2 px-2 text-xs sm:text-sm border-b-2 font-medium ${
                    activeTab === 'users'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Users className="h-4 w-4 inline mr-2" />
                  User Management
                </button>
                <button
                  onClick={() => setActiveTab('images')}
                  className={`py-2 px-2 text-xs sm:text-sm border-b-2 font-medium ${
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
          <Card className="shadow rounded-md text-xs sm:text-base">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base sm:text-xl">
                {activeTab === 'products' && (
                  <>
                    <Package className="h-5 w-5 sm:h-6 sm:w-6" />
                    Product Management
                  </>
                )}
                {activeTab === 'bulk-upload' && (
                  <>
                    <Upload className="h-5 w-5 sm:h-6 sm:w-6" />
                    Bulk Product Upload
                  </>
                )}
                {activeTab === 'orders' && (
                  <>
                    <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
                    Orders Management
                  </>
                )}
                {activeTab === 'users' && (
                  <>
                    <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                    User Management
                  </>
                )}
                {activeTab === 'images' && (
                  <>
                    <Images className="h-5 w-5 sm:h-6 sm:w-6" />
                    Image Management (Legacy)
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 sm:p-6 overflow-x-auto">
              <div className="p-0 sm:p-6">
                {activeTab === 'products' && <ProductManager />}
                {activeTab === 'bulk-upload' && <BulkProductUpload />}
                {activeTab === 'orders' && <OrdersManager />}
                {activeTab === 'users' && <UserManager />}
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
