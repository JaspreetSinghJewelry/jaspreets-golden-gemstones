
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';

export const SecurityInfo = () => {
  return (
    <Card className="border-2 border-green-200 bg-white/90 backdrop-blur-sm shadow-xl mt-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 text-green-700">
          <Lock className="h-6 w-6" />
          <div>
            <h3 className="font-bold text-lg">Your payment is secure</h3>
            <p className="text-sm">We use PayU's 256-bit SSL encryption to protect your personal and payment information</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
