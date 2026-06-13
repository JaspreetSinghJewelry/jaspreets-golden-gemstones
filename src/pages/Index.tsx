
import React from 'react';
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import UploadedImages from "@/components/UploadedImages";
import Categories from "@/components/Categories";
import LabGrownDiamonds from "@/components/LabGrownDiamonds";
import InstagramGallery from "@/components/InstagramGallery";
import LabGrownInstagramGallery from "@/components/LabGrownInstagramGallery";
import Footer from "@/components/Footer";
import { SectionErrorBoundary } from "@/components/SectionErrorBoundary";

const Index = () => {
  return (
    <div className="min-h-screen bg-white" style={{backgroundColor: 'white', color: 'black'}}>
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
    </div>
  );
};

export default Index;
