
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
      name: 'Gemstone Statement Earrings',
      image: '/lovable-uploads/6906fdcc-2913-4e7a-9f80-ea8a32a9d009.png',
      price: '₹68,999'
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
      name: 'Diamond Solitaire Ring',
      image: '/lovable-uploads/93d8089d-ea97-407c-bcef-9175a04024b9.png',
      price: '₹45,999'
    }
  ];

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="px-4 py-8 bg-white">
      <h3 className="text-2xl font-semibold text-center mb-8 text-black">Featured Collection</h3>
      <div className="max-w-full mx-auto">
        <Carousel 
          setApi={setApi}
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4">
                <div className="relative w-full">
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4">
                      <h4 className="text-lg font-semibold text-white mb-1">{product.name}</h4>
                      <p className="text-base text-white font-medium">{product.price}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex -left-4" />
          <CarouselNext className="hidden sm:flex -right-4" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;
