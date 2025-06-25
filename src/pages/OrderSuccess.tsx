
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState({
    orderId: '',
    amount: '',
    status: 'success',
    payuMoneyId: ''
  });

  useEffect(() => {
    // Get order details from URL parameters or generate defaults
    const txnid = searchParams.get('txnid') || 
                 searchParams.get('orderId') || 
                 location.state?.orderId || 
                 'ORDER-' + Date.now();
    
    const amount = searchParams.get('amount') || 
                  location.state?.totalAmount || 
                  '1';
    
    const status = searchParams.get('status') || 'success';
    const payuMoneyId = searchParams.get('payuMoneyId') || searchParams.get('mihpayid') || '';

    setOrderDetails({
      orderId: txnid,
      amount: amount,
      status: status,
      payuMoneyId: payuMoneyId
    });

    console.log('Order success page loaded:', { txnid, amount, status, payuMoneyId });
  }, [searchParams, location.state]);

  const formatAmount = (amount: string) => {
    if (!amount || amount === '0') return '1';
    const numAmount = parseFloat(amount);
    return isNaN(numAmount) ? '1' : numAmount.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle>
            <FancyText variant="gradient" size="lg" className="text-2xl font-bold">
              Payment Successful!
            </FancyText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Thank you for your payment. Your order has been confirmed and we'll send you a confirmation email shortly.
          </p>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-sm text-gray-500 mb-1">
              Order ID: <span className="font-mono font-medium">{orderDetails.orderId}</span>
            </p>
            {orderDetails.payuMoneyId && (
              <p className="text-sm text-gray-500 mb-1">
                PayU Transaction ID: <span className="font-mono font-medium">{orderDetails.payuMoneyId}</span>
              </p>
            )}
            <p className="text-lg font-semibold text-green-600">
              Amount Paid: ₹{formatAmount(orderDetails.amount)}
            </p>
            <p className="text-sm text-green-600 mt-2">
              Payment Status: Completed
            </p>
          </div>
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
