
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface UploadedImage {
  id: string;
  filename: string;
  original_name: string | null;
  file_path: string;
  description: string | null;
  price: number | null;
  display_location: string | null;
  is_active: boolean | null;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  originalPrice: string;
  image: string;
  isUploaded?: boolean;
}

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  useEffect(() => {
    fetchUploadedImages();
  }, []);

  const fetchUploadedImages = async () => {
    try {
      // Only fetch images specifically designated for the "best-sellers" section
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('is_active', true)
        .eq('display_location', 'best-sellers')
        .order('sort_order', { ascending: true })
        .order('uploaded_at', { ascending: false })
        .limit(3);

      if (error) {
        console.error('Error fetching uploaded images:', error);
      } else {
        setUploadedImages(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getImageUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const products: Product[] = [
    {
      id: 1,
      name: 'Radiant Gold Ring',
      description: '18K gold, minimalist design',
      price: '₹14,999',
      originalPrice: '₹19,999',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Luna Diamond Necklace',
      description: 'Sterling silver with center stone',
      price: '₹24,999',
      originalPrice: '₹29,999',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Pearl Drop Earrings',
      description: 'Freshwater pearls with gold accents',
      price: '₹9,999',
      originalPrice: '₹12,999',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop'
    }
  ];

  // Convert uploaded images to product format
  const uploadedProducts: Product[] = uploadedImages.map((image) => ({
    id: parseInt(image.id.replace(/-/g, '').substring(0, 8), 16),
    name: image.description || image.original_name || 'Beautiful Jewelry',
    description: image.description || 'Handcrafted with care',
    price: image.price ? `₹${image.price.toLocaleString()}` : 'Price on request',
    originalPrice: image.price ? `₹${(image.price * 1.2).toLocaleString()}` : '',
    image: getImageUrl(image.file_path),
    isUploaded: true
  }));

  // Only show uploaded products if they exist, otherwise fallback to default products
  const allProducts = uploadedProducts.length > 0 ? uploadedProducts.slice(0, 3) : products.slice(0, 3);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image
    });
  };

  const handleWishlistToggle = (product: Product) => {
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
    <section className="px-6 py-16 bg-white">
      <h3 className="text-3xl font-semibold text-center mb-10 text-black">Best Sellers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {allProducts.map((product) => (
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
                  onClick={() => handleWishlistToggle(product)}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-black text-black' : 'text-gray-600'}`} />
                </Button>
                {product.isUploaded && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    New
                  </div>
                )}
              </div>
              <h4 className="text-lg font-medium mb-1 text-black">{product.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <p className="text-black font-semibold text-lg">{product.price}</p>
                {product.originalPrice && (
                  <p className="text-gray-500 line-through text-sm">{product.originalPrice}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-black hover:bg-gray-800 text-white"
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
