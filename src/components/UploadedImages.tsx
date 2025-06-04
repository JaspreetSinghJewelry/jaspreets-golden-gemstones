
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import ProductDetailModal from './ProductDetailModal';

type ImageLocation = 
  | 'rings' 
  | 'necklaces' 
  | 'earrings' 
  | 'bracelets' 
  | 'lab-grown-diamonds'
  | 'best-sellers'
  | 'featured-collection';

interface UploadedImagesProps {
  location: ImageLocation;
  title?: string;
}

interface ProductGroup {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  category: string;
  images: Array<{
    id: string;
    url: string;
    description?: string;
  }>;
}

const UploadedImages: React.FC<UploadedImagesProps> = ({ location, title }) => {
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductGroup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('Fetching images for location:', location);
        
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('display_location', location)
          .eq('is_active', true)
          .order('product_group')
          .order('sort_order', { ascending: true });

        if (error) {
          console.error('Error fetching images:', error);
          return;
        }

        console.log('Fetched images:', data);
        
        // Group images by product_group
        const groupedProducts = new Map<string, ProductGroup>();

        data?.forEach((item) => {
          const groupId = item.product_group;
          const imageUrl = supabase.storage.from('images').getPublicUrl(item.file_path).data.publicUrl;
          
          if (!groupedProducts.has(groupId)) {
            groupedProducts.set(groupId, {
              id: parseInt(groupId.replace(/-/g, '').substring(0, 8), 16).toString(),
              name: item.description || item.original_name || 'Jewelry Piece',
              description: item.description || 'Elegant handcrafted design with premium materials',
              price: item.price ? `₹${item.price.toLocaleString()}` : 'Price on request',
              originalPrice: item.price ? `₹${(item.price * 1.2).toLocaleString()}` : undefined,
              category: location,
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
        console.error('Error in fetchImages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [location]);

  const handleProductClick = (product: ProductGroup) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading products...</div>
        </div>
      </div>
    );
  }

  // Don't render anything if there are no products
  if (productGroups.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              {title}
            </h2>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productGroups.map((product) => (
              <div 
                key={product.id} 
                className="group cursor-pointer bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                onClick={() => handleProductClick(product)}
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-200 mb-3">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  {/* Image count indicator */}
                  {product.images.length > 1 && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      +{product.images.length - 1}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-xs text-blue-600 font-medium">Click to view details</p>
                </div>
              </div>
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

export default UploadedImages;
