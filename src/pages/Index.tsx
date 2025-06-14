
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
  const [renderReady, setRenderReady] = useState(false);
  
  const auth = useAuth();
  const isAuthenticated = auth?.isAuthenticated ?? false;
  const loading = auth?.loading ?? true;
  
  console.log('Index page rendering...', { isAuthenticated, loading, auth: !!auth });

  // Initialize page readiness
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle render readiness
  useEffect(() => {
    if (!loading && isPageReady) {
      const timer = setTimeout(() => {
        setRenderReady(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [loading, isPageReady]);

  // Handle login popup timing
  useEffect(() => {
    if (renderReady && !loading && !isAuthenticated) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loading, renderReady]);

  // Show loading while auth is loading or page isn't ready
  if (loading || !isPageReady || !renderReady) {
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
      
      {showLoginPopup && (
        <LoginPopup 
          isOpen={showLoginPopup} 
          onClose={() => setShowLoginPopup(false)}
        />
      )}
    </div>
  );
};

export default Index;
