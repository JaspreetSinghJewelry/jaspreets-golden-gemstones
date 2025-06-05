
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const labGrownProducts = [
  {
    id: 101,
    name: 'Lab Grown Diamond Ring',
    price: '₹45,999',
    originalPrice: '₹55,999',
    image: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/lab%20ring.jpeg',
  },
  {
    id: 102,
    name: 'Lab Grown Diamond Necklace',
    price: '₹38,999',
    originalPrice: '₹48,999',
    image: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/lab%20necklace.jpeg',
  },
  {
    id: 103,
    name: 'Lab Grown Diamond Earrings',
    price: '₹28,999',
    originalPrice: '₹35,999',
    image: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/lab%20diamond%20earring.jpeg',
  },
  {
    id: 104,
    name: 'Lab Grown Diamond Bracelet',
    price: '₹32,999',
    originalPrice: '₹42,999',
    image: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/lab%20grown%20bracelet%20.jpg',
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
