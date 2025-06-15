
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

const Index = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const [loadingTime, setLoadingTime] = useState(0);
  const [hardError, setHardError] = useState<string | null>(null);

  // Debug: log loading and auth state changes
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

  // Debug: Hard error/fallback in case "loading" never resolves (increased timeout for debounce)
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (loading) {
      interval = setInterval(() => {
        setLoadingTime((t) => t + 1);
      }, 1000);

      // After 8 seconds, show error with extra visibility
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

  // Catch and display any top-level errors
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

  // Final fallback to prevent blank screen if rendering fails
  try {
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
