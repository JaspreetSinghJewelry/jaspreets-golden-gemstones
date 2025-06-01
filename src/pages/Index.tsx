
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import LabGrownDiamonds from "@/components/LabGrownDiamonds";
import InstagramGallery from "@/components/InstagramGallery";
import LabGrownInstagramGallery from "@/components/LabGrownInstagramGallery";
import AboutUsSection from "@/components/AboutUsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <ProductCarousel />
      <Categories />
      <FeaturedProducts />
      <LabGrownDiamonds />
      <InstagramGallery />
      <LabGrownInstagramGallery />
      <AboutUsSection />
      <Footer />
    </div>
  );
};

export default Index;
