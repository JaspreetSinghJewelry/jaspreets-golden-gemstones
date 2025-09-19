
import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import UploadedImages from "@/components/UploadedImages";
import Categories from "@/components/Categories";
import LabGrownDiamonds from "@/components/LabGrownDiamonds";
import InstagramGallery from "@/components/InstagramGallery";
import LabGrownInstagramGallery from "@/components/LabGrownInstagramGallery";
import Footer from "@/components/Footer";
import LoginPopup from "@/components/LoginPopup";
import { useAuth } from "@/hooks/useAuth";
import { SectionErrorBoundary } from "@/components/SectionErrorBoundary";

const Index = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  console.log("[DEBUG] Index.tsx rendering - isAuthenticated:", isAuthenticated, "loading:", loading, "mounted:", mounted);

  // Handle mounting state
  useEffect(() => {
    console.log("[DEBUG] Index component mounted");
    setMounted(true);
  }, []);

  // Show login popup after delay for non-authenticated users
  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      console.log("[DEBUG] Setting login popup timer");
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mounted, isAuthenticated, loading]);

  // Simplified loading state - only show for a very brief moment
  if (!mounted) {
    console.log("[DEBUG] Index not mounted yet");
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Force render main content after mount, regardless of auth state
  console.log("[DEBUG] Rendering main content");
  
  return (
    <div className="min-h-screen bg-white">
      <SectionErrorBoundary label="Header">
        <Header />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary label="Hero Section">
        <HeroSection />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary label="Product Carousel">
        <ProductCarousel />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary label="Categories">
        <Categories />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary label="Lab Grown Diamonds">
        <LabGrownDiamonds />
      </SectionErrorBoundary>
      
      <SectionErrorBoundary label="Uploaded Images">
        <UploadedImages location="lab-grown-diamonds" title="Lab Grown Diamond Collection" />
      </SectionErrorBoundary>
      
      <div className="grid lg:grid-cols-2 gap-0">
        <SectionErrorBoundary label="Instagram Gallery">
          <InstagramGallery />
        </SectionErrorBoundary>
        
        <SectionErrorBoundary label="Lab Grown Instagram Gallery">
          <LabGrownInstagramGallery />
        </SectionErrorBoundary>
      </div>
      
      <SectionErrorBoundary label="Footer">
        <Footer />
      </SectionErrorBoundary>
      
      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />
    </div>
  );
};

export default Index;
