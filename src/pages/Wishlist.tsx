
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { FancyText } from '@/components/ui/fancy-text';
import { useWishlist } from '@/contexts/WishlistContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Wishlist = () => {
  const { addToCart } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  console.log('Wishlist page - Current wishlist items:', wishlistItems);

  const handleAddToCart = (product: typeof wishlistItems[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image
    });
  };

  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-[#0D0C29] py-8 min-h-[80vh]">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4 text-white hover:text-gray-400"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <FancyText variant="gradient" size="xl" className="text-4xl font-bold text-white">
              My Wishlist
            </FancyText>
            <p className="text-gray-300 mt-2">Items you've saved for later ({wishlistItems.length} items)</p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center text-white py-16">
              <Heart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-2xl font-bold mb-2">Your wishlist is empty</h3>
              <p className="text-gray-300 mb-6">Start adding items you love to your wishlist</p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-black text-white hover:bg-gray-800 font-semibold"
              >
                Shop Now
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((product) => (
                <Card 
                  key={product.id}
                  className="group hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-4"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <div className="bg-gradient-to-br from-gray-100 to-[#1F1E39]/20 h-64 flex items-center justify-center overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="absolute top-4 right-4 bg-white/80 hover:bg-red-100 transition-all duration-300 text-red-500 hover:text-red-600"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                    </div>
                    
                    <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                      <h3 className="font-bold text-[#1F1E39] mb-2 group-hover:text-black transition-colors duration-300">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold text-[#1F1E39]">{product.price}</span>
                          <span className="text-gray-500 line-through ml-2">{product.originalPrice}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-black text-white hover:bg-gray-800 font-semibold shadow-lg"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
