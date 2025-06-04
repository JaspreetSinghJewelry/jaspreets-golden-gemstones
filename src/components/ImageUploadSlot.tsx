
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Star } from 'lucide-react';

interface ProductImageUpload {
  file: File | null;
  description: string;
  price: string;
}

interface ImageUploadSlotProps {
  imageData: ProductImageUpload;
  index: number;
  onUpdate: (index: number, field: keyof ProductImageUpload, value: string | File) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
  disabled: boolean;
}

const ImageUploadSlot: React.FC<ImageUploadSlotProps> = ({
  imageData,
  index,
  onUpdate,
  onRemove,
  canRemove,
  disabled
}) => {
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(`File selected for slot ${index}:`, file ? file.name : 'No file');
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.error('Invalid file type:', file.type);
        return;
      }
      
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        console.error('File too large:', file.size);
        return;
      }
      
      onUpdate(index, 'file', file);
      
      // Auto-generate description from filename if empty
      if (!imageData.description) {
        const nameWithoutExtension = file.name.split('.')[0];
        onUpdate(index, 'description', nameWithoutExtension);
      }
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(index, 'description', event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(index, 'price', event.target.value);
  };

  const isMainImage = index === 0;

  return (
    <Card className={`p-4 ${isMainImage ? 'border-2 border-blue-500 bg-blue-50' : ''}`}>
      {isMainImage && (
        <div className="flex items-center gap-2 mb-3 text-blue-600">
          <Star className="h-4 w-4 fill-current" />
          <span className="text-sm font-medium">Main Thumbnail Image</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <Label htmlFor={`file-${index}`}>
            {isMainImage ? 'Thumbnail Image *' : `Angle ${index} Image`}
          </Label>
          <Input
            id={`file-${index}`}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={disabled}
            className="mt-1"
          />
          {imageData.file && (
            <div className="mt-1 text-sm text-green-600">
              ✓ {imageData.file.name} ({(imageData.file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>
        
        <div>
          <Label htmlFor={`description-${index}`}>Description</Label>
          <Input
            id={`description-${index}`}
            value={imageData.description}
            onChange={handleDescriptionChange}
            placeholder={isMainImage ? "Main product description" : `Angle ${index} description`}
            className="mt-1"
            disabled={disabled}
          />
        </div>
        
        <div>
          <Label htmlFor={`price-${index}`}>
            {isMainImage ? 'Product Price (₹) *' : 'Price (₹)'}
          </Label>
          <Input
            id={`price-${index}`}
            type="number"
            min="0"
            step="0.01"
            value={imageData.price}
            onChange={handlePriceChange}
            placeholder="0"
            className="mt-1"
            disabled={disabled || !isMainImage}
            readOnly={!isMainImage}
          />
          {!isMainImage && (
            <div className="text-xs text-gray-500 mt-1">
              Uses price from main image
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          {canRemove && !isMainImage && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => onRemove(index)}
              disabled={disabled}
              title="Remove this image slot"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ImageUploadSlot;
