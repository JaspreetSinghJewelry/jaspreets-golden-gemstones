import React, { useState, Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Images, Settings, Package, Upload, ShoppingBag, Users, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/AdminLogin';

// Lazy load heavy components
const ImageManager = lazy(() => import('@/components/ImageManager'));
const ProductManager = lazy(() => import('@/components/ProductManager'));
const BulkProductUpload = lazy(() => import('@/components/BulkProductUpload'));
const OrdersManager = lazy(() => import('@/components/OrdersManager'));
const UserManager = lazy(() => import('@/components/UserManager'));

const TabLoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <RefreshCw className="h-6 w-6 animate-spin text-red-600" />
    <span className="ml-2 text-gray-600">Loading...</span>
  </div>
);

const Admin = () => {
  console.log("[DEBUG] Admin panel is mounting");
  const { isAdminAuthenticated, adminLogout, loading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'bulk-upload' | 'images' | 'orders' | 'users'>('products');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-red-600" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManager />;
      case 'bulk-upload':
        return <BulkProductUpload />;
      case 'orders':
        return <OrdersManager />;
      case 'users':
        return <UserManager />;
      case 'images':
        return <ImageManager />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-panel min-h-screen bg-white">
      <header className="admin-header border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto py-4 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-0">
              <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                Jaspreet Singh Jewelry - Admin Panel
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={adminLogout}
              className="flex items-center gap-2 w-full sm:w-auto text-sm"
              size="sm"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="admin-content">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-6">
          {/* Tab Navigation */}
          <div className="mb-4 sm:mb-6">
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="flex gap-1 sm:gap-4 min-w-max -mb-px pb-2">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`py-2 px-3 text-xs sm:text-sm border-b-2 font-medium whitespace-nowrap ${
                    activeTab === 'products'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Package className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Products
                </button>
                <button
                  onClick={() => setActiveTab('bulk-upload')}
                  className={`py-2 px-3 text-xs sm:text-sm border-b-2 font-medium whitespace-nowrap ${
                    activeTab === 'bulk-upload'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Upload className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Bulk Upload
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`py-2 px-3 text-xs sm:text-sm border-b-2 font-medium whitespace-nowrap ${
                    activeTab === 'orders'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`py-2 px-3 text-xs sm:text-sm border-b-2 font-medium whitespace-nowrap ${
                    activeTab === 'users'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Users
                </button>
                <button
                  onClick={() => setActiveTab('images')}
                  className={`py-2 px-3 text-xs sm:text-sm border-b-2 font-medium whitespace-nowrap ${
                    activeTab === 'images'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Images className="h-3 w-3 sm:h-4 sm:w-4 inline mr-1 sm:mr-2" />
                  Images
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <Card className="shadow rounded-lg overflow-hidden">
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-sm sm:text-base md:text-lg">
                {activeTab === 'products' && (
                  <>
                    <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                    Product Management
                  </>
                )}
                {activeTab === 'bulk-upload' && (
                  <>
                    <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                    Bulk Product Upload
                  </>
                )}
                {activeTab === 'orders' && (
                  <>
                    <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                    Orders Management
                  </>
                )}
                {activeTab === 'users' && (
                  <>
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                    User Management
                  </>
                )}
                {activeTab === 'images' && (
                  <>
                    <Images className="h-4 w-4 sm:h-5 sm:w-5" />
                    Image Management (Legacy)
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="text-xs sm:text-sm">
                <Suspense fallback={<TabLoadingSpinner />}>
                  {renderTabContent()}
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
export default Admin;
