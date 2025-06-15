
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MobileCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'rings',
      name: 'Rings',
      description: 'Elegant rings for every occasion',
      image: '/lovable-uploads/6906fdcc-2913-4e7a-9f80-ea8a32a9d009.png',
      path: '/rings'
    },
    {
      id: 'necklaces',
      name: 'Necklaces',
      description: 'Beautiful necklaces to complement your style',
      image: '/lovable-uploads/821c3725-fc1c-4677-9e42-d062bd3ebf3e.png',
      path: '/necklaces'
    },
    {
      id: 'earrings',
      name: 'Earrings',
      description: 'Stunning earrings for any look',
      image: '/lovable-uploads/93d8089d-ea97-407c-bcef-9175a04024b9.png',
      path: '/earrings'
    },
    {
      id: 'bracelets',
      name: 'Bracelets',
      description: 'Delicate bracelets for everyday elegance',
      image: '/lovable-uploads/63f590ef-6210-44a1-9538-a1cd4df03d0f.png',
      path: '/bracelets'
    },
    {
      id: 'lab-grown',
      name: 'Lab Grown Diamonds',
      description: 'Sustainable and brilliant lab grown diamonds',
      image: '/lovable-uploads/91af198-6cb0-485e-858b-ff9a8b3e90d4.png',
      path: '/lab-grown-diamonds'
    }
  ];

  return (
    <section className="px-4 py-8 bg-gray-50">
      <h2 className="text-2xl font-semibold text-center mb-8 text-black">Explore Our Collections</h2>
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {categories.slice(0, 4).map((category) => (
          <div
            key={category.id}
            onClick={() => navigate(category.path)}
            className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform active:scale-95"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center">
              <h3 className="font-semibold text-sm text-gray-900 mb-1">{category.name}</h3>
              <p className="text-xs text-gray-600 leading-tight">{category.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Lab Grown Diamonds as full width card */}
      <div
        onClick={() => navigate('/lab-grown-diamonds')}
        className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform active:scale-95 max-w-lg mx-auto"
      >
        <div className="aspect-[2/1] overflow-hidden">
          <img
            src="/lovable-uploads/091af198-6cb0-485e-858b-ff9a8b3e90d4.png"
            alt="Lab Grown Diamonds"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-semibold text-base text-gray-900 mb-2">Lab Grown Diamonds</h3>
          <p className="text-sm text-gray-600">Sustainable and brilliant lab grown diamonds</p>
        </div>
      </div>
    </section>
  );
};

export default MobileCategories;
