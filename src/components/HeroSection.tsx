
import React from 'react';
import { Button } from '@/components/ui/button';
import { FancyText } from '@/components/ui/fancy-text';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleViewCollections = () => {
    navigate('/products');
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-pink-50 text-gray-800 py-20 overflow-hidden">
      {/* Bright Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 to-pink-100/30"></div>
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-r from-pink-200 to-yellow-200 rounded-full blur-2xl opacity-50"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-emerald-200 to-blue-200 rounded-full blur-xl opacity-40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Centered Content */}
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Discover our handcrafted collection of premium jewelry pieces, 
                designed to celebrate life's most precious moments. Each piece tells 
                a unique story of elegance, craftsmanship, and timeless beauty.
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                From engagement rings that symbolize eternal love to statement necklaces 
                that capture attention, our collection features the finest materials 
                including certified diamonds, pure gold, and precious gemstones. 
                Every piece is meticulously crafted by skilled artisans who have 
                perfected their craft over generations.
              </p>
              <p className="text-base text-gray-500 max-w-2xl mx-auto">
                Experience the luxury of owning jewelry that not only enhances your 
                beauty but also becomes a treasured heirloom for future generations. 
                Our commitment to quality and excellence ensures that every purchase 
                is an investment in lasting elegance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={handleShopNow}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-semibold px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <FancyText variant="elegant" className="text-white">
                  Shop Now
                </FancyText>
              </Button>
              <Button 
                size="lg"
                onClick={handleViewCollections}
                className="bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 font-semibold px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <FancyText variant="elegant" className="text-white">
                  View Collections
                </FancyText>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-300 max-w-2xl mx-auto">
              <div className="text-center">
                <FancyText variant="gradient" className="text-2xl font-bold block mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  15+
                </FancyText>
                <p className="text-sm text-gray-600">Years Experience</p>
              </div>
              <div className="text-center">
                <FancyText variant="gradient" className="text-2xl font-bold block mb-1 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  500+
                </FancyText>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div className="text-center">
                <FancyText variant="gradient" className="text-2xl font-bold block mb-1 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  100%
                </FancyText>
                <p className="text-sm text-gray-600">Certified Gold</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
