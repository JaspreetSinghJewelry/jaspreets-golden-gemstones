
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const LabGrownDiamonds = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const labGrownProducts = [
    {
      id: 101,
      name: 'Lab Grown Diamond Solitaire',
      price: '₹35,999',
      originalPrice: '₹42,999',
      rating: 4.9,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
      category: 'lab-grown'
    },
    {
      id: 102,
      name: 'Eco-Friendly Diamond Earrings',
      price: '₹18,999',
      originalPrice: '₹23,999',
      rating: 4.8,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
      category: 'lab-grown'
    },
    {
      id: 103,
      name: 'Sustainable Diamond Necklace',
      price: '₹25,999',
      originalPrice: '₹31,999',
      rating: 4.7,
      reviews: 98,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
      category: 'lab-grown'
    },
    {
      id: 104,
      name: 'Lab Created Diamond Ring',
      price: '₹42,999',
      originalPrice: '₹49,999',
      rating: 4.9,
      reviews: 76,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
      category: 'lab-grown'
    }
  ];

  const handleAddToCart = (product: typeof labGrownProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
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
        originalPrice: product.originalPrice,
        image: product.image
      });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#0D0C29]/5 to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold text-[#0D0C29] mb-6">
            Lab Grown Diamonds & Jewellery
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-black to-[#0D0C29] mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover our exquisite collection of ethically sourced lab-grown diamonds - 
            beautiful, sustainable, and identical to mined diamonds
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {labGrownProducts.map((product, index) => (
            <Card 
              key={product.id}
              className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-4 animate-fade-in"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <div className="bg-gradient-to-br from-gray-100 to-[#0D0C29]/20 h-64 flex items-center justify-center overflow-hidden">
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
                    className={`absolute top-4 right-4 bg-white/80 hover:bg-gray-100 transition-all duration-300 ${
                      isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <div className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 text-xs font-semibold rounded">
                    Lab Grown
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                  <h3 className="font-bold text-[#0D0C29] mb-2 group-hover:text-black transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-black fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-[#0D0C29]">{product.price}</span>
                      <span className="text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-black text-white hover:bg-gray-800 font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            className="bg-black text-white hover:bg-gray-800 font-bold px-8 py-3 text-lg shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            View All Lab Grown Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LabGrownDiamonds;
