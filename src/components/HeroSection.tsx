
import React from 'react';
import { Button } from '@/components/ui/button';
import { FancyText } from '@/components/ui/fancy-text';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#1F1E39] via-[#2A2857] to-yellow-600 text-white py-20 overflow-hidden animate-fade-in">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-[#1F1E39]/20 animate-pulse"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-500/30 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#1F1E39]/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-bounce" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <FancyText variant="glow" size="xl" className="block mb-2 animate-fade-in">
                  Exquisite
                </FancyText>
                <FancyText variant="gradient" size="xl" className="block mb-2 animate-fade-in">
                  Jewelry
                </FancyText>
                <span className="text-white drop-shadow-lg animate-fade-in" style={{animationDelay: '1.5s'}}>Collection</span>
              </h1>
              <p className="text-xl text-gray-100 max-w-lg leading-relaxed drop-shadow-md animate-fade-in" style={{animationDelay: '2s'}}>
                Discover our handcrafted collection of premium jewelry pieces, 
                designed to celebrate life's most precious moments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: '2.5s'}}>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-[#1F1E39] hover:from-yellow-600 hover:to-yellow-500 font-semibold px-8 py-4 text-lg shadow-2xl"
              >
                <FancyText variant="elegant">
                  Shop Now
                </FancyText>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-yellow-400 text-yellow-100 hover:bg-yellow-400 hover:text-[#1F1E39] font-semibold px-8 py-4 text-lg transition-all duration-300 shadow-lg"
              >
                View Collections
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/30 animate-fade-in" style={{animationDelay: '3s'}}>
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <FancyText variant="gold" className="text-2xl font-bold block mb-1 animate-bounce">
                  15+
                </FancyText>
                <p className="text-sm text-gray-100">Years Experience</p>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <FancyText variant="gold" className="text-2xl font-bold block mb-1 animate-bounce">
                  500+
                </FancyText>
                <p className="text-sm text-gray-100">Happy Customers</p>
              </div>
              <div className="text-center transform hover:scale-110 transition-all duration-300">
                <FancyText variant="gold" className="text-2xl font-bold block mb-1 animate-bounce">
                  100%
                </FancyText>
                <p className="text-sm text-gray-100">Certified Gold</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-slide-in-right">
            <div className="bg-gradient-to-br from-white/30 to-yellow-200/30 rounded-3xl p-8 backdrop-blur-sm shadow-2xl transform hover:rotate-2 transition-all duration-500 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop" 
                alt="Premium Jewelry Collection"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-500 animate-fade-in"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-full flex items-center justify-center shadow-xl animate-spin" style={{animationDuration: '3s'}}>
                <FancyText variant="elegant" className="text-[#1F1E39] font-bold animate-pulse">
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
