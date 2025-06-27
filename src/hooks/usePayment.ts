
import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export const usePayment = (customerData: CustomerData | undefined, cartItems: CartItem[], subTotal: number, taxes: number, totalAmount: number) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasInitiated, setHasInitiated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const processingRef = useRef(false);

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

      // Call PayU initiation edge function
      const response = await fetch('https://bxscivdpwersyohpaamn.supabase.co/functions/v1/payu-initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4c2NpdmRwd2Vyc3lvaHBhYW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTg1NjYsImV4cCI6MjA2NDQzNDU2Nn0.dILqWbppsSDLTnQgUBCQbYgWdJp0enh6YckSuPu4nnc`
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

  return {
    isProcessing,
    hasInitiated,
    error,
    retryCount,
    handleProceedToPayment,
    handleRetry,
    handleBackToCheckout
  };
};
