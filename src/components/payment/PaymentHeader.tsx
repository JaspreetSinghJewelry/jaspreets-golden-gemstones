
import React from 'react';
import { Button } from '@/components/ui/button';
import { FancyText } from '@/components/ui/fancy-text';
import { ArrowLeft } from 'lucide-react';

interface PaymentHeaderProps {
  onBackToCheckout: () => void;
  isProcessing: boolean;
}

export const PaymentHeader = ({ onBackToCheckout, isProcessing }: PaymentHeaderProps) => {
  return (
    <div className="bg-cream-900 text-cream-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={onBackToCheckout}
            className="text-cream-50 hover:text-cream-200 hover:bg-cream-800"
            disabled={isProcessing}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Checkout
          </Button>
        </div>
        <div className="mt-4">
          <FancyText variant="gradient" size="xl" className="text-4xl font-bold text-cream-50">
            Secure Payment
          </FancyText>
          <p className="text-cream-200 mt-2">Complete your payment securely with PayU</p>
        </div>
      </div>
    </div>
  );
};
