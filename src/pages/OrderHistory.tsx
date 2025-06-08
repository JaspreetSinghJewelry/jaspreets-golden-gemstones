
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Calendar, Package, Eye, ArrowLeft, Truck, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  order_id: string;
  customer_data: CustomerData;
  cart_items: CartItem[];
  sub_total: number;
  taxes: number;
  total_amount: number;
  payment_method: string | null;
  payment_status: string;
  created_at: string;
  user_id: string | null;
}

const OrderHistory = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    fetchUserOrders();
  }, [user, isAuthenticated, navigate]);

  const fetchUserOrders = async () => {
    if (!user) {
      console.log('No user found, skipping order fetch');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching ALL orders for user:', user.id, 'Email:', user.email);
      
      const { data: allOrders, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        throw error;
      }

      console.log('Total orders in database:', allOrders?.length || 0);

      const userOrders = allOrders?.filter(order => {
        try {
          if (order.user_id === user.id) {
            console.log('Found order by user_id:', order.order_id);
            return true;
          }
          
          const customerData = order.customer_data as any;
          if (customerData && customerData.email === user.email) {
            console.log('Found order by email match:', order.order_id, 'Email:', customerData.email);
            return true;
          }
          
          return false;
        } catch (e) {
          console.error('Error processing order:', order.id, e);
          return false;
        }
      }) || [];
      
      console.log('Filtered user orders:', userOrders.length);
      
      const typedOrders = userOrders.map(order => ({
        ...order,
        customer_data: order.customer_data as unknown as CustomerData,
        cart_items: order.cart_items as unknown as CartItem[]
      }));
      
      setOrders(typedOrders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'completed' || status === 'success') {
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
    } else if (status === 'failed' || status === 'failure') {
      return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
    }
  };

  const getDeliveryStatus = (paymentStatus: string) => {
    if (paymentStatus === 'completed' || paymentStatus === 'success') {
      return <Badge className="bg-blue-100 text-blue-800"><Truck className="h-3 w-3 mr-1" />In Transit</Badge>;
    } else if (paymentStatus === 'failed' || paymentStatus === 'failure') {
      return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
    }
    return <Badge variant="secondary">Pending</Badge>;
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Please Sign In</h2>
              <p className="text-gray-500 mb-6">You need to be signed in to view your order history.</p>
              <Button onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-lg">Loading your orders...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (selectedOrder) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => setSelectedOrder(null)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
            <h1 className="text-2xl font-bold">Order Details</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Order ID</label>
                  <p className="font-mono text-lg">{selectedOrder.order_id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Order Date</label>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {new Date(selectedOrder.created_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Status</label>
                  <div>{getStatusBadge(selectedOrder.payment_status)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Delivery Status</label>
                  <div>{getDeliveryStatus(selectedOrder.payment_status)}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p className="font-medium">
                    {selectedOrder.customer_data?.firstName || 'N/A'} {selectedOrder.customer_data?.lastName || ''}
                  </p>
                  <p>{selectedOrder.customer_data?.address || 'N/A'}</p>
                  <p>
                    {selectedOrder.customer_data?.city || 'N/A'}, {selectedOrder.customer_data?.state || 'N/A'} - {selectedOrder.customer_data?.pincode || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">{selectedOrder.customer_data?.phone || 'N/A'}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedOrder.cart_items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Package className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm font-medium">₹{parseFloat(item.price).toLocaleString()} each</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ₹{(parseFloat(item.price) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )) || (
                  <div className="text-center text-gray-500 py-8">No items found</div>
                )}
              </div>
              
              <div className="mt-6 space-y-2 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.sub_total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (3%):</span>
                  <span>₹{selectedOrder.taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>₹{selectedOrder.total_amount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Order History</h1>
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
        
        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h2>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => navigate('/products')}>
                  Start Shopping
                </Button>
                <Button variant="outline" onClick={fetchUserOrders}>
                  Refresh Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-mono text-lg font-medium">#{order.order_id}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('en-IN')} • {order.cart_items?.length || 0} item(s)
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl">₹{order.total_amount.toLocaleString()}</p>
                      <div className="flex gap-2 mt-1">
                        {getStatusBadge(order.payment_status)}
                        {getDeliveryStatus(order.payment_status)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex -space-x-2 overflow-hidden">
                      {order.cart_items?.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="w-10 h-10 bg-gray-100 rounded-full border-2 border-white overflow-hidden"
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.svg';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <Package className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      ))}
                      {(order.cart_items?.length || 0) > 3 && (
                        <div className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600">
                          +{(order.cart_items?.length || 0) - 3}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">
                        {order.cart_items?.map(item => item.name).join(', ')}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handleViewOrder(order)}
                    className="w-full"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Order Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
