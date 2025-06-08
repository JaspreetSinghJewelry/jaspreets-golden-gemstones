
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, Eye, Camera } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductDetailModal from './ProductDetailModal';
import VirtualTryOn from './VirtualTryOn';

interface ProductImage {
  id: string;
  url: string;
  description?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  images: ProductImage[];
  category?: string;
}

interface MultiAngleProductProps {
  product: Product;
}

const MultiAngleProduct = ({ product }: MultiAngleProductProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const currentImage = product.images[currentImageIndex];

  const handleAddToCart = () => {
    const cartItem = {
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      image: currentImage.url
    };
    addToCart(cartItem);
  };

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      image: currentImage.url
    };

    if (isInWishlist(parseInt(product.id))) {
      removeFromWishlist(parseInt(product.id));
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTryOn = () => {
    setIsTryOnOpen(true);
  };

  const handleCloseTryOn = () => {
    setIsTryOnOpen(false);
  };

  // Convert product to the format expected by ProductDetailModal
  const productDetailFormat = {
    ...product,
    category: product.category || 'jewelry'
  };

  return (
    <>
      <Card className="border rounded-2xl shadow-sm hover:shadow-md transition group bg-white">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={currentImage.url}
                alt={product.name}
                className="w-full h-64 object-cover cursor-pointer"
                onClick={nextImage}
                onError={(e) => {
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
              
              {/* Navigation arrows - only show if multiple images */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              {/* Image counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                  {currentImageIndex + 1}/{product.images.length}
                </div>
              )}

              {/* Click hint */}
              {product.images.length > 1 && (
                <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to browse
                </div>
              )}
            </div>

            {/* Wishlist button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(parseInt(product.id)) ? 'fill-black text-black' : 'text-gray-600'}`} />
            </Button>
          </div>

          {/* Thumbnail images */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name} angle ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          <h4 className="text-lg font-medium mb-1 text-black">{product.name}</h4>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-2 mb-4">
            <p className="text-black font-semibold text-lg">{product.price}</p>
            {product.originalPrice && (
              <p className="text-gray-500 line-through text-sm">{product.originalPrice}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleViewDetails} variant="outline" className="text-xs">
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Button>
              <Button onClick={handleTryOn} variant="outline" className="text-xs">
                <Camera className="h-3 w-3 mr-1" />
                Try On
              </Button>
            </div>
            <Button onClick={handleAddToCart} className="w-full bg-black hover:bg-gray-800 text-white">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>

      <ProductDetailModal 
        product={productDetailFormat}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <VirtualTryOn
        isOpen={isTryOnOpen}
        onClose={handleCloseTryOn}
        productImage={currentImage.url}
        productName={product.name}
        productCategory={product.category}
      />
    </>
  );
};

export default MultiAngleProduct;
