
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const FeaturedProducts = () => {
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: 'Diamond Solitaire Ring',
      price: '₹45,999',
      originalPrice: '₹52,999',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Gold Chain Necklace',
      price: '₹28,999',
      originalPrice: '₹35,999',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
      badge: 'New'
    },
    {
      id: 3,
      name: 'Pearl Drop Earrings',
      price: '₹15,999',
      originalPrice: '₹19,999',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
      badge: 'Sale'
    },
    {
      id: 4,
      name: 'Tennis Bracelet',
      price: '₹38,999',
      originalPrice: '₹45,999',
      rating: 4.6,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop',
      badge: 'Limited'
    }
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-yellow-100 to-[#1F1E39]/10 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-up">
          <h2 className="text-4xl font-bold text-[#1F1E39] mb-4 animate-bounce">
            Featured Products
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: '0.5s'}}>
            Discover our most popular and exclusive jewelry pieces
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card 
              key={product.id}
              className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-4 hover:rotate-1 animate-fade-in border-2 border-transparent hover:border-[#1F1E39]"
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <div className="bg-gradient-to-br from-yellow-100 to-[#1F1E39]/20 h-64 flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-transform duration-700 animate-fade-in"
                    />
                  </div>
                  <div className="absolute top-4 left-4 animate-bounce">
                    <span className="bg-gradient-to-r from-[#1F1E39] to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      {product.badge}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-yellow-100 text-gray-600 hover:text-red-500 transform hover:scale-125 transition-all duration-300 animate-pulse"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-6 bg-gradient-to-b from-white to-yellow-50">
                  <h3 className="font-bold text-[#1F1E39] mb-2 group-hover:text-yellow-600 transition-colors duration-300 transform group-hover:scale-105">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current animate-pulse' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-[#1F1E39] animate-pulse">{product.price}</span>
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

        <div className="text-center mt-12 animate-fade-in" style={{animationDelay: '1s'}}>
          <Button 
            variant="outline"
            size="lg"
            className="border-2 border-[#1F1E39] text-[#1F1E39] hover:bg-[#1F1E39] hover:text-white transform hover:scale-110 transition-all duration-300 shadow-lg"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
