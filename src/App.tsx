import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { AdminAuthProvider } from '@/hooks/useAdminAuth';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import SignIn from '@/pages/SignIn';
import Products from '@/pages/Products';
import Collections from '@/pages/Collections';
import AboutUs from '@/pages/AboutUs';
import ContactUs from '@/pages/ContactUs';
import Rings from '@/pages/Rings';
import Necklaces from '@/pages/Necklaces';
import Earrings from '@/pages/Earrings';
import Bracelets from '@/pages/Bracelets';
import Bridal from '@/pages/Bridal';
import LabGrownDiamonds from '@/pages/LabGrownDiamonds';
import Admin from '@/pages/Admin';
import Checkout from '@/pages/Checkout';
import Payment from '@/pages/Payment';
import OrderSuccess from '@/pages/OrderSuccess';
import PaymentFailure from '@/pages/PaymentFailure';
import OrderHistory from '@/pages/OrderHistory';
import Wishlist from '@/pages/Wishlist';
import NotFound from '@/pages/NotFound';
import TermsConditions from '@/pages/TermsConditions';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import ExchangeBuybackPolicy from '@/pages/ExchangeBuybackPolicy';
import DefectiveProductPolicy from '@/pages/DefectiveProductPolicy';
import FraudWarning from '@/pages/FraudWarning';
import JewelryCareGuide from '@/pages/JewelryCareGuide';
import DiamondSolitaireGuide from '@/pages/DiamondSolitaireGuide';
import GemstoneGuide from '@/pages/GemstoneGuide';
import CertificationGuide from '@/pages/CertificationGuide';
import BuyingPriceGuide from '@/pages/BuyingPriceGuide';
import GiftingGuide from '@/pages/GiftingGuide';
import { RootErrorBoundary } from "@/components/RootErrorBoundary";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  // Extra debug logging for root App
  React.useEffect(() => {
    console.log("[DEBUG] App mounted");
  }, []);

  // Catch React runtime errors at the root
  return (
    <RootErrorBoundary>
      {/* No React.StrictMode here */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AdminAuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Router>
                  <div className="App">
                    {/* NEW: Add debug marker for app loaded */}
                    <div style={{ display: "none" }} id="app-loaded-debug">App Rendered</div>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/collections" element={<Collections />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/contact" element={<ContactUs />} />
                      <Route path="/rings" element={<Rings />} />
                      <Route path="/necklaces" element={<Necklaces />} />
                      <Route path="/earrings" element={<Earrings />} />
                      <Route path="/bracelets" element={<Bracelets />} />
                      <Route path="/bridal" element={<Bridal />} />
                      <Route path="/lab-grown-diamonds" element={<LabGrownDiamonds />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/payment" element={<Payment />} />
                      <Route path="/order-success" element={<OrderSuccess />} />
                      <Route path="/payment-failure" element={<PaymentFailure />} />
                      <Route path="/order-history" element={<OrderHistory />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/terms" element={<TermsConditions />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/exchange-buyback" element={<ExchangeBuybackPolicy />} />
                      <Route path="/defective-product" element={<DefectiveProductPolicy />} />
                      <Route path="/fraud-warning" element={<FraudWarning />} />
                      <Route path="/jewelry-care" element={<JewelryCareGuide />} />
                      <Route path="/diamond-guide" element={<DiamondSolitaireGuide />} />
                      <Route path="/gemstone-guide" element={<GemstoneGuide />} />
                      <Route path="/certification-guide" element={<CertificationGuide />} />
                      <Route path="/buying-guide" element={<BuyingPriceGuide />} />
                      <Route path="/gifting-guide" element={<GiftingGuide />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toaster />
                  </div>
                </Router>
              </WishlistProvider>
            </CartProvider>
          </AdminAuthProvider>
        </AuthProvider>
      </QueryClientProvider>
    </RootErrorBoundary>
  );
}

export default App;
