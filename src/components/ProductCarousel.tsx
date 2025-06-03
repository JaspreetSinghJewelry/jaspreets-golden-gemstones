
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
      name: 'Gold Chain Necklace',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop',
      price: '₹28,999'
    },
    {
      id: 3,
      name: 'Pearl Drop Earrings',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=600&fit=crop',
      price: '₹15,999'
    },
    {
      id: 4,
      name: 'Tennis Bracelet',
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=600&fit=crop',
      price: '₹38,999'
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
    <section className="px-6 py-16 bg-white">
      <h3 className="text-3xl font-semibold text-center mb-10 text-black">Featured Collection</h3>
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
                <div className="relative h-96 overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h4 className="text-xl font-bold text-white mb-2">{product.name}</h4>
                    <p className="text-lg text-white">{product.price}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ProductCarousel;
