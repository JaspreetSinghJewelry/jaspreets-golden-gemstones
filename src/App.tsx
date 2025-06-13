
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { Suspense } from "react";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import OrderHistory from "./pages/OrderHistory";
import Admin from "./pages/Admin";
import SignIn from "./pages/SignIn";
import Wishlist from "./pages/Wishlist";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Collections from "./pages/Collections";
import Rings from "./pages/Rings";
import Necklaces from "./pages/Necklaces";
import Earrings from "./pages/Earrings";
import Bracelets from "./pages/Bracelets";
import Bridal from "./pages/Bridal";
import LabGrownDiamonds from "./pages/LabGrownDiamonds";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ExchangeBuybackPolicy from "./pages/ExchangeBuybackPolicy";
import DefectiveProductPolicy from "./pages/DefectiveProductPolicy";
import FraudWarning from "./pages/FraudWarning";
import JewelryCareGuide from "./pages/JewelryCareGuide";
import DiamondSolitaireGuide from "./pages/DiamondSolitaireGuide";
import BuyingPriceGuide from "./pages/BuyingPriceGuide";
import CertificationGuide from "./pages/CertificationGuide";
import GemstoneGuide from "./pages/GemstoneGuide";
import GiftingGuide from "./pages/GiftingGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading component for Suspense fallback
const LoadingPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#001c39' }}>Jaspreet Singh Jewelry</h1>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  try {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <AdminAuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Suspense fallback={<LoadingPage />}>
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
    );
  } catch (error) {
    console.error('App rendering error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: '#001c39' }}>Jaspreet Singh Jewelry</h1>
          <p className="text-red-600">Something went wrong. Please refresh the page.</p>
        </div>
      </div>
    );
  }
}

export default App;
