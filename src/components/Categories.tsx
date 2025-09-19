
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
  {
    name: 'Rings',
    path: '/rings',
    image: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/natural.jpg',
    description: 'Elegant rings for every occasion'
  },
  {
    name: 'Necklaces',
    path: '/necklaces',
    image: '/lovable-uploads/4e3fe8b3-6a21-4848-8c77-b4fe99f69237.png',
    description: 'Beautiful necklaces to complement your style'
  },
  {
    name: 'Earrings',
    path: '/earrings',
    image: '/lovable-uploads/25a36549-df61-4038-9168-526502498ede.png',
    description: 'Stunning earrings for any look'
  },
  {
    name: 'Bracelets',
    path: '/bracelets',
    image: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/natural%20bracelet.jpg',
    description: 'Delicate bracelets for everyday elegance'
  },
  {
    name: 'Pendants',
    path: '/pendants',
    image: '/lovable-uploads/cae9a9c5-19f1-4f96-bdcc-f3053b3cff46.png',
    description: 'Exquisite pendants for timeless elegance'
  },
  {
    name: 'Lab Grown Diamonds',
    path: '/lab-grown-diamonds',
    image: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/lab%20diamond%20earring.jpeg',
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
