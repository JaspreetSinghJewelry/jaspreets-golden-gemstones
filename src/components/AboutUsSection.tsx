
import React from 'react';
import { Button } from '@/components/ui/button';

const AboutUsSection = () => {
  return (
    <section className="px-6 py-20 bg-white">
      <h3 className="text-3xl font-semibold text-center mb-12 text-gray-800">What Our Customers Say</h3>
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2 mb-16">
        <div className="border p-6 rounded-xl shadow-sm">
          <p className="text-gray-600 mb-2">"Absolutely stunning ring! The packaging, the quality, everything was perfect."</p>
          <p className="font-semibold text-rose-600">— Anika R.</p>
        </div>
        <div className="border p-6 rounded-xl shadow-sm">
          <p className="text-gray-600 mb-2">"I gifted the necklace to my sister and she hasn't taken it off since."</p>
          <p className="font-semibold text-rose-600">— Maira T.</p>
        </div>
      </div>

      {/* About Us Content */}
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">About Us</h2>
        <div className="w-24 h-1 bg-rose-600 mx-auto mb-12"></div>
        
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

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-gray-200">
          <div className="text-center">
            <span className="text-4xl font-bold block mb-2 text-rose-600">15+</span>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div className="text-center">
            <span className="text-4xl font-bold block mb-2 text-rose-600">500+</span>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <span className="text-4xl font-bold block mb-2 text-rose-600">100%</span>
            <p className="text-gray-600">Certified Gold</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
