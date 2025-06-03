
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type ImageLocation = 
  | 'home' 
  | 'featured' 
  | 'categories' 
  | 'lab-grown' 
  | 'rings' 
  | 'necklaces' 
  | 'earrings' 
  | 'bracelets' 
  | 'shop-now'
  | 'latest-collection'
  | 'best-sellers'
  | 'featured-collection';

interface UploadedImagesProps {
  location: ImageLocation;
  title?: string;
}

interface ImageData {
  id: string;
  file_path: string;
  original_name: string;
  display_location: string;
}

const UploadedImages: React.FC<UploadedImagesProps> = ({ location, title }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log('Fetching images for location:', location);
        
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('display_location', location)
          .order('uploaded_at', { ascending: false });

        if (error) {
          console.error('Error fetching images:', error);
          return;
        }

        console.log('Fetched images:', data);
        setImages(data || []);
      } catch (error) {
        console.error('Error in fetchImages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [location]);

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading images...</div>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            {title}
          </h2>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div key={image.id} className="group cursor-pointer">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={image.file_path}
                  alt={image.original_name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600 truncate">{image.original_name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UploadedImages;
