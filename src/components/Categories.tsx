
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Categories = () => {
  const categories = [
    {
      name: 'Rings',
      description: 'Engagement & Wedding Rings',
      icon: '💍',
      bgColor: 'bg-gradient-to-br from-pink-200 to-pink-400',
      hoverColor: 'hover:from-pink-300 hover:to-pink-500'
    },
    {
      name: 'Necklaces',
      description: 'Elegant Chain Collections',
      icon: '📿',
      bgColor: 'bg-gradient-to-br from-blue-200 to-blue-400',
      hoverColor: 'hover:from-blue-300 hover:to-blue-500'
    },
    {
      name: 'Earrings',
      description: 'Stunning Ear Jewelry',
      icon: '✨',
      bgColor: 'bg-gradient-to-br from-purple-200 to-purple-400',
      hoverColor: 'hover:from-purple-300 hover:to-purple-500'
    },
    {
      name: 'Bracelets',
      description: 'Luxury Wrist Accessories',
      icon: '💫',
      bgColor: 'bg-gradient-to-br from-green-200 to-green-400',
      hoverColor: 'hover:from-green-300 hover:to-green-500'
    },
    {
      name: 'Bridal',
      description: 'Complete Bridal Sets',
      icon: '👰',
      bgColor: 'bg-gradient-to-br from-yellow-200 to-yellow-400',
      hoverColor: 'hover:from-yellow-300 hover:to-yellow-500'
    },
    {
      name: 'Men\'s Collection',
      description: 'Sophisticated Men\'s Jewelry',
      icon: '👑',
      bgColor: 'bg-gradient-to-br from-orange-200 to-orange-400',
      hoverColor: 'hover:from-orange-300 hover:to-orange-500'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-cyan-100 to-blue-200 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-slide-in-up">
          <h2 className="text-5xl font-bold text-[#1F1E39] mb-6 animate-bounce">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-pink-500 mx-auto mb-6 animate-pulse"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.5s'}}>
            Explore our diverse collection of handcrafted jewelry designed for every occasion and celebration
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-700 cursor-pointer transform hover:-translate-y-6 hover:rotate-2 border-0 shadow-lg animate-fade-in hover:animate-pulse"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <CardContent className="p-8 text-center">
                <div className={`w-20 h-20 mx-auto rounded-full ${category.bgColor} ${category.hoverColor} flex items-center justify-center mb-6 group-hover:scale-150 group-hover:rotate-12 transition-all duration-700 shadow-lg animate-bounce`}
                     style={{animationDelay: `${index * 0.3}s`}}>
                  <span className="text-3xl animate-pulse">{category.icon}</span>
                </div>
                <h3 className="font-bold text-[#1F1E39] mb-3 text-lg group-hover:text-pink-600 transition-colors duration-500 transform group-hover:scale-110">{category.name}</h3>
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
