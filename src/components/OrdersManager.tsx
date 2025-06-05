
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Eye, Package, Calendar, User, Phone, Mail, MapPin, CreditCard } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Order {
  id: string;
  order_id: string;
  customer_data: any;
  cart_items: any[];
  sub_total: number;
  taxes: number;
  total_amount: number;
  payment_method: string;
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
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Successful Payments</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(order => order.payment_status === 'paid' || order.payment_status === 'completed').length}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed Payments</p>
                <p className="text-2xl font-bold text-red-600">
                  {orders.filter(order => order.payment_status === 'failed').length}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            All Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No orders found</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="font-semibold">#{order.order_id}</span>
                        <Badge className={getStatusColor(order.payment_status)}>
                          {order.payment_status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {order.customer_data?.firstName} {order.customer_data?.lastName}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {order.customer_data?.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                        <p className="font-semibold">
                          Total: ₹{order.total_amount?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Order Details - #{order.order_id}</DialogTitle>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-6">
                            {/* Customer Information */}
                            <div>
                              <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Customer Information
                              </h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Name:</span> {selectedOrder.customer_data?.firstName} {selectedOrder.customer_data?.lastName}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  <span className="font-medium">Email:</span> {selectedOrder.customer_data?.email}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" />
                                  <span className="font-medium">Phone:</span> {selectedOrder.customer_data?.phone}
                                </div>
                              </div>
                            </div>

                            {/* Address Information */}
                            <div>
                              <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Delivery Address
                              </h3>
                              <div className="text-sm space-y-1">
                                <p><span className="font-medium">Address:</span> {selectedOrder.customer_data?.address}</p>
                                <p><span className="font-medium">City:</span> {selectedOrder.customer_data?.city}</p>
                                <p><span className="font-medium">State:</span> {selectedOrder.customer_data?.state}</p>
                                <p><span className="font-medium">Pincode:</span> {selectedOrder.customer_data?.pincode}</p>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div>
                              <h3 className="font-semibold mb-3">Order Items</h3>
                              <div className="space-y-2">
                                {selectedOrder.cart_items?.map((item, index) => (
                                  <div key={index} className="flex items-center gap-3 p-2 border rounded">
                                    <img 
                                      src={item.image} 
                                      alt={item.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">{item.name}</p>
                                      <p className="text-sm text-gray-600">Qty: {item.quantity} × {item.price}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Payment Information */}
                            <div>
                              <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <CreditCard className="h-4 w-4" />
                                Payment Details
                              </h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span>Sub Total:</span>
                                  <span>₹{selectedOrder.sub_total?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>GST (3%):</span>
                                  <span>₹{selectedOrder.taxes?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-semibold border-t pt-2">
                                  <span>Total Amount:</span>
                                  <span>₹{selectedOrder.total_amount?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Payment Method:</span>
                                  <span>{selectedOrder.payment_method || 'Not specified'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Payment Status:</span>
                                  <Badge className={getStatusColor(selectedOrder.payment_status)}>
                                    {selectedOrder.payment_status}
                                  </Badge>
                                </div>
                                <div className="flex justify-between">
                                  <span>Order Date:</span>
                                  <span>{new Date(selectedOrder.created_at).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManager;
