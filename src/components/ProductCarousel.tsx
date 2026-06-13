import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { supabase } from '@/integrations/supabase/client';

interface FeaturedItem {
  id: string | number;
  name: string;
  image: string;
}

const FALLBACK_PRODUCTS: FeaturedItem[] = [
  {
    id: 1,
    name: 'Diamond Solitaire Ring',
    image: '/lovable-uploads/6906fdcc-2913-4e7a-9f80-ea8a32a9d009.png',
  },
  {
    id: 2,
    name: 'Blue Sapphire Necklace Set',
    image: '/lovable-uploads/821c3725-fc1c-4677-9e42-d062bd3ebf3e.png',
  },
  {
    id: 4,
    name: 'Gemstone Statement Earrings',
    image: '/lovable-uploads/93d8089d-ea97-407c-bcef-9175a04024b9.png',
  },
];

const ProductCarousel = () => {
  const [api, setApi] = useState(null);
  const [products, setProducts] = useState<FeaturedItem[]>(FALLBACK_PRODUCTS);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('display_location', 'featured-collection')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        const items: FeaturedItem[] = data.map((row: any) => ({
          id: row.id,
          name: row.description || row.original_name || 'Featured Piece',
          image: `https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/${row.file_path}`,
        }));
        setProducts(items);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16 bg-white" style={{ contain: 'layout style' }}>
      <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-6 sm:mb-8 md:mb-10 text-black">Featured Collection</h3>
      <div className="max-w-4xl mx-auto" style={{ contain: 'layout' }}>
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {products.map((product, idx) => (
              <CarouselItem key={product.id}>
                <div className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden rounded-xl mx-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : "low"}
                    width={880}
                    height={500}
                    decoding={idx === 0 ? "sync" : "async"}
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
