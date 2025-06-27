
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Shield, Lock } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  subTotal: number;
  taxes: number;
  totalAmount: number;
  isProcessing: boolean;
  hasInitiated: boolean;
  error: string | null;
  onProceedToPayment: () => void;
}

export const OrderSummary = ({
  cartItems,
  subTotal,
  taxes,
  totalAmount,
  isProcessing,
  hasInitiated,
  error,
  onProceedToPayment
}: OrderSummaryProps) => {
  return (
    <Card className="border-2 border-cream-200 bg-white/90 backdrop-blur-sm shadow-xl sticky top-8">
      <CardHeader className="bg-cream-900 text-cream-50 rounded-t-lg">
        <CardTitle className="flex items-center gap-2 font-bold">
          <ShoppingBag className="h-5 w-5" />
          Order Summary ({cartItems.length} items)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Cart Items */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-cream-50 rounded-lg border border-cream-200">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg shadow-md"
                />
                <div className="flex-1">
                  <p className="font-semibold text-cream-900 text-sm">{item.name}</p>
                  <p className="font-bold text-cream-900">{item.price}</p>
                  <p className="text-sm text-cream-600">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Price Breakdown */}
          <div className="space-y-3 pt-4 border-t-2 border-cream-200">
            <div className="flex justify-between text-cream-900">
              <span className="font-medium">Sub Total</span>
              <span className="font-semibold">₹{subTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-cream-900">
              <span className="font-medium">GST (3%)</span>
              <span className="font-semibold">₹{taxes.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-xl text-cream-900 border-t-2 border-cream-300 pt-3">
              <span>TOTAL PAYABLE</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg border border-green-200 mt-4">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">PayU 256-bit SSL Encrypted Payment</span>
          </div>

          {/* Proceed to Payment Button */}
          <Button 
            onClick={onProceedToPayment}
            disabled={isProcessing || hasInitiated || !!error}
            className="w-full bg-cream-900 text-cream-50 hover:bg-cream-800 font-bold py-4 text-lg shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            <Lock className="h-5 w-5 mr-2" />
            {isProcessing ? 'Redirecting to PayU...' : `Pay with PayU - ₹${totalAmount.toLocaleString()}`}
          </Button>
          
          {isProcessing && (
            <p className="text-sm text-cream-600 text-center">
              Please wait while we redirect you to PayU's secure payment page...
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
