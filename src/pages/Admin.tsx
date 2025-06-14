
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Images, Settings, Package, Upload, ShoppingBag, Users } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLogin from '@/components/AdminLogin';

// Temporary placeholder components to avoid 404 errors
const ImageManager = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">Image Manager</h3>
    <p className="text-gray-600">Image management functionality will be implemented here.</p>
  </div>
);

const ProductManager = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">Product Manager</h3>
    <p className="text-gray-600">Product management functionality will be implemented here.</p>
  </div>
);

const BulkProductUpload = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">Bulk Product Upload</h3>
    <p className="text-gray-600">Bulk upload functionality will be implemented here.</p>
  </div>
);

const OrdersManager = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">Orders Manager</h3>
    <p className="text-gray-600">Orders management functionality will be implemented here.</p>
  </div>
);

const UserManager = () => (
  <div className="p-4">
    <h3 className="text-lg font-semibold mb-2">User Manager</h3>
    <p className="text-gray-600">User management functionality will be implemented here.</p>
  </div>
);

const Admin = () => {
  const { isAdminAuthenticated, adminLogout, loading } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<'products' | 'bulk-upload' | 'images' | 'orders' | 'users'>('products');

  console.log('Admin: Component rendered', { isAdminAuthenticated, loading });
  console.log('Admin: Current URL:', window.location.href);
  console.log('Admin: Current pathname:', window.location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-medium text-gray-600">Loading admin panel...</div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    console.log('Admin: User not authenticated, showing login');
    return <AdminLogin />;
  }

  console.log('Admin: User authenticated, showing admin panel');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
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

      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  onClick={() => setActiveTab('orders')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
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
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
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
                {activeTab === 'orders' && (
                  <>
                    <ShoppingBag className="h-6 w-6" />
                    Orders Management
                  </>
                )}
                {activeTab === 'users' && (
                  <>
                    <Users className="h-6 w-6" />
                    User Management
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
