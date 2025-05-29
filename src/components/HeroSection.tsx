
import React from 'react';
import { Button } from '@/components/ui/button';
import { FancyText } from '@/components/ui/fancy-text';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#1F1E39] via-[#2A2951] to-[#1F1E39] text-white py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-transparent"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-yellow-400/5 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <FancyText variant="glow" size="xl" className="block mb-2">
                  Exquisite
                </FancyText>
                <FancyText variant="gradient" size="xl" className="block mb-2">
                  Jewelry
                </FancyText>
                <span className="text-white">Collection</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
                Discover our handcrafted collection of premium jewelry pieces, 
                designed to celebrate life's most precious moments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#1F1E39] hover:from-yellow-500 hover:to-yellow-700 font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-200"
              >
                <FancyText variant="elegant">
                  Shop Now
                </FancyText>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-[#1F1E39] font-semibold px-8 py-4 text-lg transition-all duration-200"
              >
                View Collections
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700">
              <div className="text-center">
                <FancyText variant="gold" className="text-2xl font-bold block mb-1">
                  15+
                </FancyText>
                <p className="text-sm text-gray-400">Years Experience</p>
              </div>
              <div className="text-center">
                <FancyText variant="gold" className="text-2xl font-bold block mb-1">
                  500+
                </FancyText>
                <p className="text-sm text-gray-400">Happy Customers</p>
              </div>
              <div className="text-center">
                <FancyText variant="gold" className="text-2xl font-bold block mb-1">
                  100%
                </FancyText>
                <p className="text-sm text-gray-400">Certified Gold</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-400/20 to-transparent rounded-3xl p-8 backdrop-blur-sm">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop" 
                alt="Premium Jewelry Collection"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl">
                <FancyText variant="elegant" className="text-[#1F1E39] font-bold">
                  NEW
                </FancyText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
