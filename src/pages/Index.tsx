
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
import { useAuth } from "@/hooks/useAuth";
import { SectionErrorBoundary } from "@/components/SectionErrorBoundary";

const Index = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    console.log("[DEBUG - Index.tsx] isAuthenticated:", isAuthenticated, "loading:", loading);
  }, [isAuthenticated, loading]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loading]);

  // Simple loading state without complex error handling
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mb-4"></div>
        <span className="text-gray-600 font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SectionErrorBoundary label="Header">
        <Header />
      </SectionErrorBoundary>
      <SectionErrorBoundary label="ProductCarousel">
        <ProductCarousel />
      </SectionErrorBoundary>
      <SectionErrorBoundary label="Categories">
        <Categories />
      </SectionErrorBoundary>
      <SectionErrorBoundary label="LabGrownDiamonds">
        <LabGrownDiamonds />
      </SectionErrorBoundary>
      <SectionErrorBoundary label="UploadedImages">
        <UploadedImages location="lab-grown-diamonds" title="Lab Grown Diamond Collection" />
      </SectionErrorBoundary>
      <div className="grid lg:grid-cols-2 gap-0">
        <SectionErrorBoundary label="InstagramGallery">
          <InstagramGallery />
        </SectionErrorBoundary>
        <SectionErrorBoundary label="LabGrownInstagramGallery">
          <LabGrownInstagramGallery />
        </SectionErrorBoundary>
      </div>
      <SectionErrorBoundary label="Footer">
        <Footer />
      </SectionErrorBoundary>
      <SectionErrorBoundary label="LoginPopup">
        <LoginPopup
          isOpen={showLoginPopup}
          onClose={() => setShowLoginPopup(false)}
        />
      </SectionErrorBoundary>
    </div>
  );
};

export default Index;
