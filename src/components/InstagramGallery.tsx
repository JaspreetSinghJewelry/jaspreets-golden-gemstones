
import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InstagramGallery = () => {
  // Updated jewelry images with your uploaded photos
  const jewelryImages = [
    {
      id: 1,
      src: '/lovable-uploads/cae9a9c5-19f1-4f96-bdcc-f3053b3cff46.png',
      alt: 'Diamond Jewelry'
    },
    {
      id: 2,
      src: '/lovable-uploads/0fd33372-c966-40bd-8e42-509dd3ca80a4.png',
      alt: 'Gold Earrings'
    },
    {
      id: 3,
      src: '/lovable-uploads/4c0dc0a9-0400-424e-858e-2c1137e80c4f.png',
      alt: 'Gold Chain Necklace'
    },
    {
      id: 4,
      src: '/lovable-uploads/affebecb-9cbb-471f-bed5-13025cff9703.png',
      alt: 'Diamond Ring'
    }
  ];

  return (
    <section className="py-8 bg-gradient-to-br from-yellow-50 to-[#1F1E39]/30 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 animate-slide-in-up">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Instagram className="h-6 w-6 text-[#1F1E39]" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#1F1E39]">
              Follow Us on Instagram
            </h2>
          </div>
          <p className="text-lg text-gray-700 max-w-xl mx-auto mb-4 animate-fade-in" style={{animationDelay: '0.5s'}}>
            See our latest jewelry creations and customer stories
          </p>
          <Button
            onClick={() => window.open('https://www.instagram.com/jaspreetsinghjewelry/', '_blank')}
            className="bg-gradient-to-r from-[#1F1E39] to-black text-white hover:from-[#2A2857] hover:to-gray-800 font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg text-sm"
          >
            <Instagram className="h-4 w-4 mr-2" />
            @jaspreetsinghjewelry
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-md mx-auto">
          {jewelryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 animate-fade-in shadow-md hover:shadow-lg"
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => window.open('https://www.instagram.com/jaspreetsinghjewelry/', '_blank')}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E39]/50 via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 animate-fade-in" style={{animationDelay: '0.8s'}}>
          <Button
            variant="outline"
            onClick={() => window.open('https://www.instagram.com/jaspreetsinghjewelry/', '_blank')}
            className="border-2 border-[#1F1E39] text-[#1F1E39] hover:bg-[#1F1E39] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-md text-sm"
          >
            View More on Instagram
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
