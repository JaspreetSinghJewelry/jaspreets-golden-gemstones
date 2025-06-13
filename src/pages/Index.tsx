
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
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  
  // Use optional chaining and default values to prevent errors
  const auth = useAuth();
  const isAuthenticated = auth?.isAuthenticated || false;
  const loading = auth?.loading !== false; // Default to loading if undefined
  
  console.log('Index page rendering...', { isAuthenticated, loading, auth });

  useEffect(() => {
    // Set page as ready after a short delay to ensure all components are loaded
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated && isPageReady) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loading, isPageReady]);

  // Show loading spinner while auth is loading or page isn't ready
  if (loading || !isPageReady) {
    return <LoadingSpinner message="Loading Jaspreet Singh Jewelry..." />;
  }

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
