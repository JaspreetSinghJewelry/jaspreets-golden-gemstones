
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

    console.log('Uploading file:', fileName);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return false;
    }

    console.log('File uploaded successfully, saving to database...');

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
      await supabase.storage.from('images').remove([fileName]);
      return false;
    }

    console.log('Image saved to database successfully');
    return true;
  } catch (error) {
    console.error('Unexpected error:', error);
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

  console.log('Starting upload with:', {
    productName,
    validImages: validImages.length,
    displayLocation
  });

  for (const imageData of validImages) {
    const success = await uploadSingleImage(
      imageData,
      productName,
      displayLocation,
      productGroupId,
      successCount
    );

    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
  }

  return { successCount, errorCount };
};
