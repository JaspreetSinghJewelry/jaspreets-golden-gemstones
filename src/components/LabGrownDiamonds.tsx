
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const LabGrownDiamonds = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [api, setApi] = useState(null);

  const labGrownProducts = [
    {
      id: 101,
      name: 'Lab Grown Diamond Solitaire',
      price: '₹35,999',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
    },
    {
      id: 102,
      name: 'Eco-Friendly Diamond Earrings',
      price: '₹18,999',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
    },
    {
      id: 103,
      name: 'Sustainable Diamond Necklace',
      price: '₹25,999',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
    },
    {
      id: 104,
      name: 'Lab Created Diamond Ring',
      price: '₹42,999',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
    }
  ];

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 2000);

    return () => clearInterval(interval);
  }, [api]);

  const handleAddToCart = (product: typeof labGrownProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleToggleWishlist = (product: typeof labGrownProducts[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  const handleViewAllCollection = () => {
    navigate('/lab-grown-diamonds');
  };

  return (
    <section className="px-6 py-16 bg-white">
      <h3 className="text-3xl font-semibold text-center mb-10 text-black">Lab Grown Diamonds & Jewellery</h3>
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
            {labGrownProducts.map((product) => (
              <CarouselItem key={product.id}>
                <div className="relative h-96 overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                    onClick={() => handleToggleWishlist(product)}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-black text-black' : 'text-gray-600'}`} />
                  </Button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <h4 className="text-xl font-bold text-white mb-2">{product.name}</h4>
                    <p className="text-lg text-white mb-4">{product.price}</p>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="text-center mt-8">
        <Button 
          onClick={handleViewAllCollection}
          className="bg-black text-white hover:bg-gray-800 font-semibold px-8 py-3"
        >
          View All Lab Grown Collection
        </Button>
      </div>
    </section>
  );
};

export default LabGrownDiamonds;
