
// src/components/DisplayCategoryProducts.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { supabase } from '@/integrations/supabase/client';

const DisplayCategoryProducts = () => {
  const { category } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('is_active', true)
        .eq('display_location', category?.replace(/-/g, ' '))
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(
          data.map((item) => ({
            id: parseInt(item.id.replace(/-/g, '').substring(0, 8), 16),
            name: item.description || item.original_name || 'Jewelry Piece',
            description: item.description || 'Elegant handcrafted design',
            price: item.price ? `₹${item.price.toLocaleString()}` : 'Price on request',
            originalPrice: item.price ? `₹${(item.price * 1.2).toLocaleString()}` : '',
            image: supabase.storage.from('images').getPublicUrl(item.file_path).data.publicUrl
          }))
        );
      }
    };

    if (category) {
      fetchCategoryProducts();
    }
  }, [category]);

  return (
    <section className="px-6 py-16 bg-white">
      <h3 className="text-3xl font-semibold text-center mb-10 text-black capitalize">
        {category?.replace(/-/g, ' ')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <Card key={product.id} className="border rounded-2xl shadow-sm hover:shadow-md transition group bg-white">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => {
                    isInWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product);
                  }}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-black text-black' : 'text-gray-600'}`} />
                </Button>
              </div>
              <h4 className="text-lg font-medium mb-1 text-black">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-black font-semibold text-lg">{product.price}</p>
                {product.originalPrice && (
                  <p className="text-gray-500 line-through text-sm">{product.originalPrice}</p>
                )}
              </div>
              <Button onClick={() => addToCart(product)} className="flex-1 bg-black hover:bg-gray-800 text-white">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default DisplayCategoryProducts;
