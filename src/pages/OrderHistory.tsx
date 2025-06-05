
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
import { CheckCircle, XCircle, Calendar, Package, Eye, ArrowLeft, Truck } from 'lucide-react';
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
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const typedOrders = (data || []).map(order => ({
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
    }
    return <Badge variant="secondary">Pending</Badge>;
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
  };

  if (!isAuthenticated) {
    return null;
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
                    {selectedOrder.customer_data.firstName} {selectedOrder.customer_data.lastName}
                  </p>
                  <p>{selectedOrder.customer_data.address}</p>
                  <p>
                    {selectedOrder.customer_data.city}, {selectedOrder.customer_data.state} - {selectedOrder.customer_data.pincode}
                  </p>
                  <p className="text-sm text-gray-600">{selectedOrder.customer_data.phone}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder.cart_items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>₹{parseFloat(item.price).toLocaleString()}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell className="text-right">
                        ₹{(parseFloat(item.price) * item.quantity).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
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
        <h1 className="text-3xl font-bold mb-8">Your Order History</h1>
        
        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h2>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet. Start shopping to see your orders here!</p>
              <Button onClick={() => navigate('/products')}>
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Delivery Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">{order.order_id}</TableCell>
                      <TableCell>
                        {new Date(order.created_at).toLocaleDateString('en-IN')}
                      </TableCell>
                      <TableCell>{order.cart_items.length} item(s)</TableCell>
                      <TableCell>{getStatusBadge(order.payment_status)}</TableCell>
                      <TableCell>{getDeliveryStatus(order.payment_status)}</TableCell>
                      <TableCell className="font-bold">₹{order.total_amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewOrder(order)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
