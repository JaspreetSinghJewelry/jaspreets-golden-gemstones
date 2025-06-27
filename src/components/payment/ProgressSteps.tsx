
import React from 'react';
import { ShoppingBag, Shield, CreditCard } from 'lucide-react';

export const ProgressSteps = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-cream-200">
        <div className="flex items-center gap-2 px-4 py-2 bg-cream-300 rounded-full text-cream-600 font-semibold">
          <ShoppingBag className="h-4 w-4" />
          <span>Cart</span>
        </div>
        <div className="h-1 w-8 bg-cream-300 rounded"></div>
        <div className="flex items-center gap-2 px-4 py-2 bg-cream-300 rounded-full text-cream-600 font-semibold">
          <Shield className="h-4 w-4" />
          <span>Shipping</span>
        </div>
        <div className="h-1 w-8 bg-cream-900 rounded"></div>
        <div className="flex items-center gap-2 px-4 py-2 bg-cream-900 rounded-full text-cream-50 font-semibold">
          <CreditCard className="h-4 w-4" />
          <span>Payment</span>
        </div>
      </div>
    </div>
  );
};
