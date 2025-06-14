
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { supabase } from '@/integrations/supabase/client';
import ProductDetailModal from './ProductDetailModal';

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      // Fetch products from all collections (excluding best-sellers)
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .eq('is_active', true)
        .in('display_location', ['rings', 'necklaces', 'earrings', 'bracelets', 'lab-grown-diamonds'])
        .order('uploaded_at', { ascending: false })
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching featured products:', error);
      } else {
        // Group images by product_group to create multi-angle products
        const groupedProducts = new Map();
        
        data.forEach((item) => {
          const groupId = item.product_group || item.id;
          const imageUrl = supabase.storage.from('images').getPublicUrl(item.file_path).data.publicUrl;
          
          if (!groupedProducts.has(groupId)) {
            groupedProducts.set(groupId, {
              id: parseInt(groupId.replace(/-/g, '').substring(0, 8), 16).toString(),
              name: item.description || item.original_name || 'Jewelry Piece',
              description: item.description || 'Elegant handcrafted design',
              price: item.price ? `₹${item.price.toLocaleString()}` : 'Price on request',
              originalPrice: item.price ? `₹${(item.price * 1.2).toLocaleString()}` : '',
              category: item.display_location,
              images: []
            });
          }

          const productGroup = groupedProducts.get(groupId);
          productGroup.images.push({
            id: item.id,
            url: imageUrl,
            description: item.description || undefined
          });
        });

        // Convert to array and limit to 6 products
        const productsArray = Array.from(groupedProducts.values()).slice(0, 6);
        setProducts(productsArray);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log('Adding product to cart:', product);
    addToCart({
      id: parseInt(product.id),
      name: product.name,
      price: product.price,
      image: product.images[0]?.url
    });
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <>
      <section className="mobile-section bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-semibold text-center mobile-center text-black">Shop Now</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {products.map((product) => (
              <Card key={product.id} className="mobile-card border rounded-2xl shadow-sm hover:shadow-md transition group bg-white">
                <CardContent className="card-content">
                  <div className="relative mb-4">
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full h-64 lg:h-72 object-cover rounded-xl"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-sm touch-target"
                      onClick={() => {
                        const productId = parseInt(product.id);
                        if (isInWishlist(productId)) {
                          removeFromWishlist(productId);
                        } else {
                          addToWishlist({
                            id: productId,
                            name: product.name,
                            price: product.price,
                            originalPrice: product.originalPrice || product.price,
                            image: product.images[0]?.url
                          });
                        }
                      }}
                    >
                      <Heart className={`h-5 w-5 ${isInWishlist(parseInt(product.id)) ? 'fill-black text-black' : 'text-gray-600'}`} />
                    </Button>
                    
                    {/* Image counter for multi-angle products */}
                    {product.images.length > 1 && (
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-medium">
                        1/{product.images.length}
                      </div>
                    )}
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-lg lg:text-xl font-semibold text-black leading-tight">{product.name}</h4>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-black font-bold text-lg lg:text-xl">{product.price}</p>
                      {product.originalPrice && (
                        <p className="text-gray-500 line-through text-sm">{product.originalPrice}</p>
                      )}
                    </div>
                    
                    <div className="space-y-3 pt-2">
                      <Button 
                        onClick={() => handleViewDetails(product)} 
                        variant="outline" 
                        className="w-full mobile-button touch-target border-2 hover:bg-gray-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        onClick={() => handleAddToCart(product)} 
                        className="w-full mobile-button bg-black hover:bg-gray-800 text-white touch-target"
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
        </div>
      </section>

      <ProductDetailModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default FeaturedProducts;
