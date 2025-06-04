
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import ImageUploadSlot from './ImageUploadSlot';

interface ProductImageUpload {
  file: File | null;
  description: string;
  price: string;
}

const BulkProductUpload = () => {
  const [productImages, setProductImages] = useState<ProductImageUpload[]>([
    { file: null, description: '', price: '0' }
  ]);
  const [productName, setProductName] = useState('');
  const [displayLocation, setDisplayLocation] = useState('rings');
  const [uploading, setUploading] = useState(false);

  const addImageSlot = () => {
    setProductImages([...productImages, { file: null, description: '', price: '0' }]);
  };

  const removeImageSlot = (index: number) => {
    if (productImages.length > 1) {
      setProductImages(productImages.filter((_, i) => i !== index));
    }
  };

  const updateImageSlot = (index: number, field: keyof ProductImageUpload, value: string | File) => {
    const updated = [...productImages];
    updated[index] = { ...updated[index], [field]: value };
    setProductImages(updated);
  };

  // Auto-upload when conditions are met
  useEffect(() => {
    const firstImage = productImages[0];
    const hasValidFirstImage = firstImage.file && 
                               productName.trim() && 
                               firstImage.price && 
                               Number(firstImage.price) > 0;
    
    if (hasValidFirstImage && !uploading) {
      const timer = setTimeout(() => {
        uploadProductGroup();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [productImages, productName]);

  const uploadProductGroup = async () => {
    // Validation
    const validImages = productImages.filter(img => img.file);
    if (validImages.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select at least one image file",
        variant: "destructive"
      });
      return;
    }

    if (!productName.trim()) {
      toast({
        title: "Product Name Required",
        description: "Please enter a product name",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    let successCount = 0;
    let errorCount = 0;

    const productGroupId = crypto.randomUUID();

    for (const imageData of validImages) {
      try {
        const file = imageData.file!;

        if (!file.type.startsWith('image/')) {
          errorCount++;
          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          errorCount++;
          continue;
        }

        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const timestamp = Date.now();
        const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          errorCount++;
          continue;
        }

        const { error: dbError } = await supabase
          .from('images')
          .insert({
            filename: fileName,
            original_name: file.name,
            file_path: fileName,
            file_size: file.size,
            mime_type: file.type,
            display_location: displayLocation,
            description: imageData.description.trim() || productName,
            price: Number(imageData.price),
            is_active: true,
            sort_order: successCount,
            product_group: productGroupId
          });

        if (dbError) {
          await supabase.storage.from('images').remove([fileName]);
          errorCount++;
          continue;
        }

        successCount++;
      } catch (error) {
        errorCount++;
      }
    }

    setUploading(false);

    if (successCount > 0) {
      toast({
        title: "Product Created Successfully!",
        description: `Product "${productName}" created with ${successCount} images${errorCount > 0 ? `, ${errorCount} failed` : ''}`
      });
      
      setProductImages([{ file: null, description: '', price: '0' }]);
      setProductName('');
      
      const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
      fileInputs.forEach(input => input.value = '');
    } else {
      toast({
        title: "Upload Failed",
        description: "No images were uploaded successfully",
        variant: "destructive"
      });
    }
  };

  const selectedImageCount = productImages.filter(img => img.file !== null && img.file !== undefined).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Quick Product Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="productName">Product Name *</Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="mt-2"
              disabled={uploading}
            />
          </div>

          {/* Display Location */}
          <div>
            <Label htmlFor="displayLocation">Collection Category</Label>
            <Select value={displayLocation} onValueChange={setDisplayLocation} disabled={uploading}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rings">Rings</SelectItem>
                <SelectItem value="necklaces">Necklaces</SelectItem>
                <SelectItem value="earrings">Earrings</SelectItem>
                <SelectItem value="bracelets">Bracelets</SelectItem>
                <SelectItem value="lab-grown-diamonds">Lab Grown Diamonds</SelectItem>
                <SelectItem value="best-sellers">Best Sellers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload Slots */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Product Images</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addImageSlot}
                className="flex items-center gap-2"
                disabled={uploading}
              >
                <Plus className="h-4 w-4" />
                Add More Images
              </Button>
            </div>

            {productImages.map((imageData, index) => (
              <ImageUploadSlot
                key={index}
                imageData={imageData}
                index={index}
                onUpdate={updateImageSlot}
                onRemove={removeImageSlot}
                canRemove={productImages.length > 1}
                disabled={uploading}
              />
            ))}
          </div>

          {uploading && (
            <div className="text-center py-4">
              <div className="text-lg font-medium text-blue-600">
                Creating Product Group with {selectedImageCount} Images...
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Please wait while we upload your images
              </div>
            </div>
          )}

          {!uploading && (
            <div className="text-center py-2">
              <div className="text-sm text-gray-600">
                Fill in product name, upload first image, and set price to auto-create product group
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkProductUpload;
