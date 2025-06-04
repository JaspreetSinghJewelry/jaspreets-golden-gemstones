
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from "@/components/AboutSection";
import InstagramGallery from "@/components/InstagramGallery";
import Footer from "@/components/Footer";
import UploadedImages from "@/components/UploadedImages";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      
      {/* Shop Now Section - shows products from best-sellers */}
      <UploadedImages 
        location="best-sellers" 
        title="Shop Now - Featured Collection"
      />
      
      <AboutSection />
      <InstagramGallery />
      <Footer />
    </div>
  );
};

export default Index;
