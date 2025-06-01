
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
    <section className="bg-rose-50 px-6 py-20 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
        Timeless Jewelry. Made for You.
      </h2>
      <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
        Discover elegance redefined – handcrafted pieces to elevate every moment.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg"
          onClick={handleShopNow}
          className="bg-rose-600 text-white px-6 py-3 rounded-full text-lg hover:bg-rose-700"
        >
          Explore Collection
        </Button>
        <Button 
          size="lg"
          onClick={handleViewCollections}
          className="border border-rose-600 text-rose-600 bg-white px-6 py-3 rounded-full text-lg hover:bg-rose-50"
        >
          View Collections
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
