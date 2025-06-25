
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiAngleProduct from '@/components/MultiAngleProduct';

interface ProductGroup {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  images: Array<{
    id: string;
    url: string;
    description?: string;
  }>;
}

const Products = () => {
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('is_active', true)
          .in('display_location', ['rings', 'necklaces', 'earrings', 'bracelets', 'lab-grown-diamonds'])
          .order('product_group')
          .order('sort_order', { ascending: true });

        if (error) {
          console.error('Error fetching products:', error);
          return;
        }

        // Group images by product_group
        const groupedProducts = new Map<string, ProductGroup>();

        data.forEach((item) => {
          const groupId = item.product_group;
          // Fix the image URL construction
          const imageUrl = `https://bxscivdpwersyohpaamn.supabase.co/storage/v1/object/public/images/${item.file_path}`;
          
          if (!groupedProducts.has(groupId)) {
            groupedProducts.set(groupId, {
              id: parseInt(groupId.replace(/-/g, '').substring(0, 8), 16).toString(),
              name: item.description || item.original_name || 'Jewelry Piece',
              description: item.description || 'Elegant handcrafted design',
              price: item.price ? `₹${item.price.toLocaleString()}` : 'Price on request',
              originalPrice: item.price ? `₹${(item.price * 1.2).toLocaleString()}` : '',
              images: []
            });
          }

          const productGroup = groupedProducts.get(groupId)!;
          productGroup.images.push({
            id: item.id,
            url: imageUrl,
            description: item.description || undefined
          });
        });

        setProductGroups(Array.from(groupedProducts.values()));
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">Loading products...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
            All Products
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore our complete collection of exquisite jewelry, crafted with precision and elegance.
          </p>
        </div>
        
        <section className="px-6 py-16 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {productGroups.map((product) => (
              <MultiAngleProduct key={product.id} product={product} />
            ))}
          </div>
          
          {productGroups.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No products found.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
