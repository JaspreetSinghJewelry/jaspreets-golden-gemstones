
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
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Calendar, User, Mail, Phone, MapPin, Package, Eye, CreditCard } from 'lucide-react';

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

const OrdersManager = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'detailed'>('table');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const typedOrders = (data || []).map(order => ({
        ...order,
        customer_data: order.customer_data as unknown as CustomerData,
        cart_items: order.cart_items as unknown as CartItem[]
      }));
      
      setOrders(typedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'completed' || status === 'success') {
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Success</Badge>;
    } else if (status === 'failed' || status === 'failure') {
      return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewMode('detailed');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  if (viewMode === 'detailed' && selectedOrder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('table')}>
            ← Back to Orders
          </Button>
          <h2 className="text-2xl font-bold">Order Details: #{selectedOrder.order_id}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Customer Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-lg">{selectedOrder.customer_data.firstName} {selectedOrder.customer_data.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {selectedOrder.customer_data.email}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone</label>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {selectedOrder.customer_data.phone}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                  <div>
                    <div>{selectedOrder.customer_data.address}</div>
                    <div>{selectedOrder.customer_data.city}, {selectedOrder.customer_data.state} - {selectedOrder.customer_data.pincode}</div>
                  </div>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Order ID</label>
                <p className="text-lg font-mono">{selectedOrder.order_id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Order Date</label>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {new Date(selectedOrder.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Payment Status</label>
                <div>{getStatusBadge(selectedOrder.payment_status)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Payment Method</label>
                <p className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                  {selectedOrder.payment_method || 'Not specified'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Total Amount</label>
                <p className="text-2xl font-bold text-green-600">₹{selectedOrder.total_amount.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Items */}
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
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedOrder.cart_items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>₹{item.price}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>₹{(parseFloat(item.price) * item.quantity).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-4 space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Sub Total:</span>
                <span>₹{selectedOrder.sub_total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (3%):</span>
                <span>₹{selectedOrder.taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span>₹{selectedOrder.total_amount.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <div className="text-sm text-gray-500">
          Total Orders: {orders.length}
        </div>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No orders found</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">{order.order_id}</TableCell>
                    <TableCell className="font-medium">
                      {order.customer_data.firstName} {order.customer_data.lastName}
                    </TableCell>
                    <TableCell>{order.customer_data.email}</TableCell>
                    <TableCell>{order.customer_data.phone}</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(order.payment_status)}</TableCell>
                    <TableCell className="font-bold">₹{order.total_amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View
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
  );
};

export default OrdersManager;
