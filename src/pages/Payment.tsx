
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
  const [hasInitiated, setHasInitiated] = useState(false);

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

  const createPayUForm = (payuUrl: string, formData: any) => {
    console.log('Creating PayU form with URL:', payuUrl);
    console.log('Form data:', formData);
    
    // Remove any existing PayU forms
    const existingForms = document.querySelectorAll('form[data-payu-form]');
    existingForms.forEach(form => form.remove());
    
    // Create a form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = payuUrl;
    form.target = '_self';
    form.setAttribute('data-payu-form', 'true');
    form.style.display = 'none';
    
    // Add all form data as hidden inputs
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });

    // Add form to document body
    document.body.appendChild(form);
    
    console.log('Form created successfully, submitting...');
    
    // Submit the form immediately
    try {
      form.submit();
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      throw new Error('Failed to redirect to PayU');
    }
    
    // Clean up form after a delay
    setTimeout(() => {
      if (document.body.contains(form)) {
        document.body.removeChild(form);
      }
    }, 2000);
  };

  const handleProceedToPayment = async () => {
    // Prevent multiple calls
    if (isProcessing || hasInitiated) {
      console.log('Payment already in progress, ignoring duplicate call');
      return;
    }
    
    setIsProcessing(true);
    setHasInitiated(true);
    
    try {
      // Generate order ID
      const orderId = generateOrderId();
      
      console.log('Initiating PayU payment:', { orderId, totalAmount, customerData });
      
      // Call PayU initiation edge function with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
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

      clearTimeout(timeoutId);

      if (error) {
        console.error('PayU function error:', error);
        throw new Error(`Payment initialization failed: ${error.message}`);
      }

      console.log('PayU response received:', data);

      if (!data || !data.payuUrl || !data.formData) {
        throw new Error('Invalid response from payment gateway');
      }

      // Validate required PayU parameters
      const requiredParams = ['key', 'txnid', 'amount', 'productinfo', 'firstname', 'email', 'hash'];
      for (const param of requiredParams) {
        if (!data.formData[param]) {
          throw new Error(`Missing required parameter: ${param}`);
        }
      }

      // Store order data in sessionStorage before redirect
      sessionStorage.setItem('pendingOrder', JSON.stringify({
        orderId,
        amount: totalAmount,
        customerData,
        cartItems
      }));

      console.log('Redirecting to PayU with URL:', data.payuUrl);
      
      // Clear cart before redirect
      clearCart();
      
      // Small delay to ensure cart is cleared
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create and submit form to PayU
      createPayUForm(data.payuUrl, data.formData);
      
    } catch (error) {
      console.error('Error processing PayU payment:', error);
      
      // Reset states on error
      setIsProcessing(false);
      setHasInitiated(false);
      
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to initiate payment. Please try again.",
        variant: "destructive"
      });
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
            <p className="text-cream-200 mt-2">Complete your payment securely with PayU</p>
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
                    disabled={isProcessing || hasInitiated}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
