
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get order data from navigation state
  const orderData = location.state;
  const orderId = orderData?.orderId || '#JS' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle>
            <FancyText variant="gradient" size="lg" className="text-2xl font-bold">
              Order Placed Successfully!
            </FancyText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <p className="text-sm text-gray-500">
            Order ID: {orderId}
          </p>
          {orderData?.totalAmount && (
            <p className="text-lg font-semibold text-green-600">
              Total: ₹{orderData.totalAmount.toLocaleString()}
            </p>
          )}
          <div className="space-y-2 pt-4">
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#1F1E39] hover:from-yellow-500 hover:to-yellow-700"
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/order-history')}
              className="w-full"
            >
              View Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
