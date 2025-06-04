import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { supabase } from '@/integrations/supabase/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSort from "@/components/FilterSort";

const Products = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('is_active', true)
          .not('price', 'is', null)
          .order('uploaded_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
        } else {
          const transformedProducts = data.map((item) => ({
            id: parseInt(item.id.replace(/-/g, '').substring(0, 8), 16),
            name: item.description || item.original_name || 'Jewelry Piece',
            description: item.description || 'Elegant handcrafted design',
            price: item.price ? `₹${item.price.toLocaleString()}` : 'Price on request',
            originalPrice: item.price ? `₹${(item.price * 1.2).toLocaleString()}` : '',
            category: item.display_location,
            image: supabase.storage.from('images').getPublicUrl(item.file_path).data.publicUrl,
            rawPrice: item.price || 0
          }));
          
          setProducts(transformedProducts);
          setFilteredProducts(transformedProducts);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...products];

    // Filter by jewelry type (category)
    if (filters.jewelryType && filters.jewelryType.length > 0) {
      filtered = filtered.filter(product => {
        const categoryMap = {
          'Rings': 'rings',
          'Necklaces': 'necklaces',
          'Earrings': 'earrings',
          'Bracelets': 'bracelets'
        };
        return filters.jewelryType.some(type => categoryMap[type] === product.category);
      });
    }

    setFilteredProducts(filtered);
  };

  const handleSortChange = (sortOption) => {
    let sorted = [...filteredProducts];

    switch (sortOption) {
      case 'price-low':
        sorted.sort((a, b) => a.rawPrice - b.rawPrice);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.rawPrice - a.rawPrice);
        break;
      case 'newest':
        // Already sorted by uploaded_at desc from the query
        break;
      case 'popular':
        // For now, keep original order
        break;
      case 'rating':
        // For now, keep original order
        break;
      default:
        break;
    }

    setFilteredProducts(sorted);
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            All Products
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover our complete collection of exquisite jewelry pieces, crafted with precision and elegance.
          </p>
        </div>
        
        <div className="container mx-auto px-4">
          <FilterSort 
            onFiltersChange={handleFiltersChange}
            onSortChange={handleSortChange}
          />
        </div>
        
        <section className="px-6 py-16 bg-white">
          {loading ? (
            <div className="text-center py-8">Loading products...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {filteredProducts.map((product) => (
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
                    <div className="mb-2">
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {getCategoryLabel(product.category)}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium mb-1 text-black">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <p className="text-black font-semibold text-lg">{product.price}</p>
                      {product.originalPrice && (
                        <p className="text-gray-500 line-through text-sm">{product.originalPrice}</p>
                      )}
                    </div>
                    <Button onClick={() => addToCart(product)} className="w-full bg-black hover:bg-gray-800 text-white">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UploadedImages from "@/components/UploadedImages";

const Shop Now = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
         
          </p>
        </div>
        <UploadedImages location="Products" />
      </main>
      <Footer />
    </div>
  );
};

export default Products;
