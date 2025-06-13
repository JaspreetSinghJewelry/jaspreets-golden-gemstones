
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
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
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Auth providers that can fail gracefully
const AuthProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  try {
    const { AuthProvider } = require("@/hooks/useAuth");
    const { AdminAuthProvider } = require("@/hooks/useAdminAuth");
    
    return (
      <AuthProvider>
        <AdminAuthProvider>
          {children}
        </AdminAuthProvider>
      </AuthProvider>
    );
  } catch (error) {
    console.warn('Auth providers not available:', error);
    return <>{children}</>;
  }
};

function App() {
  console.log('App component rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvidersWrapper>
          <CartProvider>
            <WishlistProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
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
              </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </AuthProvidersWrapper>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
