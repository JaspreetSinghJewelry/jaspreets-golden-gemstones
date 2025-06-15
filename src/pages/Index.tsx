
import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import ProductCarousel from "@/components/ProductCarousel";
import UploadedImages from "@/components/UploadedImages";
import Categories from "@/components/Categories";
import MobileCategories from "@/components/MobileCategories";
import LabGrownDiamonds from "@/components/LabGrownDiamonds";
import InstagramGallery from "@/components/InstagramGallery";
import LabGrownInstagramGallery from "@/components/LabGrownInstagramGallery";
import Footer from "@/components/Footer";
import LoginPopup from "@/components/LoginPopup";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductCarousel />
      
      {/* Show MobileCategories on mobile, Categories on desktop */}
      {isMobile ? <MobileCategories /> : <Categories />}
      
      <LabGrownDiamonds />
      <UploadedImages location="lab-grown-diamonds" title="Lab Grown Diamond Collection" />
      
      {!isMobile && (
        <div className="grid lg:grid-cols-2 gap-0">
          <InstagramGallery />
          <LabGrownInstagramGallery />
        </div>
      )}
      
      <Footer />
      
      <LoginPopup 
        isOpen={showLoginPopup} 
        onClose={() => setShowLoginPopup(false)}
      />
    </div>
  );
};

export default Index;
