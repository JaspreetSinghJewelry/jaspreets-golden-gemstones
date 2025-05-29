
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Categories = () => {
  const categories = [
    {
      name: 'Rings',
      description: 'Engagement & Wedding Rings',
      icon: '💍',
      bgColor: 'bg-gradient-to-br from-[#1F1E39] to-yellow-500',
      hoverColor: 'hover:from-yellow-600 hover:to-[#1F1E39]'
    },
    {
      name: 'Necklaces',
      description: 'Elegant Chain Collections',
      icon: '📿',
      bgColor: 'bg-gradient-to-br from-yellow-200 to-yellow-400',
      hoverColor: 'hover:from-yellow-300 hover:to-yellow-500'
    },
    {
      name: 'Earrings',
      description: 'Stunning Ear Jewelry',
      icon: '✨',
      bgColor: 'bg-gradient-to-br from-[#1F1E39] to-yellow-600',
      hoverColor: 'hover:from-yellow-700 hover:to-[#1F1E39]'
    },
    {
      name: 'Bracelets',
      description: 'Luxury Wrist Accessories',
      icon: '💫',
      bgColor: 'bg-gradient-to-br from-yellow-200 to-yellow-400',
      hoverColor: 'hover:from-yellow-300 hover:to-yellow-500'
    },
    {
      name: 'Bridal',
      description: 'Complete Bridal Sets',
      icon: '👰',
      bgColor: 'bg-gradient-to-br from-yellow-300 to-yellow-500',
      hoverColor: 'hover:from-yellow-400 hover:to-yellow-600'
    },
    {
      name: 'Men\'s Collection',
      description: 'Sophisticated Men\'s Jewelry',
      icon: '👑',
      bgColor: 'bg-gradient-to-br from-[#1F1E39] to-yellow-400',
      hoverColor: 'hover:from-yellow-500 hover:to-[#1F1E39]'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-yellow-50 to-[#1F1E39]/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#1F1E39] mb-6">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-[#1F1E39] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse collection of handcrafted jewelry designed for every occasion and celebration
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg"
            >
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 mx-auto rounded-full ${category.bgColor} ${category.hoverColor} flex items-center justify-center mb-6 transition-all duration-300 shadow-lg`}>
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="font-bold text-[#1F1E39] mb-3 text-lg group-hover:text-yellow-600 transition-colors duration-300">{category.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
