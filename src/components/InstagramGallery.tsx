
import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InstagramGallery = () => {
  // Sample jewelry images (in a real implementation, you'd fetch these from Instagram API)
  const jewelryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop',
      alt: 'Diamond Ring'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
      alt: 'Gold Necklace'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop',
      alt: 'Pearl Earrings'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop',
      alt: 'Diamond Bracelet'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop',
      alt: 'Wedding Ring Set'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop',
      alt: 'Emerald Necklace'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Instagram className="h-8 w-8 text-pink-500" />
            <h2 className="text-4xl font-bold text-[#1F1E39]">
              Follow Us on Instagram
            </h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            See our latest jewelry creations and customer stories
          </p>
          <Button
            onClick={() => window.open('https://www.instagram.com/jaspreetsinghjewelry/', '_blank')}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 font-semibold"
          >
            <Instagram className="h-5 w-5 mr-2" />
            @jaspreetsinghjewelry
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {jewelryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://www.instagram.com/jaspreetsinghjewelry/', '_blank')}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <Instagram className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => window.open('https://www.instagram.com/jaspreetsinghjewelry/', '_blank')}
            className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
          >
            View More on Instagram
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
