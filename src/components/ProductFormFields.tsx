
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductFormFieldsProps {
  productName: string;
  displayLocation: string;
  onProductNameChange: (value: string) => void;
  onDisplayLocationChange: (value: string) => void;
  disabled: boolean;
}

const ProductFormFields: React.FC<ProductFormFieldsProps> = ({
  productName,
  displayLocation,
  onProductNameChange,
  onDisplayLocationChange,
  disabled
}) => {
  return (
    <>
      <div>
        <Label htmlFor="productName">Product Name *</Label>
        <Input
          id="productName"
          value={productName}
          onChange={(e) => onProductNameChange(e.target.value)}
          placeholder="Enter product name"
          className="mt-2"
          disabled={disabled}
        />
      </div>

      <div>
        <Label htmlFor="displayLocation">Collection Category</Label>
        <p className="text-sm text-gray-600 mb-2">
          Products will appear in Shop Now section and the selected collection category
        </p>
        <Select value={displayLocation} onValueChange={onDisplayLocationChange} disabled={disabled}>
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rings">Rings</SelectItem>
            <SelectItem value="necklaces">Necklaces</SelectItem>
            <SelectItem value="earrings">Earrings</SelectItem>
            <SelectItem value="bracelets">Bracelets</SelectItem>
            <SelectItem value="lab-grown-diamonds">Lab Grown Diamonds</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default ProductFormFields;
