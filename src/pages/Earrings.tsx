
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UploadedImages from "@/components/UploadedImages";

const Earrings = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            Earrings Collection
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Adorn yourself with our elegant earrings, crafted to enhance your natural beauty.
          </p>
        </div>
        <UploadedImages location="earrings" />
      </main>
      <Footer />
    </div>
  );
};

export default Earrings;
