
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { supabase } from '@/integrations/supabase/client';

interface ProductImage {
  id: string;
  file_path: string;
  description?: string;
  original_name?: string;
}

interface MultiAngleProductProps {
  productGroup: ProductImage[];
  productId: number;
  productName: string;
  productDescription: string;
  price: string;
  originalPrice?: string;
}

const MultiAngleProduct = ({ 
  productGroup, 
  productId, 
  productName, 
  productDescription, 
  price, 
  originalPrice 
}: MultiAngleProductProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const getImageUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productGroup.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productGroup.length) % productGroup.length);
  };

  const handleImageClick = () => {
    if (productGroup.length > 1) {
      nextImage();
    }
  };

  const currentImage = productGroup[currentImageIndex];
  const mainImageUrl = getImageUrl(currentImage.file_path);

  const product = {
    id: productId,
    name: productName,
    description: productDescription,
    price: price,
    originalPrice: originalPrice,
    image: mainImageUrl
  };

  return (
    <Card className="border rounded-2xl shadow-sm hover:shadow-md transition group bg-white">
      <CardContent className="p-4">
        <div className="relative mb-4">
          <div className="aspect-square overflow-hidden rounded-lg relative">
            <img
              src={mainImageUrl}
              alt={productName}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                productGroup.length > 1 ? 'cursor-pointer' : ''
              }`}
              onClick={handleImageClick}
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
            
            {/* Navigation arrows for multiple images */}
            {productGroup.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md transition-opacity opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 shadow-md transition-opacity opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
              </>
            )}

            {/* Image counter */}
            {productGroup.length > 1 && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                {currentImageIndex + 1} / {productGroup.length}
              </div>
            )}

            {/* Click hint for mobile */}
            {productGroup.length > 1 && (
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Click to browse
              </div>
            )}
          </div>

          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
            onClick={() => {
              isInWishlist(productId)
                ? removeFromWishlist(productId)
                : addToWishlist(product);
            }}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(productId) ? 'fill-black text-black' : 'text-gray-600'}`} />
          </Button>

          {/* Thumbnail images */}
          {productGroup.length > 1 && (
            <div className="flex gap-1 mt-2 overflow-x-auto">
              {productGroup.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-12 h-12 rounded border-2 overflow-hidden transition-all ${
                    index === currentImageIndex 
                      ? 'border-black' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={getImageUrl(image.file_path)}
                    alt={`${productName} angle ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <h4 className="text-lg font-medium mb-1 text-black">{productName}</h4>
        <p className="text-sm text-gray-600 mb-2">{productDescription}</p>
        <div className="flex items-center gap-2 mb-4">
          <p className="text-black font-semibold text-lg">{price}</p>
          {originalPrice && (
            <p className="text-gray-500 line-through text-sm">{originalPrice}</p>
          )}
        </div>
        <Button 
          onClick={() => addToCart(product)} 
          className="w-full bg-black hover:bg-gray-800 text-white"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default MultiAngleProduct;
