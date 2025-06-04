
import { supabase } from '@/integrations/supabase/client';

export interface ProductImageUpload {
  file: File | null;
  description: string;
  price: string;
}

export interface UploadResult {
  successCount: number;
  errorCount: number;
}

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
      errorMessage: "Please set a valid price for the first image"
    };
  }

  console.log('Validation passed');
  return { isValid: true };
};

export const uploadSingleImage = async (
  imageData: ProductImageUpload,
  productName: string,
  displayLocation: string,
  productGroupId: string,
  sortOrder: number
): Promise<boolean> => {
  try {
    const file = imageData.file!;
    
    console.log('Starting upload for file:', file.name);

    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type:', file.type);
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      console.error('File too large:', file.size);
      return false;
    }

    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const timestamp = Date.now();
    const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    console.log('Uploading file to storage:', fileName);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return false;
    }

    console.log('File uploaded to storage successfully, saving to database...');

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
        price: Number(imageData.price) || 0,
        is_active: true,
        sort_order: sortOrder,
        product_group: productGroupId
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // Clean up uploaded file if database insert fails
      await supabase.storage.from('images').remove([fileName]);
      return false;
    }

    console.log('Image saved to database successfully');
    return true;
  } catch (error) {
    console.error('Unexpected error during upload:', error);
    return false;
  }
};

export const uploadProductGroup = async (
  productImages: ProductImageUpload[],
  productName: string,
  displayLocation: string
): Promise<UploadResult> => {
  const validImages = productImages.filter(img => img.file);
  let successCount = 0;
  let errorCount = 0;

  const productGroupId = crypto.randomUUID();

  console.log('Starting product group upload:', {
    productName,
    validImages: validImages.length,
    displayLocation,
    productGroupId
  });

  for (let i = 0; i < validImages.length; i++) {
    const imageData = validImages[i];
    console.log(`Uploading image ${i + 1} of ${validImages.length}:`, imageData.file?.name);
    
    const success = await uploadSingleImage(
      imageData,
      productName,
      displayLocation,
      productGroupId,
      i
    );

    if (success) {
      successCount++;
      console.log(`Image ${i + 1} uploaded successfully`);
    } else {
      errorCount++;
      console.log(`Image ${i + 1} failed to upload`);
    }
  }

  console.log('Upload completed:', { successCount, errorCount });
  return { successCount, errorCount };
};
