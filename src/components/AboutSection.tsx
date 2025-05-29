
import React from 'react';
import { Button } from '@/components/ui/button';
import { Award, Shield, Truck, Headphones } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Certified Quality',
      description: 'All our jewelry comes with quality certificates'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Lifetime Warranty',
      description: 'Comprehensive warranty on all our products'
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Free Shipping',
      description: 'Free delivery on orders above ₹10,000'
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 text-white animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <h2 className="text-4xl font-bold mb-6 animate-bounce">
              Crafting Excellence Since 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300 animate-pulse">
                Three Generations
              </span>
            </h2>
            <p className="text-xl text-gray-100 mb-6 leading-relaxed animate-fade-in" style={{animationDelay: '0.5s'}}>
              At Jaspreet Singh Jewelry, we combine traditional craftsmanship with contemporary 
              designs to create pieces that tell your unique story. Each piece is meticulously 
              crafted using the finest materials and time-honored techniques.
            </p>
            <p className="text-lg text-gray-200 mb-8 animate-fade-in" style={{animationDelay: '1s'}}>
              Our commitment to excellence has made us a trusted name in luxury jewelry, 
              serving families for over 50 years with integrity and passion.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-yellow-300 to-pink-400 text-gray-800 hover:from-yellow-400 hover:to-pink-500 font-semibold transform hover:scale-110 transition-all duration-300 shadow-2xl animate-pulse"
            >
              Our Story
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6 animate-slide-in-right">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/30 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 animate-fade-in shadow-xl"
                style={{animationDelay: `${index * 0.3}s`}}
              >
                <div className="text-yellow-300 mb-4 flex justify-center animate-bounce" style={{animationDelay: `${index * 0.2}s`}}>
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-2 animate-pulse">{feature.title}</h3>
                <p className="text-sm text-gray-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
