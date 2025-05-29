
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#1F1E39] to-blue-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Exquisite
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Jewelry
              </span>
              Collection
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover our handcrafted collection of premium jewelry, featuring 
              timeless designs and exceptional quality that celebrates life's precious moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#1F1E39] hover:from-yellow-500 hover:to-yellow-700 font-semibold"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-[#1F1E39]"
              >
                View Catalog
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-6 shadow-2xl">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#1F1E39] to-blue-900 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">💎</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1F1E39] mb-2">Premium Quality</h3>
                  <p className="text-gray-600">Certified diamonds and precious metals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
