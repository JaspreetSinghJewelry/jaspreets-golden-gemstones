
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ImageUploadSlot from './ImageUploadSlot';
import AutoUploadToggle from './AutoUploadToggle';
import ProductFormFields from './ProductFormFields';
import UploadStatusDisplay from './UploadStatusDisplay';
import { 
  ProductImageUpload, 
  validateUploadData, 
  uploadProductGroup 
} from '@/utils/uploadUtils';

const BulkProductUpload = () => {
  const [productImages, setProductImages] = useState<ProductImageUpload[]>([
    { file: null, description: '', price: '0' }
  ]);
  const [productName, setProductName] = useState('');
  const [displayLocation, setDisplayLocation] = useState('rings');
  const [uploading, setUploading] = useState(false);
  const [autoUpload, setAutoUpload] = useState(false);

  const addImageSlot = () => {
    setProductImages([...productImages, { file: null, description: '', price: '0' }]);
  };

  const removeImageSlot = (index: number) => {
    if (productImages.length > 1) {
      setProductImages(productImages.filter((_, i) => i !== index));
    }
  };

  const updateImageSlot = useCallback((index: number, field: keyof ProductImageUpload, value: string | File) => {
    setProductImages(prevImages => {
      const updated = [...prevImages];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleUploadProductGroup = async () => {
    const validation = validateUploadData(productImages, productName);
    
    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.errorMessage,
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    try {
      const result = await uploadProductGroup(productImages, productName, displayLocation);

      if (result.successCount > 0) {
        toast({
          title: "Product Created Successfully!",
          description: `Product "${productName}" created with ${result.successCount} images${result.errorCount > 0 ? `, ${result.errorCount} failed` : ''}`
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
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Error",
        description: "An error occurred while uploading",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  // Auto-upload when conditions are met (only if autoUpload is enabled)
  useEffect(() => {
    if (!autoUpload || uploading) return;

    const firstImage = productImages[0];
    const hasValidFirstImage = firstImage?.file && 
                               productName.trim() && 
                               firstImage.price && 
                               Number(firstImage.price) > 0;
    
    if (hasValidFirstImage) {
      console.log('Auto-upload conditions met, triggering upload...');
      const timer = setTimeout(() => {
        handleUploadProductGroup();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [productImages, productName, autoUpload, uploading]);

  // Calculate validation state
  const selectedImageCount = productImages.filter(img => img.file !== null && img.file !== undefined).length;
  const hasProductName = productName.trim().length > 0;
  const canUpload = hasProductName && selectedImageCount > 0 && !uploading;

  console.log('BulkProductUpload validation state:', {
    productName: productName.trim(),
    hasProductName,
    selectedImageCount,
    canUpload,
    uploading,
    autoUpload,
    productImagesDebug: productImages.map((img, index) => ({ 
      index, 
      hasFile: !!img.file, 
      fileName: img.file?.name || 'no file',
      description: img.description, 
      price: img.price 
    }))
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Bulk Product Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <AutoUploadToggle
            autoUpload={autoUpload}
            onToggle={setAutoUpload}
            disabled={uploading}
          />

          <ProductFormFields
            productName={productName}
            displayLocation={displayLocation}
            onProductNameChange={setProductName}
            onDisplayLocationChange={setDisplayLocation}
            disabled={uploading}
          />

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

          {!autoUpload && (
            <Button
              onClick={handleUploadProductGroup}
              disabled={!canUpload}
              className={`w-full ${canUpload ? 'bg-primary hover:bg-primary/90' : 'bg-gray-400 cursor-not-allowed'}`}
              size="lg"
            >
              {uploading ? 'Uploading...' : `Create Product Group with ${selectedImageCount} Images`}
            </Button>
          )}

          <UploadStatusDisplay
            uploading={uploading}
            autoUpload={autoUpload}
            selectedImageCount={selectedImageCount}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkProductUpload;
