
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const SimpleHero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white px-6 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
        Jaspreet Singh Jewelry
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
        Timeless Jewelry. Made for You.
      </h2>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Discover elegance redefined – handcrafted pieces to elevate every moment.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg"
          onClick={() => navigate('/products')}
          className="bg-black text-white px-8 py-3 rounded-full text-lg hover:bg-gray-800"
        >
          Explore Collection
        </Button>
        <Button 
          size="lg"
          onClick={() => navigate('/collections')}
          className="border border-black text-black bg-white px-8 py-3 rounded-full text-lg hover:bg-gray-100"
        >
          View Collections
        </Button>
      </div>
    </section>
  );
};

export default SimpleHero;
