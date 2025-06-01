
import React from 'react';
import { Button } from '@/components/ui/button';
import { FancyText } from '@/components/ui/fancy-text';

const AboutUsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-8">About Us</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-12"></div>
          
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed mb-12">
            <p>
              Discover our handcrafted collection of premium jewelry pieces, designed to celebrate 
              life's most precious moments. Each piece tells a unique story of elegance, 
              craftsmanship, and timeless beauty.
            </p>
            
            <p>
              From engagement rings that symbolize eternal love to statement necklaces that 
              capture attention, our collection features the finest materials including certified 
              diamonds, pure gold, and precious gemstones. Every piece is meticulously crafted 
              by skilled artisans who have perfected their craft over generations.
            </p>
            
            <p>
              Experience the luxury of owning jewelry that not only enhances your beauty but also 
              becomes a treasured heirloom for future generations. Our commitment to quality and 
              excellence ensures that every purchase is an investment in lasting elegance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-semibold px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FancyText variant="elegant" className="text-white">
                Shop Now
              </FancyText>
            </Button>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white hover:from-pink-600 hover:to-rose-700 font-semibold px-8 py-4 text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FancyText variant="elegant" className="text-white">
                View Collections
              </FancyText>
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-200">
            <div className="text-center">
              <FancyText variant="gradient" className="text-4xl font-bold block mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                15+
              </FancyText>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <FancyText variant="gradient" className="text-4xl font-bold block mb-2 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                500+
              </FancyText>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <FancyText variant="gradient" className="text-4xl font-bold block mb-2 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                100%
              </FancyText>
              <p className="text-gray-600">Certified Gold</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
