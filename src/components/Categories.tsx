
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Categories = () => {
  const categories = [
    {
      name: 'Rings',
      description: 'Engagement & Wedding Rings',
      icon: '💍',
      bgColor: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
      hoverColor: 'hover:from-yellow-200 hover:to-yellow-300'
    },
    {
      name: 'Necklaces',
      description: 'Elegant Chain Collections',
      icon: '📿',
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
      hoverColor: 'hover:from-blue-200 hover:to-blue-300'
    },
    {
      name: 'Earrings',
      description: 'Stunning Ear Jewelry',
      icon: '✨',
      bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
      hoverColor: 'hover:from-purple-200 hover:to-purple-300'
    },
    {
      name: 'Bracelets',
      description: 'Luxury Wrist Accessories',
      icon: '💫',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
      hoverColor: 'hover:from-green-200 hover:to-green-300'
    },
    {
      name: 'Bridal',
      description: 'Complete Bridal Sets',
      icon: '👰',
      bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200',
      hoverColor: 'hover:from-pink-200 hover:to-pink-300'
    },
    {
      name: 'Men\'s Collection',
      description: 'Sophisticated Men\'s Jewelry',
      icon: '👑',
      bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200',
      hoverColor: 'hover:from-gray-200 hover:to-gray-300'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#1F1E39] mb-6">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our diverse collection of handcrafted jewelry designed for every occasion and celebration
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 border-0 shadow-lg"
            >
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 mx-auto rounded-full ${category.bgColor} ${category.hoverColor} flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-500 shadow-lg`}>
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="font-bold text-[#1F1E39] mb-3 text-lg group-hover:text-yellow-600 transition-colors">{category.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
