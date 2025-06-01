
import React from 'react';
import { Button } from '@/components/ui/button';
import { Award, Truck } from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Certified Quality',
      description: 'All our jewelry comes with quality certificates'
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Free Shipping',
      description: 'Free delivery on orders above ₹10,000'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <h2 className="text-4xl font-bold mb-6">
              Crafting Excellence Since 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Three Generations
              </span>
            </h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed animate-fade-in" style={{animationDelay: '0.5s'}}>
              At Jaspreet Singh Jewelry, we combine traditional craftsmanship with contemporary 
              designs to create pieces that tell your unique story. Each piece is meticulously 
              crafted using the finest materials and time-honored techniques.
            </p>
            <p className="text-lg text-gray-600 mb-8 animate-fade-in" style={{animationDelay: '1s'}}>
              Our commitment to excellence has made us a trusted name in luxury jewelry, 
              serving families for over 50 years with integrity and passion.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 font-semibold transform hover:scale-110 transition-all duration-300 shadow-lg"
            >
              Our Story
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6 animate-slide-in-right">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/90 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 animate-fade-in shadow-lg border border-gray-100"
                style={{animationDelay: `${index * 0.3}s`}}
              >
                <div className="text-blue-600 mb-4 flex justify-center" style={{animationDelay: `${index * 0.2}s`}}>
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
