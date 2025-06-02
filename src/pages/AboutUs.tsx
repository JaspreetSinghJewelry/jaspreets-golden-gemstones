
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <section className="px-6 py-20 bg-white">
        {/* About Us Content */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">About Us</h2>
          <div className="w-24 h-1 bg-rose-600 mx-auto mb-12"></div>
          
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              At Jaspreet Singh Jewelry, we specialize in crafting timeless elegance with our exquisite collection of Polki, Jadau, solitaires and natural diamond jewelry. With over 17 years of experience, we have established ourselves as a trusted name in the world of fine jewelry, standing out from the competition with our dedication to quality and craftsmanship.
            </p>
            
            <p>
              Based in the vibrant hub of Karol Bagh, New Delhi, we take pride in offering personalized service and unmatched honesty in every piece we create. Whether it's a bespoke design or a timeless classic, our jewelry embodies the perfect blend of tradition and modernity.
            </p>
            
            <p>
              With a commitment to excellence, we offer worldwide shipping, ensuring that our artistry reaches discerning customers across the globe. At Jaspreet Singh Jewelry, we don't just create jewelry; we craft stories that last a lifetime.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
