
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
  validateUploadData, 
  uploadProductGroup,
  type ProductImageUpload
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
    console.log('=== Upload Button Clicked ===');
    console.log('Product name:', productName);
    console.log('Product images:', productImages);
    console.log('Display location:', displayLocation);
    
    const validation = validateUploadData(productImages, productName);
    
    if (!validation.isValid) {
      console.error('Validation failed:', validation.errorMessage);
      toast({
        title: "Validation Error",
        description: validation.errorMessage,
        variant: "destructive"
      });
      return;
    }

    console.log('Validation passed, starting bulk upload...');
    setUploading(true);
    
    try {
      const result = await uploadProductGroup(productImages, productName, displayLocation);
      console.log('Bulk upload completed with result:', result);

      if (result.successCount > 0) {
        const successMessage = result.successCount === 1 
          ? `Product "${productName}" created successfully with 1 image`
          : `Product "${productName}" created successfully with ${result.successCount} images grouped together`;
        
        if (result.errorCount > 0) {
          console.log('Partial success:', successMessage, 'with', result.errorCount, 'failed');
          toast({
            title: "Product Created with Some Errors",
            description: `${successMessage}. ${result.errorCount} images failed to upload.`
          });
        } else {
          console.log('Complete success:', successMessage);
          toast({
            title: "Product Created Successfully!",
            description: successMessage
          });
        }
        
        // Reset form
        setProductImages([{ file: null, description: '', price: '0' }]);
        setProductName('');
        
        // Clear file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
        fileInputs.forEach(input => input.value = '');
      } else {
        // Show detailed error information
        const errorDetails = result.errors && result.errors.length > 0 
          ? result.errors.join('; ') 
          : "Unknown error occurred";
        
        console.error('Upload failed completely:', errorDetails);
        
        toast({
          title: "Upload Failed",
          description: `No images were uploaded successfully. Errors: ${errorDetails}`,
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Unexpected upload error:', error);
      toast({
        title: "Upload Error",
        description: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  // Auto-upload when conditions are met
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
  const selectedImageCount = productImages.filter(img => img.file !== null).length;
  const hasProductName = productName.trim().length > 0;
  const firstImage = productImages[0];
  const hasValidPrice = firstImage?.price && Number(firstImage.price) > 0;
  const canUpload = hasProductName && selectedImageCount > 0 && hasValidPrice && !uploading;

  console.log('Render state:', {
    productName: productName.trim(),
    hasProductName,
    selectedImageCount,
    hasValidPrice,
    canUpload,
    uploading,
    autoUpload
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
              <Label>Product Images (Multiple angles of the same product)</Label>
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

            <div className="text-sm text-gray-600 mb-4 bg-blue-50 p-3 rounded-lg">
              <p>📸 <strong>Bulk Upload Guide:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Image 1:</strong> Main thumbnail image (required with price)</li>
                <li><strong>Image 2+:</strong> Additional angles of the same product</li>
                <li><strong>ALL images will be grouped together as ONE PRODUCT</strong></li>
                <li>Product name applies to all images in the group</li>
                <li>Only the first image needs a price (applies to whole product)</li>
              </ul>
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
              className={`w-full ${canUpload ? 'bg-primary hover:bg-primary/90 text-white' : 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed text-gray-600'}`}
              size="lg"
            >
              {uploading ? 'Creating Product Group...' : `Create Product Group with ${selectedImageCount} Images`}
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
