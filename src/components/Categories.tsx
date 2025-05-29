import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from './ScrollAnimation';

const Categories = () => {
  const categories = [
    {
      name: 'Rings',
      description: 'Engagement & Wedding Rings',
      icon: '💍',
      bgColor: 'bg-gradient-to-br from-[#0D0C29] to-yellow-500',
      hoverColor: 'hover:from-yellow-600 hover:to-[#0D0C29]'
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
      bgColor: 'bg-gradient-to-br from-[#0D0C29] to-yellow-600',
      hoverColor: 'hover:from-yellow-700 hover:to-[#0D0C29]'
    },
    {
      name: 'Bracelets',
      description: 'Luxury Wrist Accessories',
      icon: '💫',
      bgColor: 'bg-gradient-to-br from-yellow-200 to-yellow-400',
      hoverColor: 'hover:from-yellow-300 hover:to-yellow-500'
    },
    {
      name: 'Lab Grown',
      description: 'Sustainable Diamond Collection',
      icon: '🌱',
      bgColor: 'bg-gradient-to-br from-green-400 to-emerald-500',
      hoverColor: 'hover:from-emerald-500 hover:to-green-600'
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
      bgColor: 'bg-gradient-to-br from-[#0D0C29] to-yellow-400',
      hoverColor: 'hover:from-yellow-500 hover:to-[#0D0C29]'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-yellow-50 to-[#0D0C29]/5">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#0D0C29] mb-6">
              Shop by Category
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-[#0D0C29] mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Explore our diverse collection of handcrafted jewelry designed for every occasion and celebration
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {categories.map((category, index) => (
            <ScrollAnimation 
              key={index}
              animation="scale-in"
              delay={index * 100}
            >
              <Card 
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg transform hover:scale-110 hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center relative overflow-hidden">
                  {/* Popup animation overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-[#0D0C29]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  
                  <div className={`w-20 h-20 mx-auto rounded-full ${category.bgColor} ${category.hoverColor} flex items-center justify-center mb-6 transition-all duration-500 shadow-lg transform group-hover:scale-125 group-hover:rotate-12 relative z-10`}>
                    <span className="text-3xl animate-bounce group-hover:animate-pulse">{category.icon}</span>
                  </div>
                  
                  <h3 className="font-bold text-[#0D0C29] mb-3 text-lg group-hover:text-yellow-600 transition-colors duration-300 relative z-10 transform group-hover:scale-105">{category.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 relative z-10">{category.description}</p>
                  
                  {/* Popup effect sparkles */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-[#0D0C29] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500" style={{animationDelay: '0.2s'}}></div>
                  <div className="absolute top-1/2 right-1 w-1.5 h-1.5 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-400" style={{animationDelay: '0.1s'}}></div>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
