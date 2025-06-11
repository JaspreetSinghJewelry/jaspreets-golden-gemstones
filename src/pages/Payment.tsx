import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';
import { ArrowLeft, ShoppingBag, CreditCard, Shield, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Payment = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const customerData = location.state?.customerData;
  
  useEffect(() => {
    // Redirect to checkout if no customer data is available
    if (!customerData || cartItems.length === 0) {
      navigate('/checkout');
    }
  }, [customerData, cartItems, navigate]);

  const subTotal = getCartTotal();
  const taxes = Math.round(subTotal * 0.03); // 3% GST
  const totalAmount = subTotal + taxes;

  const generateOrderId = () => {
    return 'JS' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  const handleProceedToPayment = async () => {
    if (isProcessing) return;
    
    // Rate limiting check
    if (retryCount >= 3) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait 60 seconds before trying again to avoid rate limiting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Generate order ID
      const orderId = generateOrderId();
      
      console.log('Initiating PayU payment:', { orderId, totalAmount, customerData });
      
      // Add delay to prevent rate limiting
      if (retryCount > 0) {
        await new Promise(resolve => setTimeout(resolve, 2000 * retryCount));
      }
      
      // Call PayU initiation edge function
      const { data, error } = await supabase.functions.invoke('payu-initiate', {
        body: {
          orderData: {
            orderId,
            amount: totalAmount,
            customerData,
            cartItems: cartItems.map(item => ({
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              quantity: item.quantity
            })),
            subTotal,
            taxes
          }
        }
      });

      if (error) {
        console.error('PayU function error:', error);
        throw error;
      }

      console.log('PayU response:', data);

      if (!data || !data.payuUrl || !data.formData) {
        throw new Error('Invalid response from payment gateway');
      }

      // Create and submit PayU form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.payuUrl;
      form.target = '_self';

      // Add all form data as hidden inputs
      Object.entries(data.formData).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      
      // Clear cart before redirecting
      clearCart();
      
      // Add success message
      toast({
        title: "Redirecting to Payment Gateway",
        description: "Please complete your payment on the PayU page.",
      });
      
      // Submit form to redirect to PayU
      form.submit();
      
    } catch (error) {
      console.error('Error processing PayU payment:', error);
      setRetryCount(prev => prev + 1);
      
      let errorMessage = "Failed to initiate payment. Please try again.";
      if (error.message?.includes('Too many requests')) {
        errorMessage = "Too many payment requests. Please wait 60 seconds and try again.";
      }
      
      toast({
        title: "Payment Error",
        description: errorMessage,
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
          {/* Left Column - Payment Info */}
          <div className="lg:col-span-2">
            {/* Payment Gateway Info */}
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
                  </p>
                  <div className="bg-cream-50 p-4 rounded-lg border border-cream-200">
                    <p className="text-sm text-cream-600">
                      Your payment will be processed securely using PayU's industry-standard encryption. 
                      We support all major payment methods including credit cards, debit cards, UPI, and net banking.
                    </p>
                  </div>
                  {retryCount > 0 && (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-700">
                        Attempt {retryCount + 1} of 3. If you continue to experience issues, please wait 60 seconds between attempts.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Security Info */}
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
                    <span className="text-sm font-medium">PayU 256-bit SSL Encrypted Payment</span>
                  </div>

                  {/* Proceed to Payment Button */}
                  <Button 
                    onClick={handleProceedToPayment}
                    disabled={isProcessing || retryCount >= 3}
                    className="w-full bg-cream-900 text-cream-50 hover:bg-cream-800 font-bold py-4 text-lg shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    size="lg"
                  >
                    <Lock className="h-5 w-5 mr-2" />
                    {isProcessing ? 'Processing...' : retryCount >= 3 ? 'Rate Limited - Wait 60s' : `Pay with PayU - ₹${totalAmount.toLocaleString()}`}
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
