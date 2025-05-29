
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Categories = () => {
  const categories = [
    {
      name: 'Rings',
      description: 'Engagement & Wedding Rings',
      icon: '💍',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200'
    },
    {
      name: 'Necklaces',
      description: 'Elegant Chain Collections',
      icon: '📿',
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200'
    },
    {
      name: 'Earrings',
      description: 'Stunning Ear Jewelry',
      icon: '👂',
      bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200'
    },
    {
      name: 'Bracelets',
      description: 'Luxury Wrist Accessories',
      icon: '⌚',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200'
    },
    {
      name: 'Bridal',
      description: 'Complete Bridal Sets',
      icon: '👰',
      bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200'
    },
    {
      name: 'Men\'s Collection',
      description: 'Sophisticated Men\'s Jewelry',
      icon: '👔',
      bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1F1E39] mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of handcrafted jewelry designed for every occasion
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto rounded-full ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="font-bold text-[#1F1E39] mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
