
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';

const PaymentFailure = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    amount: '',
    status: '',
    error: '',
    payuMoneyId: ''
  });

  useEffect(() => {
    try {
      // Get order details from URL parameters (PayU response)
      const txnid = searchParams.get('txnid') || searchParams.get('orderId') || location.state?.orderId || '#JS' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const amount = searchParams.get('amount') || location.state?.totalAmount || '0';
      const status = searchParams.get('status') || 'failed';
      const error = searchParams.get('error') || searchParams.get('error_Message') || '';
      const payuMoneyId = searchParams.get('payuMoneyId') || searchParams.get('mihpayid') || '';

      setOrderDetails({
        orderId: txnid,
        amount: amount,
        status: status,
        error: error,
        payuMoneyId: payuMoneyId
      });

      console.log('Payment failure page loaded with PayU response:', { txnid, amount, status, error, payuMoneyId });
    } catch (error) {
      console.error('Error processing payment failure data:', error);
      // Set default values if there's an error
      setOrderDetails({
        orderId: '#JS' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        amount: '0',
        status: 'failed',
        error: 'Unknown error occurred',
        payuMoneyId: ''
      });
    }
  }, [searchParams, location.state]);

  const handleRetryPayment = () => {
    // Navigate back to checkout to retry payment
    navigate('/checkout');
  };

  const getFailureMessage = () => {
    if (orderDetails.error) {
      return `Payment failed: ${orderDetails.error}`;
    }
    if (orderDetails.status === 'pending') {
      return 'Your payment is pending. Please wait for confirmation or contact support.';
    }
    if (orderDetails.status === 'failure') {
      return 'Your payment was declined. Please check your payment details and try again.';
    }
    return 'Your payment could not be processed. Please try again or contact support.';
  };

  const formatAmount = (amount: string) => {
    try {
      if (!amount || amount === 'undefined' || amount === '0') {
        return '0';
      }
      const numAmount = parseFloat(amount);
      return isNaN(numAmount) ? '0' : numAmount.toLocaleString();
    } catch (error) {
      console.error('Error formatting amount:', error);
      return '0';
    }
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
              Payment {orderDetails.status === 'pending' ? 'Pending' : 'Failed'}
            </FancyText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            {getFailureMessage()}
          </p>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-sm text-gray-500 mb-1">
              Order ID: <span className="font-mono font-medium">{orderDetails.orderId}</span>
            </p>
            {orderDetails.payuMoneyId && (
              <p className="text-sm text-gray-500 mb-1">
                PayU Transaction ID: <span className="font-mono font-medium">{orderDetails.payuMoneyId}</span>
              </p>
            )}
            <p className="text-lg font-semibold text-gray-600">
              Amount: ₹{formatAmount(orderDetails.amount)}
            </p>
            <p className="text-sm text-red-600 mt-2">
              Status: {orderDetails.status === 'pending' ? 'Pending' : 'Failed'}
            </p>
          </div>
          <div className="space-y-2 pt-4">
            <Button 
              onClick={handleRetryPayment}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Payment Again
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
