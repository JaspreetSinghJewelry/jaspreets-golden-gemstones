
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
    <section className="py-16 bg-[#1F1E39] text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Crafting Excellence Since 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Three Generations
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              At Jaspreet Singh Jewelry, we combine traditional craftsmanship with contemporary 
              designs to create pieces that tell your unique story. Each piece is meticulously 
              crafted using the finest materials and time-honored techniques.
            </p>
            <p className="text-lg text-gray-400 mb-8">
              Our commitment to excellence has made us a trusted name in luxury jewelry, 
              serving families for over 50 years with integrity and passion.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#1F1E39] hover:from-yellow-500 hover:to-yellow-700 font-semibold"
            >
              Our Story
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-opacity-20 transition-all duration-300"
              >
                <div className="text-yellow-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
