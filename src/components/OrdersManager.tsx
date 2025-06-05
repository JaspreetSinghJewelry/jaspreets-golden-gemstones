
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, Calendar, User, Mail, Phone, MapPin, Package } from 'lucide-react';

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
      
      // Type assertion with proper validation
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

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
            </CardContent>
          </Card>
        ) : (
          orders.map((order) => (
            <Card key={order.id} className="border border-gray-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      Order #{order.order_id}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(order.payment_status)}
                    <div className="text-lg font-bold mt-1">
                      ₹{order.total_amount.toLocaleString()}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Customer Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Name:</span> {order.customer_data.firstName} {order.customer_data.lastName}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">Email:</span> {order.customer_data.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="font-medium">Phone:</span> {order.customer_data.phone}
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3 w-3 text-gray-400 mt-1" />
                        <div>
                          <div className="font-medium">Address:</div>
                          <div>{order.customer_data.address}</div>
                          <div>{order.customer_data.city}, {order.customer_data.state} - {order.customer_data.pincode}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Order Details
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Items:</span> {order.cart_items.length} item(s)
                      </div>
                      <div>
                        <span className="font-medium">Sub Total:</span> ₹{order.sub_total.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">GST (3%):</span> ₹{order.taxes.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Payment Method:</span> {order.payment_method || 'N/A'}
                      </div>
                    </div>

                    {/* Cart Items */}
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Items Ordered:</div>
                      {order.cart_items.map((item, index) => (
                        <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-gray-600">Qty: {item.quantity} × {item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersManager;
