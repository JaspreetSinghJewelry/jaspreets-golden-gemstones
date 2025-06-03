
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AdminAuthProvider } from "@/hooks/useAdminAuth";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Rings from "./pages/Rings";
import Necklaces from "./pages/Necklaces";
import Earrings from "./pages/Earrings";
import Bracelets from "./pages/Bracelets";
import Collections from "./pages/Collections";
import Bridal from "./pages/Bridal";
import LabGrownDiamonds from "./pages/LabGrownDiamonds";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Auth from "./pages/Auth";
import SignIn from "./pages/SignIn";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ExchangeBuybackPolicy from "./pages/ExchangeBuybackPolicy";
import DefectiveProductPolicy from "./pages/DefectiveProductPolicy";
import FraudWarning from "./pages/FraudWarning";
import JewelryCareGuide from "./pages/JewelryCareGuide";
import DiamondSolitaireGuide from "./pages/DiamondSolitaireGuide";
import GemstoneGuide from "./pages/GemstoneGuide";
import BuyingPriceGuide from "./pages/BuyingPriceGuide";
import CertificationGuide from "./pages/CertificationGuide";
import GiftingGuide from "./pages/GiftingGuide";
import DisplayCategoryProducts from '@/components/DisplayCategoryProducts';

<Route path="/:category" element={<DisplayCategoryProducts />} />


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminAuthProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/rings" element={<Rings />} />
                    <Route path="/necklaces" element={<Necklaces />} />
                    <Route path="/earrings" element={<Earrings />} />
                    <Route path="/bracelets" element={<Bracelets />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/bridal" element={<Bridal />} />
                    <Route path="/lab-grown-diamonds" element={<LabGrownDiamonds />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-conditions" element={<TermsConditions />} />
                    <Route path="/exchange-buyback-policy" element={<ExchangeBuybackPolicy />} />
                    <Route path="/defective-product-policy" element={<DefectiveProductPolicy />} />
                    <Route path="/fraud-warning" element={<FraudWarning />} />
                    <Route path="/jewelry-care-guide" element={<JewelryCareGuide />} />
                    <Route path="/diamond-solitaire-guide" element={<DiamondSolitaireGuide />} />
                    <Route path="/gemstone-guide" element={<GemstoneGuide />} />
                    <Route path="/buying-price-guide" element={<BuyingPriceGuide />} />
                    <Route path="/certification-guide" element={<CertificationGuide />} />
                    <Route path="/gifting-guide" element={<GiftingGuide />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/:category" element={<DisplayCategoryProducts />} />
                  </Routes>
                </BrowserRouter>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </AdminAuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
