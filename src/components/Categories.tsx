
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ScrollAnimation from './ScrollAnimation';

const Categories = () => {
  const categories = [
    {
      name: 'Rings',
      description: 'Engagement & Wedding Rings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      bgColor: 'bg-gradient-to-br from-pink-400 to-rose-500',
      hoverColor: 'hover:from-rose-500 hover:to-pink-600'
    },
    {
      name: 'Necklaces',
      description: 'Elegant Chain Collections',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      bgColor: 'bg-gradient-to-br from-purple-400 to-indigo-500',
      hoverColor: 'hover:from-indigo-500 hover:to-purple-600'
    },
    {
      name: 'Earrings',
      description: 'Stunning Ear Jewelry',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
      bgColor: 'bg-gradient-to-br from-cyan-400 to-blue-500',
      hoverColor: 'hover:from-blue-500 hover:to-cyan-600'
    },
    {
      name: 'Bracelets',
      description: 'Luxury Wrist Accessories',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop',
      bgColor: 'bg-gradient-to-br from-orange-400 to-red-500',
      hoverColor: 'hover:from-red-500 hover:to-orange-600'
    },
    {
      name: 'Lab Grown',
      description: 'Sustainable Diamond Collection',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
      bgColor: 'bg-gradient-to-br from-emerald-400 to-green-500',
      hoverColor: 'hover:from-green-500 hover:to-emerald-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Shop by Category
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Explore our diverse collection of handcrafted jewelry designed for every occasion and celebration
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
          {categories.map((category, index) => (
            <ScrollAnimation 
              key={index}
              animation="scale-in"
              delay={index * 100}
            >
              <Card 
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg transform hover:scale-110 hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center relative overflow-hidden">
                  {/* Popup animation overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                  
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-6 shadow-lg transform group-hover:scale-125 transition-all duration-500 relative z-10">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="font-bold text-gray-800 mb-3 text-lg group-hover:text-purple-600 transition-colors duration-300 relative z-10 transform group-hover:scale-105">{category.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300 relative z-10">{category.description}</p>
                  
                  {/* Popup effect sparkles */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300"></div>
                  <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500" style={{animationDelay: '0.2s'}}></div>
                  <div className="absolute top-1/2 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-400" style={{animationDelay: '0.1s'}}></div>
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
