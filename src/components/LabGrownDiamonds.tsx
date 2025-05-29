import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, ExternalLink } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { FancyText } from '@/components/ui/fancy-text';
import ScrollAnimation from './ScrollAnimation';

const LabGrownDiamonds = () => {
  const products = [
    {
      id: 201,
      name: 'Lab Grown Diamond Stud Earrings',
      price: '₹79,999',
      originalPrice: '₹89,999',
      rating: 4.9,
      reviews: 62,
      image: 'https://images.unsplash.com/photo-1634097524053-a1949dd19748?w=400&h=300&fit=crop'
    },
    {
      id: 202,
      name: 'Lab Grown Diamond Tennis Bracelet',
      price: '₹129,999',
      originalPrice: '₹149,999',
      rating: 4.8,
      reviews: 48,
      image: 'https://images.unsplash.com/photo-1630483338884-99cc9b43952c?w=400&h=300&fit=crop'
    },
    {
      id: 203,
      name: 'Lab Grown Diamond Pendant Necklace',
      price: '₹99,999',
      originalPrice: '₹119,999',
      rating: 4.7,
      reviews: 75,
      image: 'https://images.unsplash.com/photo-1626325049992-6c9455c930e3?w=400&h=300&fit=crop'
    },
    {
      id: 204,
      name: 'Lab Grown Diamond Engagement Ring',
      price: '₹149,999',
      originalPrice: '₹169,999',
      rating: 4.9,
      reviews: 55,
      image: 'https://images.unsplash.com/photo-1622542495494-e93c08aa455a?w=400&h=300&fit=crop'
    }
  ];

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image
    });
  };

  const handleToggleWishlist = (product: typeof products[0]) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-[#0D0C29] via-[#1F1E39] to-[#2A2857]">
      <div className="container mx-auto px-4">
        <ScrollAnimation animation="fade-in" className="text-center mb-12">
          <FancyText variant="gradient" size="xl" className="text-4xl font-bold text-white mb-4">
            Lab Grown Diamonds
          </FancyText>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Discover our stunning collection of ethically sourced lab grown diamonds. 
            Same brilliance, beauty, and quality as mined diamonds, but with a smaller environmental footprint.
          </p>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-4"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <div className="bg-gradient-to-br from-yellow-100 to-[#1F1E39]/20 h-64 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleToggleWishlist(product)}
                    className={`absolute top-4 right-4 bg-white/80 hover:bg-yellow-100 transition-all duration-300 ${
                      isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
                
                <div className="p-6 bg-gradient-to-b from-white to-yellow-50">
                  <h3 className="font-bold text-[#1F1E39] mb-2 group-hover:text-yellow-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-[#1F1E39]">{product.price}</span>
                      <span className="text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-gradient-to-r from-[#1F1E39] to-yellow-500 text-white hover:from-[#2A2857] hover:to-yellow-600 font-semibold shadow-lg"
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ScrollAnimation animation="slide-in-up">
          <div className="text-center">
            <FancyText variant="gradient" size="lg" className="text-3xl font-bold text-white mb-4">
              Follow us on Instagram
            </FancyText>
            <p className="text-white/80 text-xl mb-8">
              Tag <ExternalLink className="inline-block align-middle w-5 h-5 mr-1" /> @JaspreetSinghJewelry to be featured!
            </p>
            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#1F1E39] hover:from-yellow-500 hover:to-yellow-700 font-semibold">
                Visit Instagram
              </Button>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default LabGrownDiamonds;
