
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';
import { ArrowLeft, ShoppingBag, CreditCard, Shield, Lock } from 'lucide-react';
import PaymentOptions from '@/components/PaymentOptions';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Payment = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const customerData = location.state?.customerData;
  
  useEffect(() => {
    // Redirect to checkout if no customer data is available
    if (!customerData || cartItems.length === 0) {
      navigate('/checkout');
    }
  }, [customerData, cartItems, navigate]);

  const subTotal = getCartTotal();
  const taxes = Math.round(subTotal * 0.03); // Changed to 3% GST
  const totalAmount = subTotal + taxes;

  const generateOrderId = () => {
    return 'JS' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  const saveOrderToDatabase = async (orderId: string, paymentStatus: string) => {
    try {
      console.log('Saving order to database:', {
        orderId,
        customerData,
        cartItems,
        paymentStatus,
        user: user?.id
      });

      const { error } = await supabase
        .from('orders')
        .insert({
          order_id: orderId,
          user_id: user?.id || null,
          customer_data: customerData,
          cart_items: cartItems,
          sub_total: subTotal,
          taxes: taxes,
          total_amount: totalAmount,
          payment_method: selectedPayment,
          payment_status: paymentStatus,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving order:', error);
        throw error;
      }

      console.log('Order saved successfully to database');
      return true;
    } catch (error) {
      console.error('Failed to save order:', error);
      toast({
        title: "Warning",
        description: "Order processed but failed to save details. Please contact support.",
        variant: "destructive"
      });
      return false;
    }
  };

  const handlePlaceOrder = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    
    try {
      // Generate order ID
      const orderId = generateOrderId();
      
      // Simulate payment processing
      const paymentSuccess = Math.random() > 0.3; // 70% success rate
      const paymentStatus = paymentSuccess ? 'success' : 'failed';
      
      console.log('Processing payment:', { orderId, paymentStatus });
      
      // Save order to database regardless of payment success/failure
      await saveOrderToDatabase(orderId, paymentStatus);
      
      // Clear cart if payment was successful
      if (paymentSuccess) {
        clearCart();
        navigate('/order-success', { 
          state: { 
            orderId,
            customerData,
            totalAmount,
            paymentStatus: 'success'
          }
        });
      } else {
        navigate('/payment-failure', {
          state: {
            orderId,
            customerData,
            totalAmount,
            paymentStatus: 'failed'
          }
        });
      }
    } catch (error) {
      console.error('Error processing order:', error);
      toast({
        title: "Error",
        description: "Failed to process order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
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
  }

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header Section */}
      <div className="bg-cream-900 text-cream-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/checkout')}
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
            <p className="text-cream-200 mt-2">Complete your payment securely</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <PaymentOptions 
              selectedPayment={selectedPayment}
              onPaymentChange={setSelectedPayment}
            />

            {/* Security Info */}
            <Card className="border-2 border-green-200 bg-white/90 backdrop-blur-sm shadow-xl mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-green-700">
                  <Lock className="h-6 w-6" />
                  <div>
                    <h3 className="font-bold text-lg">Your payment is secure</h3>
                    <p className="text-sm">We use 256-bit SSL encryption to protect your personal and payment information</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
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
                    <span className="text-sm font-medium">256-bit SSL Encrypted Payment</span>
                  </div>

                  {/* Pay Now Button */}
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full bg-cream-900 text-cream-50 hover:bg-cream-800 font-bold py-4 text-lg shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    size="lg"
                  >
                    <Lock className="h-5 w-5 mr-2" />
                    {isProcessing ? 'Processing...' : `Pay Now - ₹${totalAmount.toLocaleString()}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
