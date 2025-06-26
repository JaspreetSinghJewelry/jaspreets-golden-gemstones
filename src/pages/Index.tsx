
import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import SimpleHero from "@/components/SimpleHero";
import ProductCarousel from "@/components/ProductCarousel";
import UploadedImages from "@/components/UploadedImages";
import Categories from "@/components/Categories";
import LabGrownDiamonds from "@/components/LabGrownDiamonds";
import InstagramGallery from "@/components/InstagramGallery";
import LabGrownInstagramGallery from "@/components/LabGrownInstagramGallery";
import Footer from "@/components/Footer";
import LoginPopup from "@/components/LoginPopup";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  console.log("[DEBUG] Index.tsx rendering - isAuthenticated:", isAuthenticated, "loading:", loading);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 5000); // Increased to 5 seconds
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, loading, mounted]);

  // Only show loading for the first 2 seconds max
  if (!mounted) {
    setTimeout(() => setMounted(true), 100);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <SimpleHero />
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
