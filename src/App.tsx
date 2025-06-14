
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import Index from "./pages/Index";

// Lazy load components for better performance
const Auth = lazy(() => import("./pages/Auth"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Admin = lazy(() => import("./pages/Admin"));
const Products = lazy(() => import("./pages/Products"));
const Collections = lazy(() => import("./pages/Collections"));
const Rings = lazy(() => import("./pages/Rings"));
const Necklaces = lazy(() => import("./pages/Necklaces"));
const Earrings = lazy(() => import("./pages/Earrings"));
const Bracelets = lazy(() => import("./pages/Bracelets"));
const Bridal = lazy(() => import("./pages/Bridal"));
const LabGrownDiamonds = lazy(() => import("./pages/LabGrownDiamonds"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));
const PaymentFailure = lazy(() => import("./pages/PaymentFailure"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ExchangeBuybackPolicy = lazy(() => import("./pages/ExchangeBuybackPolicy"));
const DefectiveProductPolicy = lazy(() => import("./pages/DefectiveProductPolicy"));
const FraudWarning = lazy(() => import("./pages/FraudWarning"));
const DiamondSolitaireGuide = lazy(() => import("./pages/DiamondSolitaireGuide"));
const GemstoneGuide = lazy(() => import("./pages/GemstoneGuide"));
const JewelryCareGuide = lazy(() => import("./pages/JewelryCareGuide"));
const CertificationGuide = lazy(() => import("./pages/CertificationGuide"));
const BuyingPriceGuide = lazy(() => import("./pages/BuyingPriceGuide"));
const GiftingGuide = lazy(() => import("./pages/GiftingGuide"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingSpinner = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
);

function App() {
  console.log('App: Rendering with AuthProvider and AdminAuthProvider wrappers');
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AdminAuthProvider>
          <TooltipProvider>
            <CartProvider>
              <WishlistProvider>
                <Toaster />
                <BrowserRouter>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/collections" element={<Collections />} />
                      <Route path="/rings" element={<Rings />} />
                      <Route path="/necklaces" element={<Necklaces />} />
                      <Route path="/earrings" element={<Earrings />} />
                      <Route path="/bracelets" element={<Bracelets />} />
                      <Route path="/bridal" element={<Bridal />} />
                      <Route path="/lab-grown-diamonds" element={<LabGrownDiamonds />} />
                      <Route path="/about-us" element={<AboutUs />} />
                      <Route path="/contact-us" element={<ContactUs />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/payment" element={<Payment />} />
                      <Route path="/order-success" element={<OrderSuccess />} />
                      <Route path="/payment-failure" element={<PaymentFailure />} />
                      <Route path="/order-history" element={<OrderHistory />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/terms-conditions" element={<TermsConditions />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/exchange-buyback-policy" element={<ExchangeBuybackPolicy />} />
                      <Route path="/defective-product-policy" element={<DefectiveProductPolicy />} />
                      <Route path="/fraud-warning" element={<FraudWarning />} />
                      <Route path="/diamond-solitaire-guide" element={<DiamondSolitaireGuide />} />
                      <Route path="/gemstone-guide" element={<GemstoneGuide />} />
                      <Route path="/jewelry-care-guide" element={<JewelryCareGuide />} />
                      <Route path="/certification-guide" element={<CertificationGuide />} />
                      <Route path="/buying-price-guide" element={<BuyingPriceGuide />} />
                      <Route path="/gifting-guide" element={<GiftingGuide />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </WishlistProvider>
            </CartProvider>
          </TooltipProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
