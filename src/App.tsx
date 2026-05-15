import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/useAuth';
import { AdminAuthProvider } from '@/hooks/useAdminAuth';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { RootErrorBoundary } from '@/components/RootErrorBoundary';
import Index from '@/pages/Index'; // home eager for fast LCP

// Code-split all secondary routes so the initial bundle stays tiny
const Auth = lazy(() => import('@/pages/Auth'));
const SignIn = lazy(() => import('@/pages/SignIn'));
const Products = lazy(() => import('@/pages/Products'));
const Collections = lazy(() => import('@/pages/Collections'));
const AboutUs = lazy(() => import('@/pages/AboutUs'));
const ContactUs = lazy(() => import('@/pages/ContactUs'));
const Rings = lazy(() => import('@/pages/Rings'));
const Necklaces = lazy(() => import('@/pages/Necklaces'));
const Earrings = lazy(() => import('@/pages/Earrings'));
const Bracelets = lazy(() => import('@/pages/Bracelets'));
const Bridal = lazy(() => import('@/pages/Bridal'));
const LabGrownDiamonds = lazy(() => import('@/pages/LabGrownDiamonds'));
const Pendants = lazy(() => import('@/pages/Pendants'));
const PowerStones = lazy(() => import('@/pages/PowerStones'));
const Admin = lazy(() => import('@/pages/Admin'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Payment = lazy(() => import('@/pages/Payment'));
const OrderSuccess = lazy(() => import('@/pages/OrderSuccess'));
const PaymentFailure = lazy(() => import('@/pages/PaymentFailure'));
const OrderHistory = lazy(() => import('@/pages/OrderHistory'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const TermsConditions = lazy(() => import('@/pages/TermsConditions'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const ExchangeBuybackPolicy = lazy(() => import('@/pages/ExchangeBuybackPolicy'));
const DefectiveProductPolicy = lazy(() => import('@/pages/DefectiveProductPolicy'));
const FraudWarning = lazy(() => import('@/pages/FraudWarning'));
const JewelryCareGuide = lazy(() => import('@/pages/JewelryCareGuide'));
const DiamondSolitaireGuide = lazy(() => import('@/pages/DiamondSolitaireGuide'));
const GemstoneGuide = lazy(() => import('@/pages/GemstoneGuide'));
const CertificationGuide = lazy(() => import('@/pages/CertificationGuide'));
const BuyingPriceGuide = lazy(() => import('@/pages/BuyingPriceGuide'));
const GiftingGuide = lazy(() => import('@/pages/GiftingGuide'));
const DisplayCategoryProducts = lazy(() => import('@/components/DisplayCategoryProducts'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const RouteFallback = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
    <div style={{ width: 40, height: 40, border: '3px solid #f3f3f3', borderTop: '3px solid #c8a157', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
  </div>
);

function App() {
  return (
    <RootErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AdminAuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Router>
                  <div className="App" style={{ backgroundColor: 'white', minHeight: '100vh', color: '#1a1a1a' }}>
                    <Suspense fallback={<RouteFallback />}>
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
                        <Route path="/pendants" element={<Pendants />} />
                        <Route path="/power-stones" element={<PowerStones />} />
                        <Route path="/bridal" element={<Bridal />} />
                        <Route path="/lab-grown-diamonds" element={<LabGrownDiamonds />} />
                        <Route path="/category/:category" element={<DisplayCategoryProducts />} />
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
                    </Suspense>
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
