
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Copy, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';
import { useToast } from '@/hooks/use-toast';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(10);
  const [trackingId] = useState(`JS${Math.random().toString(36).substr(2, 9).toUpperCase()}`);

  // Auto redirect to home page after 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const copyTrackingId = () => {
    navigator.clipboard.writeText(trackingId);
    toast({
      title: "Tracking ID Copied!",
      description: "The tracking ID has been copied to your clipboard.",
    });
  };

  const trackOrder = () => {
    toast({
      title: "Order Tracking",
      description: `Your order ${trackingId} is being processed. You'll receive an email with shipping updates.`,
    });
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
              Order Placed Successfully!
            </FancyText>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          
          {/* Tracking ID Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200">
            <p className="text-sm text-gray-600 mb-2">Your Tracking ID:</p>
            <div className="flex items-center justify-center gap-2 bg-white p-3 rounded border-2 border-yellow-300">
              <Package className="h-4 w-4 text-[#0D0C29]" />
              <span className="font-bold text-lg text-[#0D0C29]">{trackingId}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyTrackingId}
                className="h-6 w-6 p-0 hover:bg-yellow-100"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Save this tracking ID to monitor your order status
            </p>
          </div>

          {/* Auto redirect notice */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              Redirecting to home page in {countdown} seconds...
            </p>
          </div>

          <div className="space-y-2 pt-4">
            <Button 
              onClick={trackOrder}
              className="w-full bg-gradient-to-r from-[#0D0C29] to-purple-800 text-white hover:from-purple-900 hover:to-[#0D0C29]"
            >
              <Package className="h-4 w-4 mr-2" />
              Track This Order
            </Button>
            <Button 
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#1F1E39] hover:from-yellow-500 hover:to-yellow-700"
            >
              Continue Shopping Now
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/orders')}
              className="w-full"
            >
              View All Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
