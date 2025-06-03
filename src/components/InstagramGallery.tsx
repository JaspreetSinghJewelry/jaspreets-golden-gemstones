
import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InstagramGallery = () => {
  // Sample jewelry images (in a real implementation, you'd fetch these from Instagram API)
  const jewelryImages = [
    {
      id: 1,
      src: 'https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images//Screenshot%202025-06-02%20at%2011.42.03%20AM.png',
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
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-[#1F1E39]/30 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-up">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Instagram className="h-4 w-2 text-[#1F1E39]" />
            <h2 className="text-4xl font-bold text-[#1F1E39]">
              Follow Us on Instagram
            </h2>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6 animate-fade-in" style={{animationDelay: '0.5s'}}>
            See our latest jewelry creations and customer stories
          </p>
          <Button
            onClick={() => window.open('https://www.instagram.com/jaspreetsinghjewelry/', '_blank')}
            className="bg-gradient-to-r from-[#1F1E39] to-black text-white hover:from-[#2A2857] hover:to-gray-800 font-semibold transform hover:scale-110 transition-all duration-300 shadow-xl"
          >
            <Instagram className="h-5 w-5 mr-2" />
            @jaspreetsinghjewelry
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {jewelryImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer transform hover:scale-110 hover:rotate-3 transition-all duration-500 animate-fade-in shadow-xl hover:shadow-2xl"
              style={{animationDelay: `${index * 0.2}s`}}
              onClick={() => window.open('https://www.instagram.com/jaspreetsinghjewelry/', '_blank')}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F1E39]/60 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <Instagram className="h-8 w-8 text-white" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 animate-fade-in" style={{animationDelay: '1s'}}>
          <Button
            variant="outline"
            onClick={() => window.open('https://www.instagram.com/jaspreetsinghjewelry/', '_blank')}
            className="border-2 border-[#1F1E39] text-[#1F1E39] hover:bg-[#1F1E39] hover:text-white transform hover:scale-110 transition-all duration-300 shadow-lg"
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
