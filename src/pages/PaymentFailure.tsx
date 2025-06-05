
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get order data from navigation state
  const orderData = location.state;
  const orderId = orderData?.orderId || '#JS' + Math.random().toString(36).substr(2, 9).toUpperCase();

  const handleRetryPayment = () => {
    // Navigate back to payment with the same customer data
    navigate('/payment', { 
      state: { 
        customerData: orderData?.customerData 
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
          <CardTitle>
            <FancyText variant="gradient" size="lg" className="text-2xl font-bold text-red-600">
              Payment Failed
            </FancyText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            We're sorry, but your payment could not be processed. Please try again.
          </p>
          <p className="text-sm text-gray-500">
            Order ID: {orderId}
          </p>
          {orderData?.totalAmount && (
            <p className="text-lg font-semibold text-gray-600">
              Amount: ₹{orderData.totalAmount.toLocaleString()}
            </p>
          )}
          <div className="space-y-2 pt-4">
            <Button 
              onClick={handleRetryPayment}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Payment
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/order-history')}
              className="w-full"
            >
              View Order History
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate('/')}
              className="w-full"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailure;
