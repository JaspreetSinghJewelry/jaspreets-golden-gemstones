import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';
import { ArrowLeft, ShoppingBag, CreditCard, Shield, Lock, AlertCircle, RefreshCw } from 'lucide-react';
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
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const processingRef = useRef(false);

  const customerData = location.state?.customerData;
  
  useEffect(() => {
    // Redirect to checkout if no customer data is available
    if (!customerData || cartItems.length === 0) {
      console.log('Redirecting to checkout - missing data:', { 
        hasCustomerData: !!customerData, 
        cartItemsLength: cartItems.length 
      });
      navigate('/checkout');
    }
  }, [customerData, cartItems, navigate]);

  const subTotal = getCartTotal();
  const taxes = Math.round(subTotal * 0.03); // 3% GST
  const totalAmount = subTotal + taxes;

  const generateOrderId = () => {
    return 'JS' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  const createPayUForm = useCallback((payuUrl: string, formData: any) => {
    console.log('Creating PayU form with URL:', payuUrl);
    console.log('Form data keys:', Object.keys(formData));
    
    // Remove any existing PayU forms
    const existingForms = document.querySelectorAll('form[data-payu-form]');
    existingForms.forEach(form => form.remove());
    
    // Create form exactly like your HTML code
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = payuUrl;
    form.target = '_self';
    form.style.display = 'none';
    form.setAttribute('data-payu-form', 'true');
    
    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
      console.log(`Added form field: ${key} = ${value}`);
    });
    
    document.body.appendChild(form);
    
    console.log('Submitting PayU form...');
    form.submit();
  }, []);

  const handleProceedToPayment = useCallback(async () => {
    // Prevent multiple calls using ref
    if (processingRef.current || isProcessing || hasInitiated) {
      console.log('Payment already in progress, ignoring duplicate call');
      return;
    }
    
    processingRef.current = true;
    setIsProcessing(true);
    setHasInitiated(true);
    setError(null);
    
    try {
      // Generate order ID
      const orderId = generateOrderId();
      
      console.log('Initiating PayU payment:', { orderId, totalAmount, customerData });
      
      const requestBody = {
        orderData: {
          orderId,
          amount: totalAmount,
          customerData: customerData,
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
      };

      console.log('Request body prepared:', JSON.stringify(requestBody, null, 2));

      // Call PayU initiation edge function with proper error handling
      const response = await fetch('https://bxscivdpwersyohpaamn.supabase.co/functions/v1/payu-initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.supabaseKey}`
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Function response:', data);

      if (!data.success) {
        console.error('Function returned error:', data);
        const errorMsg = data.error || data.details || 'Payment gateway returned an error';
        throw new Error(errorMsg);
      }

      console.log('PayU response received successfully:', data);

      if (!data.payuUrl || !data.formData) {
        console.error('Invalid response structure:', data);
        throw new Error('Invalid response from payment gateway');
      }

      // Store order data in sessionStorage before redirect
      sessionStorage.setItem('pendingOrder', JSON.stringify({
        orderId,
        amount: totalAmount,
        customerData: customerData,
        cartItems
      }));

      console.log('Redirecting to PayU with URL:', data.payuUrl);
      
      // Clear cart before redirect
      clearCart();
      
      // Small delay to ensure cart is cleared
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Create and submit form to PayU
      createPayUForm(data.payuUrl, data.formData);
      
    } catch (error) {
      console.error('Error processing PayU payment:', error);
      
      // Reset states on error
      processingRef.current = false;
      setIsProcessing(false);
      setHasInitiated(false);
      setRetryCount(prev => prev + 1);
      
      const errorMessage = error instanceof Error ? error.message : "Failed to initiate payment. Please try again.";
      setError(errorMessage);
      
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  }, [cartItems, customerData, totalAmount, subTotal, taxes, clearCart, createPayUForm, isProcessing, hasInitiated]);

  const handleRetry = useCallback(() => {
    console.log('Retrying payment - attempt:', retryCount + 1);
    setError(null);
    processingRef.current = false;
    setIsProcessing(false);
    setHasInitiated(false);
    
    setTimeout(() => {
      handleProceedToPayment();
    }, 1000);
  }, [handleProceedToPayment, retryCount]);

  const handleBackToCheckout = useCallback(() => {
    console.log('Navigating back to checkout');
    setError(null);
    processingRef.current = false;
    setIsProcessing(false);
    setHasInitiated(false);
    navigate('/checkout');
  }, [navigate]);

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
              onClick={handleBackToCheckout}
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
            {/* Error Display */}
            {error && (
              <Card className="border-2 border-red-200 bg-red-50 shadow-xl mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 text-red-700">
                    <AlertCircle className="h-6 w-6" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">Payment Error</h3>
                      <p className="text-sm mb-3">{error}</p>
                      {retryCount < 3 && (
                        <div className="flex gap-2">
                          <Button 
                            onClick={handleRetry}
                            className="bg-red-600 text-white hover:bg-red-700"
                            size="sm"
                            disabled={isProcessing}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Try Again
                          </Button>
                          <Button 
                            onClick={handleBackToCheckout}
                            variant="outline"
                            size="sm"
                            disabled={isProcessing}
                          >
                            Back to Checkout
                          </Button>
                        </div>
                      )}
                      {retryCount >= 3 && (
                        <div className="text-sm">
                          <p className="mb-2">Multiple attempts failed. Please:</p>
                          <Button 
                            onClick={handleBackToCheckout}
                            variant="outline"
                            size="sm"
                          >
                            Go Back and Try Different Details
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
