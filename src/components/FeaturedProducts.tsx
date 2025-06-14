
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
  const [featuredProduct, setFeaturedProduct] = useState(null);
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

        // Convert to array
        const productsArray = Array.from(groupedProducts.values());
        
        // Set featured product (first one) and remaining products
        if (productsArray.length > 0) {
          setFeaturedProduct(productsArray[0]);
          setProducts(productsArray.slice(1, 6)); // Show remaining 5 products
        }
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

  if (!featuredProduct && products.length === 0) {
    return null;
  }

  return (
    <>
      <section className="px-6 py-16 bg-white">
        {/* Featured Collection - Mobile Hero Style */}
        {featuredProduct && (
          <div className="mb-16">
            <h3 className="text-3xl font-semibold text-center mb-10 text-black">Featured Collection</h3>
            
            {/* Mobile Featured Product */}
            <div className="block md:hidden">
              <div 
                className="featured-collection-mobile"
                style={{
                  backgroundImage: `url(${featuredProduct.images[0]?.url})`
                }}
              >
                <div className="featured-collection-overlay">
                  <h4 className="featured-collection-title">{featuredProduct.name}</h4>
                  <p className="featured-collection-price">{featuredProduct.price}</p>
                </div>
              </div>
            </div>

            {/* Desktop Featured Product */}
            <div className="hidden md:block max-w-6xl mx-auto">
              <Card className="border rounded-2xl shadow-sm hover:shadow-md transition group bg-white">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="relative">
                      <img
                        src={featuredProduct.images[0]?.url}
                        alt={featuredProduct.name}
                        className="w-full h-80 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      {featuredProduct.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                          1/{featuredProduct.images.length}
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-2xl font-semibold text-black">{featuredProduct.name}</h4>
                      <p className="text-gray-600">{featuredProduct.description}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-black font-bold text-2xl">{featuredProduct.price}</p>
                        {featuredProduct.originalPrice && (
                          <p className="text-gray-500 line-through text-lg">{featuredProduct.originalPrice}</p>
                        )}
                      </div>
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => handleViewDetails(featuredProduct)} 
                          variant="outline" 
                          className="flex-1"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button 
                          onClick={() => handleAddToCart(featuredProduct)} 
                          className="flex-1 bg-black hover:bg-gray-800 text-white"
                        >
                          <ShoppingBag className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const productId = parseInt(featuredProduct.id);
                            if (isInWishlist(productId)) {
                              removeFromWishlist(productId);
                            } else {
                              addToWishlist({
                                id: productId,
                                name: featuredProduct.name,
                                price: featuredProduct.price,
                                originalPrice: featuredProduct.originalPrice || featuredProduct.price,
                                image: featuredProduct.images[0]?.url
                              });
                            }
                          }}
                        >
                          <Heart className={`h-5 w-5 ${isInWishlist(parseInt(featuredProduct.id)) ? 'fill-black text-black' : 'text-gray-600'}`} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Regular Products Grid */}
        {products.length > 0 && (
          <div>
            <h3 className="text-3xl font-semibold text-center mb-10 text-black">Shop Now</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.map((product) => (
                <Card key={product.id} className="border rounded-2xl shadow-sm hover:shadow-md transition group bg-white">
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={product.images[0]?.url}
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
                        <Heart className={`h-4 w-4 ${isInWishlist(parseInt(product.id)) ? 'fill-black text-black' : 'text-gray-600'}`} />
                      </Button>
                      
                      {/* Image counter for multi-angle products */}
                      {product.images.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                          1/{product.images.length}
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
                    
                    <div className="space-y-2">
                      <Button 
                        onClick={() => handleViewDetails(product)} 
                        variant="outline" 
                        className="w-full"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        onClick={() => handleAddToCart(product)} 
                        className="w-full bg-black hover:bg-gray-800 text-white"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
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
