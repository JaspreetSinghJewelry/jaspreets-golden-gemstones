
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import InstagramGallery from "@/components/InstagramGallery";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";

const Index = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <HeroSection />
        <Categories />
        <FeaturedProducts />
        <InstagramGallery />
        <AboutSection />
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
