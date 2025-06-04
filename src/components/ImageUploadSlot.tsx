
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';

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
    if (file) {
      onUpdate(index, 'file', file);
      // Auto-generate description from filename if empty
      if (!imageData.description) {
        onUpdate(index, 'description', file.name.split('.')[0]);
      }
    }
  };

  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <Label>Image File {index === 0 ? '*' : ''}</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={disabled}
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
            onChange={(e) => onUpdate(index, 'description', e.target.value)}
            placeholder="Image description"
            className="mt-1"
            disabled={disabled}
          />
        </div>
        
        <div>
          <Label>Price (₹) {index === 0 ? '*' : ''}</Label>
          <Input
            type="number"
            value={imageData.price}
            onChange={(e) => onUpdate(index, 'price', e.target.value)}
            placeholder="0"
            className="mt-1"
            disabled={disabled}
          />
        </div>
        
        <div className="flex gap-2">
          {canRemove && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => onRemove(index)}
              disabled={disabled}
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
