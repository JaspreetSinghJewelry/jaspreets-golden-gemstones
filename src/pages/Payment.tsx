
import React, { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from 'react-router-dom';
import { usePayment } from '@/hooks/usePayment';
import { PaymentHeader } from '@/components/payment/PaymentHeader';
import { ProgressSteps } from '@/components/payment/ProgressSteps';
import { PaymentErrorCard } from '@/components/payment/PaymentErrorCard';
import { PaymentGatewayInfo } from '@/components/payment/PaymentGatewayInfo';
import { SecurityInfo } from '@/components/payment/SecurityInfo';
import { OrderSummary } from '@/components/payment/OrderSummary';
import { EmptyCartState } from '@/components/payment/EmptyCartState';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const { cartItems, getCartTotal } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

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

  const {
    isProcessing,
    hasInitiated,
    error,
    retryCount,
    handleProceedToPayment,
    handleRetry,
    handleBackToCheckout
  } = usePayment(customerData, cartItems, subTotal, taxes, totalAmount);

  if (cartItems.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <PaymentHeader 
        onBackToCheckout={handleBackToCheckout}
        isProcessing={isProcessing}
      />

      <div className="container mx-auto px-4 py-8">
        <ProgressSteps />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Info */}
          <div className="lg:col-span-2">
            {error && (
              <PaymentErrorCard
                error={error}
                retryCount={retryCount}
                isProcessing={isProcessing}
                onRetry={handleRetry}
                onBackToCheckout={handleBackToCheckout}
              />
            )}

            <PaymentGatewayInfo isProcessing={isProcessing} />
            <SecurityInfo />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              subTotal={subTotal}
              taxes={taxes}
              totalAmount={totalAmount}
              isProcessing={isProcessing}
              hasInitiated={hasInitiated}
              error={error}
              onProceedToPayment={handleProceedToPayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
