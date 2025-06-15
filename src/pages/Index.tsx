
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
  const [loadingTime, setLoadingTime] = useState(0);
  const [hardError, setHardError] = useState<string | null>(null);

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

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (loading) {
      interval = setInterval(() => {
        setLoadingTime((t) => t + 1);
      }, 1000);
      if (loadingTime > 8) {
        setHardError("Still loading after 8 seconds. Something may be wrong with authentication, data fetching, or code. Check browser console (F12) for errors.");
      }
    } else {
      setLoadingTime(0);
      setHardError(null);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading, loadingTime]);

  if (hardError) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="p-6 border border-red-300 rounded bg-red-50">
          <h2 className="font-bold text-red-700 mb-2">Debug Error</h2>
          <pre className="text-xs text-red-900">{hardError}</pre>
          <div className="mt-3">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
              Please check your browser console for more info!
            </span>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 border rounded text-red-700 hover:bg-red-100"
        >Reload</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mb-4"></div>
        <span className="text-gray-600 font-semibold">Loading site data...</span>
        {loadingTime > 2 && (
          <div className="mt-4 text-xs text-red-400 animate-pulse">
            If you see this message for more than a few seconds, check your authentication and Supabase setup!
          </div>
        )}
      </div>
    );
  }

  try {
    console.log("[Index.tsx] Rendering main site content");

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
  } catch (e: any) {
    console.error("[Index.tsx Render Error]", e);
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="p-6 border border-red-300 rounded bg-red-50">
          <h2 className="font-bold text-red-700 mb-2">Fatal Error Rendering Index</h2>
          <pre className="text-xs text-red-900">{e?.toString?.() || "Unknown error"}</pre>
          <div className="mt-3">
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
              Please check your browser console for more info!
            </span>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 border rounded text-red-700 hover:bg-red-100"
        >Reload</button>
      </div>
    );
  }
};

export default Index;
