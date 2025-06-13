
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { Suspense, lazy, ErrorBoundary } from "react";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const Products = lazy(() => import("./pages/Products"));
const Auth = lazy(() => import("./pages/Auth"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const PaymentFailure = lazy(() => import("./pages/PaymentFailure"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const Admin = lazy(() => import("./pages/Admin"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Collections = lazy(() => import("./pages/Collections"));
const Rings = lazy(() => import("./pages/Rings"));
const Necklaces = lazy(() => import("./pages/Necklaces"));
const Earrings = lazy(() => import("./pages/Earrings"));
const Bracelets = lazy(() => import("./pages/Bracelets"));
const Bridal = lazy(() => import("./pages/Bridal"));
const LabGrownDiamonds = lazy(() => import("./pages/LabGrownDiamonds"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const ExchangeBuybackPolicy = lazy(() => import("./pages/ExchangeBuybackPolicy"));
const DefectiveProductPolicy = lazy(() => import("./pages/DefectiveProductPolicy"));
const FraudWarning = lazy(() => import("./pages/FraudWarning"));
const JewelryCareGuide = lazy(() => import("./pages/JewelryCareGuide"));
const DiamondSolitaireGuide = lazy(() => import("./pages/DiamondSolitaireGuide"));
const BuyingPriceGuide = lazy(() => import("./pages/BuyingPriceGuide"));
const CertificationGuide = lazy(() => import("./pages/CertificationGuide"));
const GemstoneGuide = lazy(() => import("./pages/GemstoneGuide"));
const GiftingGuide = lazy(() => import("./pages/GiftingGuide"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Error Boundary Component
class AppErrorBoundary extends ErrorBoundary {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('App Error Boundary caught an error:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('App Error Boundary - Error details:', error, errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'Arial, sans-serif', color: '#e74c3c' }}>
          <div style={{ textAlign: 'center', maxWidth: '400px', padding: '20px' }}>
            <h1 style={{ marginBottom: '20px' }}>Oops! Something went wrong</h1>
            <p style={{ marginBottom: '20px' }}>We're experiencing technical difficulties. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ background: '#3498db', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component
const LoadingSpinner = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
    <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Get the base path for GitHub Pages
const basename = import.meta.env.PROD ? '/jaspreets-golden-gemstones' : '';

console.log('App component loading with basename:', basename);

function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <AdminAuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter basename={basename}>
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/order-success" element={<OrderSuccess />} />
                        <Route path="/payment-failure" element={<PaymentFailure />} />
                        <Route path="/order-history" element={<OrderHistory />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/collections" element={<Collections />} />
                        <Route path="/rings" element={<Rings />} />
                        <Route path="/necklaces" element={<Necklaces />} />
                        <Route path="/earrings" element={<Earrings />} />
                        <Route path="/bracelets" element={<Bracelets />} />
                        <Route path="/bridal" element={<Bridal />} />
                        <Route path="/lab-grown-diamonds" element={<LabGrownDiamonds />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-conditions" element={<TermsConditions />} />
                        <Route path="/exchange-buyback-policy" element={<ExchangeBuybackPolicy />} />
                        <Route path="/defective-product-policy" element={<DefectiveProductPolicy />} />
                        <Route path="/fraud-warning" element={<FraudWarning />} />
                        <Route path="/jewelry-care-guide" element={<JewelryCareGuide />} />
                        <Route path="/diamond-solitaire-guide" element={<DiamondSolitaireGuide />} />
                        <Route path="/buying-price-guide" element={<BuyingPriceGuide />} />
                        <Route path="/certification-guide" element={<CertificationGuide />} />
                        <Route path="/gemstone-guide" element={<GemstoneGuide />} />
                        <Route path="/gifting-guide" element={<GiftingGuide />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </BrowserRouter>
                </WishlistProvider>
              </CartProvider>
            </AdminAuthProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}

export default App;
