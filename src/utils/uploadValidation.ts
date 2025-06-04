
import type { ProductImageUpload } from '@/types/upload';

export const validateUploadData = (
  productImages: ProductImageUpload[],
  productName: string
): { isValid: boolean; errorMessage?: string } => {
  console.log('Validating upload data:', { productImages, productName });
  
  const validImages = productImages.filter(img => img.file);
  
  if (validImages.length === 0) {
    return {
      isValid: false,
      errorMessage: "Please select at least one image file"
    };
  }

  if (!productName.trim()) {
    return {
      isValid: false,
      errorMessage: "Please enter a product name"
    };
  }

  // Validate first image has price if it exists
  const firstImage = productImages[0];
  if (firstImage?.file && (!firstImage.price || Number(firstImage.price) <= 0)) {
    return {
      isValid: false,
      errorMessage: "Please set a valid price for the first image (this will be the product price)"
    };
  }

  console.log('Validation passed');
  return { isValid: true };
};

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: `Invalid file type: ${file.type}` };
  }

  // Validate file size (10MB limit)
  if (file.size > 10 * 1024 * 1024) {
    return { isValid: false, error: `File too large: ${(file.size / 1024 / 1024).toFixed(2)}MB` };
  }

  return { isValid: true };
};
