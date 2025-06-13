
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
import FeaturedProducts from "@/components/FeaturedProducts";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Show login popup after 3 seconds if user is not authenticated
    if (!loading && !isAuthenticated) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loading]);

  // Add error boundary to catch any rendering errors
  try {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <ProductCarousel />
        <Categories />
        <FeaturedProducts />
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
  } catch (error) {
    console.error('Error rendering Index page:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Jaspreet Singh Jewelry</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
};

export default Index;
