
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const ProductCarousel = () => {
  const [api, setApi] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Diamond Solitaire Ring',
      image: '/lovable-uploads/6906fdcc-2913-4e7a-9f80-ea8a32a9d009.png',
      price: '₹45,999'
    },
    {
      id: 2,
      name: 'Blue Sapphire Necklace Set',
      image: '/lovable-uploads/821c3725-fc1c-4677-9e42-d062bd3ebf3e.png',
      price: '₹85,999'
    },
    {
      id: 3,
      name: 'Designer Gold Bracelet',
      image: '/lovable-uploads/63f590ef-6210-44a1-9538-a1cd4df03d0f.png',
      price: '₹52,999'
    },
    {
      id: 4,
      name: 'Gemstone Statement Earrings',
      image: '/lovable-uploads/93d8089d-ea97-407c-bcef-9175a04024b9.png',
      price: '₹68,999'
    }
  ];

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16 bg-white">
      <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-6 sm:mb-8 md:mb-10 text-black">Featured Collection</h3>
      <div className="max-w-4xl mx-auto">
        <Carousel 
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id}>
                <div className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden rounded-xl mx-2">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onLoad={(e) => (e.target as HTMLImageElement).style.opacity = '1'}
                    style={{opacity: '0', transition: 'opacity 0.3s ease'}}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 sm:p-6">
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{product.name}</h4>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;
