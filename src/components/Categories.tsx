
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Rings',
      description: 'Elegant rings for every occasion',
      image: '/lovable-uploads/9df94c16-4c5e-4dbe-a5b9-9fb8559ea956.png',
      path: '/rings'
    },
    {
      name: 'Necklaces',
      description: 'Beautiful necklaces to complement your style',
      image: '/lovable-uploads/a61e619a-3ddd-4e24-b1c2-119499cb9197.png',
      path: '/necklaces'
    },
    {
      name: 'Earrings',
      description: 'Stunning earrings for any look',
      image: '/lovable-uploads/e7a426e1-574e-46be-a349-51b1df8eb82c.png',
      path: '/earrings'
    },
    {
      name: 'Bracelets',
      description: 'Graceful bracelets to adorn your wrists',
      image: '/lovable-uploads/5c836707-3db3-4bb2-9d20-0b4d82b97f07.png',
      path: '/bracelets'
    }
  ];

  return (
    <section className="px-6 py-20 bg-white">
      <h3 className="text-3xl font-semibold text-center mb-10 text-black">Explore Our Collections</h3>
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {categories.map((category) => (
          <Card 
            key={category.name}
            className="w-72 h-72 bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer group border"
            onClick={() => navigate(category.path)}
          >
            <CardContent className="p-0 h-full flex flex-col">
              <div className="h-48 overflow-hidden rounded-t-xl">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              <div className="flex-1 flex items-center justify-center text-center p-4">
                <div>
                  <h4 className="text-xl font-medium text-black mb-2">{category.name}</h4>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Categories;
