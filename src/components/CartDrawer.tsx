
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  children: React.ReactNode;
}

const CartDrawer = ({ children }: CartDrawerProps) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-gradient-to-b from-purple-100 to-pink-100 animate-slide-in-right">
        <SheetHeader className="animate-fade-in">
          <SheetTitle className="flex items-center gap-2 text-purple-800">
            <ShoppingBag className="h-5 w-5 animate-bounce" />
            Shopping Cart
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
                <ShoppingBag className="h-16 w-16 text-purple-300 mb-4 animate-bounce" />
                <p className="text-purple-600">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-3 border-b border-purple-200 pb-4 animate-fade-in bg-white/50 rounded-lg p-3 transform hover:scale-105 transition-all duration-300"
                       style={{animationDelay: `${index * 0.1}s`}}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded shadow-lg transform hover:scale-110 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-purple-800">{item.name}</h4>
                      <p className="text-sm text-purple-600 font-bold">{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="border-purple-300 text-purple-600 hover:bg-purple-100 transform hover:scale-110 transition-all duration-200"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium text-purple-800 bg-purple-100 px-2 py-1 rounded animate-pulse">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border-purple-300 text-purple-600 hover:bg-purple-100 transform hover:scale-110 transition-all duration-200"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 hover:bg-red-100 transform hover:scale-110 transition-all duration-200"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className="border-t border-purple-200 pt-4 space-y-4 bg-white/30 rounded-lg p-4 animate-fade-in">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-purple-800">Total:</span>
                <span className="text-lg font-bold text-purple-800 animate-pulse">₹{getCartTotal().toLocaleString()}</span>
              </div>
              <Button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg animate-pulse"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
