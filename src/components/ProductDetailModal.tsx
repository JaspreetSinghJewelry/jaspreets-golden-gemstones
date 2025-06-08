import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, X, Camera } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import VirtualTryOn from './VirtualTryOn';

interface ProductImage {
  id: string;
  url: string;
  description?: string;
}

interface ProductDetail {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  category: string;
  images: ProductImage[];
}

interface ProductDetailModalProps {
  product: ProductDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  if (!product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      image: product.images[currentImageIndex]?.url || product.images[0]?.url
    };
    addToCart(cartItem);
  };

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      image: product.images[currentImageIndex]?.url || product.images[0]?.url
    };

    if (isInWishlist(parseInt(product.id))) {
      removeFromWishlist(parseInt(product.id));
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'rings': return 'Rings';
      case 'necklaces': return 'Necklaces';
      case 'earrings': return 'Earrings';
      case 'bracelets': return 'Bracelets';
      case 'lab-grown-diamonds': return 'Lab Grown Diamonds';
      default: return category || 'Other';
    }
  };

  const handleTryOn = () => {
    setIsTryOnOpen(true);
  };

  const handleCloseTryOn = () => {
    setIsTryOnOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.images[currentImageIndex]?.url}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
                
                {/* Navigation arrows - only show if multiple images */}
                {product.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Image counter */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail images */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={`${product.name} thumbnail ${index + 1}`}
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

            {/* Product Details Section */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {getCategoryLabel(product.category)}
                </Badge>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && (
                  <p className="text-sm text-green-600 font-medium">
                    You save {((parseFloat(product.originalPrice.replace('₹', '').replace(',', '')) - parseFloat(product.price.replace('₹', '').replace(',', ''))) / parseFloat(product.originalPrice.replace('₹', '').replace(',', '')) * 100).toFixed(0)}%
                  </p>
                )}
              </div>

              {/* Image Description */}
              {product.images[currentImageIndex]?.description && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-1">Current Image:</h4>
                  <p className="text-sm text-gray-600">{product.images[currentImageIndex].description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={handleAddToCart} 
                    className="bg-black hover:bg-gray-800 text-white py-3"
                    size="lg"
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  
                  <Button
                    onClick={handleTryOn}
                    variant="outline"
                    className="py-3"
                    size="lg"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Try On
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  onClick={handleWishlistToggle}
                  className="w-full py-3"
                  size="lg"
                >
                  <Heart className={`h-5 w-5 mr-2 ${isInWishlist(parseInt(product.id)) ? 'fill-black text-black' : 'text-gray-600'}`} />
                  {isInWishlist(parseInt(product.id)) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </Button>
              </div>

              {/* Product Features */}
              <div className="border-t pt-4 space-y-2">
                <h4 className="font-medium text-gray-900">Product Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Premium quality materials</li>
                  <li>• Handcrafted with precision</li>
                  <li>• Comes with authenticity certificate</li>
                  <li>• Free shipping and returns</li>
                </ul>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <VirtualTryOn
        isOpen={isTryOnOpen}
        onClose={handleCloseTryOn}
        productImage={product.images[currentImageIndex]?.url}
        productName={product.name}
        productCategory={product.category}
      />
    </>
  );
};

export default ProductDetailModal;
