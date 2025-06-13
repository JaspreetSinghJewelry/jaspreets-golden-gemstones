
import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import ProductCarousel from "@/components/ProductCarousel";
import UploadedImages from "@/components/UploadedImages";
import Categories from "@/components/Categories";
import LabGrownDiamonds from "@/components/LabGrownDiamonds";
import InstagramGallery from "@/components/InstagramGallery";
import LabGrownInstagramGallery from "@/components/LabGrownInstagramGallery";
import Footer from "@/components/Footer";
import LoginPopup from "@/components/LoginPopup";

const Index = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  
  console.log('Index page rendering...');
  
  // Safe auth check - will not throw errors
  let isAuthenticated = false;
  let loading = false;
  
  try {
    const { useAuth } = require("@/hooks/useAuth");
    const authState = useAuth();
    isAuthenticated = authState?.isAuthenticated || false;
    loading = authState?.loading || false;
  } catch (error) {
    console.warn('Auth hook not available or failed:', error);
    // Continue without auth - this is non-blocking
  }

  useEffect(() => {
    // Show login popup after 5 seconds if user is not authenticated
    if (!loading && !isAuthenticated) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductCarousel />
      <Categories />
      <LabGrownDiamonds />
      <UploadedImages location="lab-grown-diamonds" title="Lab Grown Diamond Collection" />
      <div className="grid lg:grid-cols-2 gap-0">
        <InstagramGallery />
        <LabGrownInstagramGallery />
      </div>
      <Footer />
      
      <LoginPopup 
        isOpen={showLoginPopup} 
        onClose={() => setShowLoginPopup(false)}
      />
    </div>
  );
};

export default Index;
