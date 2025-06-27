
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface PaymentErrorCardProps {
  error: string;
  retryCount: number;
  isProcessing: boolean;
  onRetry: () => void;
  onBackToCheckout: () => void;
}

export const PaymentErrorCard = ({ 
  error, 
  retryCount, 
  isProcessing, 
  onRetry, 
  onBackToCheckout 
}: PaymentErrorCardProps) => {
  return (
    <Card className="border-2 border-red-200 bg-red-50 shadow-xl mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 text-red-700">
          <AlertCircle className="h-6 w-6" />
          <div className="flex-1">
            <h3 className="font-bold text-lg">Payment Error</h3>
            <p className="text-sm mb-3">{error}</p>
            {retryCount < 3 && (
              <div className="flex gap-2">
                <Button 
                  onClick={onRetry}
                  className="bg-red-600 text-white hover:bg-red-700"
                  size="sm"
                  disabled={isProcessing}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button 
                  onClick={onBackToCheckout}
                  variant="outline"
                  size="sm"
                  disabled={isProcessing}
                >
                  Back to Checkout
                </Button>
              </div>
            )}
            {retryCount >= 3 && (
              <div className="text-sm">
                <p className="mb-2">Multiple attempts failed. Please:</p>
                <Button 
                  onClick={onBackToCheckout}
                  variant="outline"
                  size="sm"
                >
                  Go Back and Try Different Details
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
