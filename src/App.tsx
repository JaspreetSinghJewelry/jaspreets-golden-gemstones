import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Rings from "./pages/Rings";
import Necklaces from "./pages/Necklaces";
import Earrings from "./pages/Earrings";
import Bracelets from "./pages/Bracelets";
import LabGrownDiamonds from "./pages/LabGrownDiamonds";
import Collections from "./pages/Collections";
import Wishlist from "./pages/Wishlist";
import SignIn from "./pages/SignIn";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import DefectiveProductPolicy from "./pages/DefectiveProductPolicy";
import ExchangeBuybackPolicy from "./pages/ExchangeBuybackPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import FraudWarning from "./pages/FraudWarning";
import BuyingPriceGuide from "./pages/BuyingPriceGuide";
import CertificationGuide from "./pages/CertificationGuide";
import DiamondSolitaireGuide from "./pages/DiamondSolitaireGuide";
import GemstoneGuide from "./pages/GemstoneGuide";
import GiftingGuide from "./pages/GiftingGuide";
import JewelryCareGuide from "./pages/JewelryCareGuide";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/products" element={<Products />} />
                <Route path="/rings" element={<Rings />} />
                <Route path="/necklaces" element={<Necklaces />} />
                <Route path="/earrings" element={<Earrings />} />
                <Route path="/bracelets" element={<Bracelets />} />
                <Route path="/lab-grown-diamonds" element={<LabGrownDiamonds />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/signin" element={<Auth />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/policies/defective-product" element={<DefectiveProductPolicy />} />
                <Route path="/policies/exchange-buyback" element={<ExchangeBuybackPolicy />} />
                <Route path="/policies/privacy" element={<PrivacyPolicy />} />
                <Route path="/policies/terms-conditions" element={<TermsConditions />} />
                <Route path="/policies/fraud-warning" element={<FraudWarning />} />
                <Route path="/guides/buying-price" element={<BuyingPriceGuide />} />
                <Route path="/guides/certification" element={<CertificationGuide />} />
                <Route path="/guides/diamond-solitaire" element={<DiamondSolitaireGuide />} />
                <Route path="/guides/gemstone" element={<GemstoneGuide />} />
                <Route path="/guides/gifting" element={<GiftingGuide />} />
                <Route path="/guides/jewelry-care" element={<JewelryCareGuide />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
