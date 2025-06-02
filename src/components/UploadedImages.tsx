
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
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

interface UploadedImagesProps {
  location: 'home' | 'featured' | 'categories' | 'lab-grown';
  title?: string;
  className?: string;
}

const UploadedImages: React.FC<UploadedImagesProps> = ({ 
  location, 
  title = "Our Latest Collection", 
  className = "" 
}) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchImages();
  }, [location]);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('display_location', location)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Error fetching images:', error);
      } else {
        setImages(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleAddToCart = (image: UploadedImage) => {
    addToCart({
      id: parseInt(image.id.replace(/-/g, '').substring(0, 8), 16), // Convert UUID to number
      name: image.description || image.original_name || 'Jewelry Item',
      price: image.price ? `₹${image.price.toLocaleString()}` : '₹0',
      originalPrice: image.price ? `₹${(image.price * 1.2).toLocaleString()}` : '₹0',
      image: getImageUrl(image.file_path)
    });
  };

  const handleWishlistToggle = (image: UploadedImage) => {
    const productId = parseInt(image.id.replace(/-/g, '').substring(0, 8), 16);
    
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist({
        id: productId,
        name: image.description || image.original_name || 'Jewelry Item',
        price: image.price ? `₹${image.price.toLocaleString()}` : '₹0',
        originalPrice: image.price ? `₹${(image.price * 1.2).toLocaleString()}` : '₹0',
        image: getImageUrl(image.file_path)
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  if (images.length === 0) {
    return null; // Don't render anything if no images
  }

  return (
    <section className={`px-6 py-16 bg-white ${className}`}>
      <h3 className="text-3xl font-semibold text-center mb-10 text-black">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {images.map((image) => {
          const productId = parseInt(image.id.replace(/-/g, '').substring(0, 8), 16);
          
          return (
            <Card key={image.id} className="border rounded-2xl shadow-sm hover:shadow-md transition group bg-white">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src={getImageUrl(image.file_path)} 
                    alt={image.description || image.original_name || 'Jewelry item'} 
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => handleWishlistToggle(image)}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(productId) ? 'fill-black text-black' : 'text-gray-600'}`} />
                  </Button>
                </div>
                <h4 className="text-lg font-medium mb-1 text-black">
                  {image.description || image.original_name || 'Beautiful Jewelry'}
                </h4>
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-black font-semibold text-lg">
                    {image.price ? `₹${image.price.toLocaleString()}` : 'Price on request'}
                  </p>
                  {image.price && (
                    <p className="text-gray-500 line-through text-sm">
                      ₹{(image.price * 1.2).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddToCart(image)}
                    className="flex-1 bg-black hover:bg-gray-800 text-white"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default UploadedImages;
