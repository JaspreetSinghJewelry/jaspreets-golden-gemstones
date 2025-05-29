
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Diamond Solitaire Ring',
      price: '₹45,999',
      originalPrice: '₹52,999',
      rating: 4.8,
      reviews: 124,
      image: '💍',
      badge: 'Bestseller'
    },
    {
      id: 2,
      name: 'Gold Chain Necklace',
      price: '₹28,999',
      originalPrice: '₹35,999',
      rating: 4.9,
      reviews: 89,
      image: '📿',
      badge: 'New'
    },
    {
      id: 3,
      name: 'Pearl Drop Earrings',
      price: '₹15,999',
      originalPrice: '₹19,999',
      rating: 4.7,
      reviews: 156,
      image: '👂',
      badge: 'Sale'
    },
    {
      id: 4,
      name: 'Tennis Bracelet',
      price: '₹38,999',
      originalPrice: '₹45,999',
      rating: 4.6,
      reviews: 78,
      image: '⌚',
      badge: 'Limited'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1F1E39] mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and exclusive jewelry pieces
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card 
              key={product.id}
              className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#1F1E39] px-3 py-1 rounded-full text-xs font-bold">
                      {product.badge}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-gray-600 hover:text-red-500"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-[#1F1E39] mb-2 group-hover:text-yellow-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
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
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#1F1E39] hover:from-yellow-500 hover:to-yellow-700 font-semibold"
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
            variant="outline"
            size="lg"
            className="border-[#1F1E39] text-[#1F1E39] hover:bg-[#1F1E39] hover:text-white"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
