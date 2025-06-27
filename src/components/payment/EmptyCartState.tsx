
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EmptyCartState = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center">
      <div className="text-center">
        <ShoppingBag className="h-24 w-24 text-cream-700 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-cream-900">Your cart is empty</h2>
        <p className="text-cream-600 mb-6">Add some beautiful jewelry to your cart to proceed with payment</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-cream-900 text-cream-50 hover:bg-cream-800 font-bold"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};
