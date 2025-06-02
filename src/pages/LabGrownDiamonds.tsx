
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';

const LabGrownDiamonds = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const products = [
    {
      id: 101,
      name: 'Lab Grown Diamond Solitaire Ring',
      price: '₹35,999',
      originalPrice: '₹42,999',
      rating: 4.9,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
      badge: 'Eco-Friendly'
    },
    {
      id: 102,
      name: 'Lab Grown Diamond Stud Earrings',
      price: '₹25,999',
      originalPrice: '₹32,999',
      rating: 4.8,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
      badge: 'Popular'
    },
    {
      id: 103,
      name: 'Lab Grown Diamond Tennis Bracelet',
      price: '₹48,999',
      originalPrice: '₹55,999',
      rating: 4.7,
      reviews: 64,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop',
      badge: 'Premium'
    },
    {
      id: 104,
      name: 'Lab Grown Diamond Pendant',
      price: '₹18,999',
      originalPrice: '₹24,999',
      rating: 4.6,
      reviews: 115,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
      badge: 'Bestseller'
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

  const handleToggleWishlist = (product: typeof products[0]) => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-gradient-to-b from-[#0D0C29]/5 to-gray-50 py-8 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <ScrollAnimation animation="fade-in">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="mb-4 text-[#0D0C29] hover:text-yellow-400"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <FancyText variant="gradient" size="xl" className="text-4xl font-bold text-[#0D0C29]">
                Lab Grown Diamonds
              </FancyText>
              <p className="text-gray-700 mt-2">Sustainable and ethically sourced diamonds</p>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ScrollAnimation 
                key={product.id} 
                animation="slide-in-up" 
                delay={index * 200}
              >
                <Card 
                  className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-4 border-2 border-transparent hover:border-[#0D0C29]"
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
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          {product.badge}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleToggleWishlist(product)}
                        className={`absolute top-4 right-4 bg-white/80 hover:bg-gray-100 transition-all duration-300 transform hover:scale-125 ${
                          isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </Button>
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
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LabGrownDiamonds;
