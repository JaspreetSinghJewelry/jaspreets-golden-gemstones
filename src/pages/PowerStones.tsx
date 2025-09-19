import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UploadedImages from "@/components/UploadedImages";

const PowerStones = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            Power Stones Collection
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore our mystical power stones collection, crafted to harness positive energy and spiritual wellness.
          </p>
        </div>
        <UploadedImages location="power-stones" />
      </main>
      <Footer />
    </div>
  );
};

export default PowerStones;