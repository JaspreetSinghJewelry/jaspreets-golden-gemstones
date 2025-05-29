
import React from 'react';
import { Button } from '@/components/ui/button';
import { FancyText } from '@/components/ui/fancy-text';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#0D0C29] via-[#2563eb] to-yellow-600 text-white py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-[#0D0C29]/20"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#0D0C29]/30 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Centered Content */}
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-7xl lg:text-9xl font-bold leading-tight">
                <FancyText variant="glow" size="xl" className="block mb-2 text-6xl lg:text-8xl">
                  Exquisite
                </FancyText>
                <FancyText variant="gradient" size="xl" className="block mb-2 text-6xl lg:text-8xl">
                  Jewelry
                </FancyText>
                <span className="text-white drop-shadow-lg text-6xl lg:text-8xl">Collection</span>
              </h1>
              <p className="text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                Discover our handcrafted collection of premium jewelry pieces, 
                designed to celebrate life's most precious moments. Each piece tells 
                a unique story of elegance, craftsmanship, and timeless beauty.
              </p>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                From engagement rings that symbolize eternal love to statement necklaces 
                that capture attention, our collection features the finest materials 
                including certified diamonds, pure gold, and precious gemstones. 
                Every piece is meticulously crafted by skilled artisans who have 
                perfected their craft over generations.
              </p>
              <p className="text-base text-gray-300 max-w-2xl mx-auto">
                Experience the luxury of owning jewelry that not only enhances your 
                beauty but also becomes a treasured heirloom for future generations. 
                Our commitment to quality and excellence ensures that every purchase 
                is an investment in lasting elegance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-[#0D0C29] hover:from-yellow-600 hover:to-yellow-500 font-semibold px-8 py-4 text-lg shadow-2xl"
              >
                <FancyText variant="elegant">
                  Shop Now
                </FancyText>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-yellow-400 text-yellow-100 hover:bg-yellow-400 hover:text-[#0D0C29] font-semibold px-8 py-4 text-lg transition-all duration-300 shadow-lg"
              >
                View Collections
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/30 max-w-2xl mx-auto">
              <div className="text-center">
                <FancyText variant="gold" className="text-2xl font-bold block mb-1">
                  15+
                </FancyText>
                <p className="text-sm text-gray-100">Years Experience</p>
              </div>
              <div className="text-center">
                <FancyText variant="gold" className="text-2xl font-bold block mb-1">
                  500+
                </FancyText>
                <p className="text-sm text-gray-100">Happy Customers</p>
              </div>
              <div className="text-center">
                <FancyText variant="gold" className="text-2xl font-bold block mb-1">
                  100%
                </FancyText>
                <p className="text-sm text-gray-100">Certified Gold</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
