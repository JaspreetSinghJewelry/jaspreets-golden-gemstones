
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';
import { useWishlist } from '@/contexts/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Bracelets = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const bracelets = [
    {
      id: 15,
      name: 'Diamond Tennis Bracelet',
      price: '₹85,999',
      originalPrice: '₹99,999',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    },
    {
      id: 16,
      name: 'Gold Chain Bracelet',
      price: '₹32,999',
      originalPrice: '₹42,999',
      rating: 4.7,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    },
    {
      id: 17,
      name: 'Silver Charm Bracelet',
      price: '₹18,999',
      originalPrice: '₹25,999',
      rating: 4.6,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    },
    {
      id: 18,
      name: 'Emerald Link Bracelet',
      price: '₹65,999',
      originalPrice: '₹78,999',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    },
    {
      id: 19,
      name: 'Pearl Strand Bracelet',
      price: '₹22,999',
      originalPrice: '₹29,999',
      rating: 4.5,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    },
    {
      id: 20,
      name: 'Rose Gold Bangle',
      price: '₹28,999',
      originalPrice: '₹36,999',
      rating: 4.7,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop'
    }
  ];

  const handleAddToCart = (product: typeof bracelets[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image
    });
  };

  const handleToggleWishlist = (product: typeof bracelets[0]) => {
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
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4 text-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <FancyText variant="gradient" size="xl" className="text-4xl font-bold text-gray-800">
              Bracelets Collection
            </FancyText>
            <p className="text-gray-600 mt-2">Stunning bracelets for every style and occasion</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bracelets.map((product) => (
              <Card 
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-4"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <div className="bg-gradient-to-br to-gray-50 h-64 flex items-center justify-center overflow-hidden">
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
                      className={`absolute top-4 right-4 bg-white/80 transition-all duration-300 ${
                        isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-b from-white">
                    <h3 className="font-bold text-gray-800 mb-2 transition-colors duration-300">
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
                        <span className="text-2xl font-bold text-gray-800">{product.price}</span>
                        <span className="text-gray-500 line-through ml-2">{product.originalPrice}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-black text-white hover:bg-gray-800 font-semibold shadow-lg"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bracelets;
