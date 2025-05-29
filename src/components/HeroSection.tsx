
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Shield, Award } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#1F1E39] via-blue-900 to-[#1F1E39] text-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-yellow-400 rounded-full opacity-20"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-yellow-400 rounded-full opacity-10"></div>
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full opacity-80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300 ml-2">Trusted by 10,000+ customers</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              Exquisite
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-pulse">
                Jewelry
              </span>
              Collection
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              Discover our handcrafted collection of premium jewelry, featuring 
              timeless designs and exceptional quality that celebrates life's precious moments.
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <span>Certified Quality</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#1F1E39] hover:from-yellow-500 hover:to-yellow-700 font-semibold text-lg px-8 py-6 shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-[#1F1E39] font-semibold text-lg px-8 py-6 transition-all duration-300"
              >
                View Catalog
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto bg-gradient-to-br from-[#1F1E39] to-blue-900 rounded-full flex items-center justify-center mb-6 shadow-xl">
                    <span className="text-6xl">💎</span>
                  </div>
                  <h3 className="text-3xl font-bold text-[#1F1E39] mb-4">Premium Quality</h3>
                  <p className="text-gray-600 text-lg">Certified diamonds and precious metals</p>
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">4.9/5 Customer Rating</p>
                  </div>
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
