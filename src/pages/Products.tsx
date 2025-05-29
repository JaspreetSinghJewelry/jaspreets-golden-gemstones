
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';
import { useWishlist } from '@/contexts/WishlistContext';

const Products = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const allProducts = [
    {
      id: 1,
      name: 'Diamond Solitaire Ring',
      price: '₹45,999',
      originalPrice: '₹52,999',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
      category: 'rings'
    },
    {
      id: 2,
      name: 'Gold Chain Necklace',
      price: '₹28,999',
      originalPrice: '₹35,999',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
      category: 'necklaces'
    },
    {
      id: 3,
      name: 'Pearl Drop Earrings',
      price: '₹15,999',
      originalPrice: '₹19,999',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
      category: 'earrings'
    },
    {
      id: 4,
      name: 'Tennis Bracelet',
      price: '₹38,999',
      originalPrice: '₹45,999',
      rating: 4.6,
      reviews: 78,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop',
      category: 'bracelets'
    },
    {
      id: 5,
      name: 'Emerald Engagement Ring',
      price: '₹65,999',
      originalPrice: '₹75,999',
      rating: 4.9,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
      category: 'rings'
    },
    {
      id: 6,
      name: 'Silver Pendant Necklace',
      price: '₹12,999',
      originalPrice: '₹16,999',
      rating: 4.5,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
      category: 'necklaces'
    },
    {
      id: 7,
      name: 'Diamond Stud Earrings',
      price: '₹22,999',
      originalPrice: '₹28,999',
      rating: 4.8,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
      category: 'earrings'
    },
    {
      id: 8,
      name: 'Gold Charm Bracelet',
      price: '₹31,999',
      originalPrice: '₹38,999',
      rating: 4.7,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop',
      category: 'bracelets'
    }
  ];

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image
    });
  };

  const handleToggleWishlist = (product: typeof allProducts[0]) => {
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
    <div className="min-h-screen bg-[#0D0C29] py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 text-white hover:text-yellow-400"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <FancyText variant="gradient" size="xl" className="text-4xl font-bold text-white">
            All Products
          </FancyText>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search for rings, necklaces, earrings, bracelets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
      </div>
    </div>
  );
};

export default Products;
