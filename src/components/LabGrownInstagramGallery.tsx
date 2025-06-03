
import React from 'react';
import { Instagram, ExternalLink, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LabGrownInstagramGallery = () => {
  // Updated lab grown images with your uploaded photos (same photos for consistency)
  const labGrownImages = [
    {
      id: 1,
      src: '/lovable-uploads/cae9a9c5-19f1-4f96-bdcc-f3053b3cff46.png',
      alt: 'Lab Grown Diamond Jewelry'
    },
    {
      id: 2,
      src: '/lovable-uploads/0fd33372-c966-40bd-8e42-509dd3ca80a4.png',
      alt: 'Sustainable Gold Earrings'
    },
    {
      id: 3,
      src: '/lovable-uploads/4c0dc0a9-0400-424e-858e-2c1137e80c4f.png',
      alt: 'Eco-Friendly Necklace'
    },
    {
      id: 4,
      src: '/lovable-uploads/affebecb-9cbb-471f-bed5-13025cff9703.png',
      alt: 'Lab Created Diamond Ring'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-[#0D0C29]/30 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-up">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Leaf className="h-8 w-8 text-green-600" />
            <Instagram className="h-8 w-8 text-[#0D0C29]" />
            <h2 className="text-4xl font-bold text-[#0D0C29]">
              Lab Grown Collection on Instagram
            </h2>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6 animate-fade-in" style={{animationDelay: '0.5s'}}>
            Follow our sustainable jewelry journey and eco-friendly diamond creations
          </p>
          <Button
            onClick={() => window.open('https://www.instagram.com/jsj.labgrowndiamonds/', '_blank')}
            className="bg-gradient-to-r from-green-600 to-[#0D0C29] text-white hover:from-green-700 hover:to-[#2A2857] font-semibold transform hover:scale-110 transition-all duration-300 shadow-xl"
          >
            <Leaf className="h-5 w-5 mr-2" />
            @jsj.labgrowndiamonds
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {labGrownImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer transform hover:scale-110 hover:rotate-3 transition-all duration-500 animate-fade-in shadow-xl hover:shadow-2xl"
              style={{animationDelay: `${index * 0.2}s`}}
              onClick={() => window.open('https://www.instagram.com/jsj.labgrowndiamonds/', '_blank')}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/60 via-transparent to-[#0D0C29]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-6 w-6 text-white" />
                  <Instagram className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 text-xs font-semibold rounded opacity-90">
                Lab Grown
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 animate-fade-in" style={{animationDelay: '1s'}}>
          <Button
            variant="outline"
            onClick={() => window.open('https://www.instagram.com/jsj.labgrowndiamonds/', '_blank')}
            className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transform hover:scale-110 transition-all duration-300 shadow-lg"
          >
            View More Lab Grown Jewelry
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LabGrownInstagramGallery;
