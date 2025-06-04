
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Trash2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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

  const handleFileSelect = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateImageSlot(index, 'file', file);
      // Auto-generate description from filename if empty
      if (!productImages[index].description) {
        updateImageSlot(index, 'description', file.name.split('.')[0]);
      }
    }
  };

  const uploadProductGroup = async () => {
    // Validation
    const validImages = productImages.filter(img => img.file !== null);
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

    // Generate a single product group ID for all images
    const productGroupId = crypto.randomUUID();

    for (const imageData of validImages) {
      try {
        const file = imageData.file!;

        // Validate file
        if (!file.type.startsWith('image/')) {
          errorCount++;
          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          errorCount++;
          continue;
        }

        // Generate filename
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const timestamp = Date.now();
        const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        // Upload to storage
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

        // Save to database with the same product_group
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
          // Clean up uploaded file
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
        title: "Product Created",
        description: `Product "${productName}" created with ${successCount} images${errorCount > 0 ? `, ${errorCount} failed` : ''}`
      });
      
      // Reset form
      setProductImages([{ file: null, description: '', price: '0' }]);
      setProductName('');
      
      // Reset file inputs
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

  // Count images that have files selected
  const selectedImageCount = productImages.filter(img => img.file !== null).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Bulk Upload for Product Group
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="productName">Product Name</Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="mt-2"
            />
          </div>

          {/* Display Location */}
          <div>
            <Label htmlFor="displayLocation">Collection Category</Label>
            <Select value={displayLocation} onValueChange={setDisplayLocation}>
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
              >
                <Plus className="h-4 w-4" />
                Add Image
              </Button>
            </div>

            {productImages.map((imageData, index) => (
              <Card key={index} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <Label>Image File</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileSelect(index, e)}
                      disabled={uploading}
                      className="mt-1"
                    />
                    {imageData.file && (
                      <div className="mt-1 text-sm text-green-600">
                        ✓ {imageData.file.name}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={imageData.description}
                      onChange={(e) => updateImageSlot(index, 'description', e.target.value)}
                      placeholder="Image description"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Price (₹)</Label>
                    <Input
                      type="number"
                      value={imageData.price}
                      onChange={(e) => updateImageSlot(index, 'price', e.target.value)}
                      placeholder="0"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    {productImages.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeImageSlot(index)}
                        disabled={uploading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button 
            onClick={uploadProductGroup}
            disabled={uploading || !productName.trim() || selectedImageCount === 0}
            className="w-full"
          >
            {uploading ? 'Creating Product...' : `Create Product Group with ${selectedImageCount} Images`}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BulkProductUpload;
