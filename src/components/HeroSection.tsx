
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Diamond, Crown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#1F1E39] via-blue-900 to-[#1F1E39] text-white py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Enhanced Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-yellow-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 border border-yellow-400 rounded-full opacity-15 animate-bounce"></div>
      <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-yellow-400 rounded-full opacity-70 animate-ping"></div>
      <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full opacity-90 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-yellow-400 rounded-full opacity-80 animate-bounce"></div>
      <div className="absolute bottom-1/3 left-2/3 w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-60 animate-ping"></div>
      
      {/* Floating gemstone elements */}
      <div className="absolute top-20 right-1/4 animate-float">
        <Diamond className="h-8 w-8 text-yellow-400 opacity-40" />
      </div>
      <div className="absolute bottom-32 left-1/4 animate-bounce">
        <Sparkles className="h-6 w-6 text-yellow-400 opacity-50" />
      </div>
      <div className="absolute top-1/3 right-1/6 animate-pulse">
        <Crown className="h-10 w-10 text-yellow-400 opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h1 className="text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block text-white">Exquisite</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-pulse">
                Jewelry
              </span>
              <span className="block text-white text-5xl lg:text-6xl mt-4">Collection</span>
            </h1>
            
            <p className="text-2xl text-gray-300 leading-relaxed max-w-2xl">
              Discover our handcrafted collection of premium jewelry, featuring 
              timeless designs and exceptional quality that celebrates life's precious moments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#1F1E39] hover:from-yellow-500 hover:to-yellow-700 font-bold text-xl px-12 py-8 shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 transform hover:scale-105"
              >
                Shop Collection
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-3 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-[#1F1E39] font-bold text-xl px-12 py-8 transition-all duration-300 transform hover:scale-105"
              >
                View Catalog
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl p-10 transform rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl hover:shadow-yellow-400/25">
              <div className="bg-white rounded-2xl p-10 shadow-2xl">
                <div className="text-center">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-[#1F1E39] to-blue-900 rounded-full flex items-center justify-center mb-8 shadow-xl relative overflow-hidden">
                    <span className="text-8xl animate-bounce">💎</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-pulse"></div>
                  </div>
                  <h3 className="text-4xl font-bold text-[#1F1E39] mb-6">Premium Quality</h3>
                  <p className="text-gray-600 text-xl leading-relaxed">Certified diamonds and precious metals crafted with perfection</p>
                  <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl">
                    <p className="text-lg font-semibold text-[#1F1E39]">✨ Handcrafted Excellence ✨</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
