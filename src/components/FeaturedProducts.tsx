
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: 'Radiant Gold Ring',
      description: '18K gold, minimalist design',
      price: 149,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Luna Diamond Necklace',
      description: 'Sterling silver with center stone',
      price: 249,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Pearl Drop Earrings',
      description: 'Freshwater pearls with gold accents',
      price: 99,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop'
    }
  ];

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  const handleWishlistToggle = (product: any) => {
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

  return (
    <section className="px-6 py-16 bg-white">
      <h3 className="text-3xl font-semibold text-center mb-10 text-gray-800">Best Sellers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <Card key={product.id} className="border rounded-2xl shadow-sm hover:shadow-md transition group">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => handleWishlistToggle(product)}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-rose-600 text-rose-600' : 'text-gray-600'}`} />
                </Button>
              </div>
              <h4 className="text-lg font-medium mb-1">{product.name}</h4>
              <p className="text-sm text-gray-500 mb-2">{product.description}</p>
              <p className="text-rose-600 font-semibold text-lg mb-4">${product.price}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
