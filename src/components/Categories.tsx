
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: 'Rings',
      path: '/rings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop',
      description: 'Elegant rings for every occasion'
    },
    {
      name: 'Necklaces',
      path: '/necklaces',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop',
      description: 'Beautiful necklaces to complement your style'
    },
    {
      name: 'Earrings',
      path: '/earrings',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop',
      description: 'Stunning earrings for any look'
    },
    {
      name: 'Bracelets',
      path: '/bracelets',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop',
      description: 'Delicate bracelets for everyday elegance'
    },
    {
      name: 'Lab Grown Diamonds',
      path: '/lab-grown-diamonds',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop',
      description: 'Sustainable and brilliant lab grown diamonds'
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
