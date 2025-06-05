
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, RefreshCw, ArrowLeft, Home, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center shadow-xl">
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
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <p className="text-gray-600 text-lg">
              We're sorry, but your payment could not be processed at this time.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-800 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Common reasons for payment failure:</span>
              </div>
              <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                <li>Insufficient funds in your account</li>
                <li>Card limit exceeded</li>
                <li>Incorrect card details</li>
                <li>Network connectivity issues</li>
                <li>Bank security restrictions</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Transaction Reference:</p>
            <p className="font-mono text-sm font-medium">
              #TXN{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Button 
              onClick={() => navigate('/payment')}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 h-12"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Payment Again
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/checkout')}
              className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Checkout
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex-1 h-12"
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate('/contact')}
                className="flex-1 h-12"
              >
                Need Help?
              </Button>
            </div>
          </div>

          <div className="text-xs text-gray-500 pt-4 border-t">
            <p>If you continue to experience issues, please contact our support team.</p>
            <p>No amount has been charged to your account.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailure;
