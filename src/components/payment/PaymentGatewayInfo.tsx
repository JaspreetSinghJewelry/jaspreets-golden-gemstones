
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Shield, Lock } from 'lucide-react';

interface PaymentGatewayInfoProps {
  isProcessing: boolean;
}

export const PaymentGatewayInfo = ({ isProcessing }: PaymentGatewayInfoProps) => {
  return (
    <Card className="border-2 border-cream-200 bg-white/90 backdrop-blur-sm shadow-xl">
      <CardHeader className="bg-cream-900 text-cream-50 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 font-bold">
          <CreditCard className="h-5 w-5" />
          PayU Payment Gateway
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-cream-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="h-10 w-10 text-cream-600" />
          </div>
          <h3 className="text-xl font-bold text-cream-900">Secure PayU Payment Processing</h3>
          <p className="text-cream-700">
            You will be redirected to PayU's secure payment gateway to complete your transaction. 
            PayU supports multiple payment options including:
          </p>
          <div className="bg-cream-50 p-4 rounded-lg border border-cream-200">
            <div className="grid grid-cols-2 gap-4 text-sm text-cream-600">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Credit/Debit Cards
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Net Banking
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                UPI Payments
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Digital Wallets
              </div>
            </div>
          </div>
          
          {isProcessing && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-4">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-blue-800 font-medium">Redirecting to PayU Payment Gateway...</span>
              </div>
              <p className="text-blue-600 text-sm mt-2">Please wait, do not refresh or close this page.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
