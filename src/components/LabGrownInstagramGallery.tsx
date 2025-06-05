
import React from 'react';
import { Instagram, ExternalLink, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LabGrownInstagramGallery = () => {
  // Updated lab grown images with your uploaded photos (same photos for consistency)
 const labGrownImages = [
  {
    id: 1,
    src: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/insta%201%20lab.png',
    alt: 'Lab Grown Diamond Jewelry'
  },
  {
    id: 2,
    src: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/insta%202%20lab%20(1).png',
    alt: 'Sustainable Gold Earrings'
  },
  {
    id: 3,
    src: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/insta%203%20lab.png',
    alt: 'Eco-Friendly Necklace'
  },
  {
    id: 4,
    src: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/insta%204%20lab.png',
    alt: 'Lab Created Diamond Ring'
  }
];


  return (
    <section className="py-8 bg-gradient-to-br from-green-50 to-[#0D0C29]/30 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 animate-slide-in-up">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Leaf className="h-6 w-6 text-green-600" />
            <Instagram className="h-6 w-6 text-[#0D0C29]" />
            <h2 className="text-2xl md:text-3xl font-bold text-[#0D0C29]">
              Lab Grown Collection
            </h2>
          </div>
          <p className="text-lg text-gray-700 max-w-xl mx-auto mb-4 animate-fade-in" style={{animationDelay: '0.5s'}}>
            Sustainable jewelry and eco-friendly diamonds
          </p>
          <Button
            onClick={() => window.open('https://www.instagram.com/jsj.labgrowndiamonds/', '_blank')}
            className="bg-gradient-to-r from-green-600 to-[#0D0C29] text-white hover:from-green-700 hover:to-[#2A2857] font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg text-sm"
          >
            <Leaf className="h-4 w-4 mr-2" />
            @jsj.labgrowndiamonds
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3 max-w-md mx-auto">
          {labGrownImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300 animate-fade-in shadow-md hover:shadow-lg"
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => window.open('https://www.instagram.com/jsj.labgrowndiamonds/', '_blank')}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/50 via-transparent to-[#0D0C29]/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                <div className="flex items-center space-x-1">
                  <Leaf className="h-5 w-5 text-white" />
                  <Instagram className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="absolute top-1 right-1 bg-green-600 text-white px-1 py-0.5 text-xs font-semibold rounded opacity-90">
                Lab Grown
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 animate-fade-in" style={{animationDelay: '0.8s'}}>
          <Button
            variant="outline"
            onClick={() => window.open('https://www.instagram.com/jsj.labgrowndiamonds/', '_blank')}
            className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transform hover:scale-105 transition-all duration-300 shadow-md text-sm"
          >
            View More Lab Grown Jewelry
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LabGrownInstagramGallery;
