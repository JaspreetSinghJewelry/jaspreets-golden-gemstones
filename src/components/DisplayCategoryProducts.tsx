
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiAngleProduct from "@/components/MultiAngleProduct";

interface ProductImage {
  id: string;
  filename: string;
  original_name: string | null;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  uploaded_at: string;
  display_location: string | null;
  description: string | null;
  price: number | null;
  is_active: boolean | null;
  sort_order: number | null;
  product_group: string | null;
}

interface GroupedProduct {
  productGroup: ProductImage[];
  productId: number;
  productName: string;
  productDescription: string;
  price: string;
  originalPrice?: string;
}

const DisplayCategoryProducts = () => {
  const { category } = useParams();
  const [groupedProducts, setGroupedProducts] = useState<GroupedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('is_active', true)
          .eq('display_location', category?.replace(/-/g, '-'))
          .order('uploaded_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          setGroupedProducts([]);
          return;
        }

        // Group products by product_group
        const grouped: { [key: string]: ProductImage[] } = {};
        
        data.forEach((item: ProductImage) => {
          const groupKey = item.product_group || item.id;
          if (!grouped[groupKey]) {
            grouped[groupKey] = [];
          }
          grouped[groupKey].push(item);
        });

        // Sort images within each group by sort_order
        Object.keys(grouped).forEach(key => {
          grouped[key].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        });

        // Convert to GroupedProduct format
        const productsArray: GroupedProduct[] = Object.entries(grouped).map(([groupKey, images]) => {
          const mainProduct = images[0];
          return {
            productGroup: images,
            productId: parseInt(mainProduct.id.replace(/-/g, '').substring(0, 8), 16),
            productName: mainProduct.description || mainProduct.original_name || 'Jewelry Piece',
            productDescription: mainProduct.description || 'Elegant handcrafted design',
            price: mainProduct.price ? `₹${mainProduct.price.toLocaleString()}` : 'Price on request',
            originalPrice: mainProduct.price ? `₹${(mainProduct.price * 1.2).toLocaleString()}` : undefined
          };
        });

        setGroupedProducts(productsArray);
      } catch (error) {
        console.error('Error:', error);
        setGroupedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryProducts();
    }
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading products...</div>
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
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 capitalize">
            {category?.replace(/-/g, ' ')} Collection
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover our exquisite collection of {category?.replace(/-/g, ' ')}, crafted with precision and elegance.
          </p>
        </div>
        
        <section className="px-6 py-16 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {groupedProducts.map((product, index) => (
              <MultiAngleProduct
                key={`${product.productId}-${index}`}
                productGroup={product.productGroup}
                productId={product.productId}
                productName={product.productName}
                productDescription={product.productDescription}
                price={product.price}
                originalPrice={product.originalPrice}
              />
            ))}
          </div>
          
          {groupedProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No products found for this category.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DisplayCategoryProducts;
