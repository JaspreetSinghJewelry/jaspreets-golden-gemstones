
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleViewCollections = () => {
    navigate('/collections');
  };

  return (
    <section className="bg-white px-6 py-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
        Timeless Jewelry. Made for You.
      </h2>
      <p className="text-lg md:text-xl text-gray-800 mb-6 max-w-2xl mx-auto">
        Discover elegance redefined – handcrafted pieces to elevate every moment.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg"
          onClick={handleShopNow}
          className="bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800"
        >
          Explore Collection
        </Button>
        <Button 
          size="lg"
          onClick={handleViewCollections}
          className="border border-black text-black bg-white px-6 py-3 rounded-full text-lg hover:bg-gray-100"
        >
          View Collections
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
