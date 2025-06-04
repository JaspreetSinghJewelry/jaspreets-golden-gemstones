
import { supabase } from '@/integrations/supabase/client';
import type { ProductImageUpload, UploadResult } from '@/types/upload';
import { validateImageFile } from './uploadValidation';
import { ensureStorageBucket, uploadFileToStorage, generateFileName } from './storageUtils';
import { saveImageToDatabase, cleanupFailedUpload } from './databaseUtils';

export { validateUploadData } from './uploadValidation';
export type { ProductImageUpload, UploadResult } from '@/types/upload';

const uploadSingleImage = async (
  imageData: ProductImageUpload,
  productName: string,
  displayLocation: string,
  productGroupId: string,
  sortOrder: number,
  productPrice: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    const file = imageData.file!;
    
    console.log(`Starting upload for file ${sortOrder + 1}:`, file.name);

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      console.error(validation.error);
      return { success: false, error: validation.error };
    }

    // Ensure storage bucket exists
    const bucketReady = await ensureStorageBucket();
    if (!bucketReady) {
      return { success: false, error: 'Failed to ensure storage bucket exists' };
    }

    // Generate filename and upload to storage
    const fileName = generateFileName(file, sortOrder);
    const uploadResult = await uploadFileToStorage(file, fileName);
    
    if (!uploadResult.success) {
      return uploadResult;
    }

    // Create appropriate description based on sort order
    const imageDescription = sortOrder === 0 
      ? (imageData.description.trim() || `${productName} - Main Image`)
      : (imageData.description.trim() || `${productName} - Angle ${sortOrder + 1}`);

    // Save to database
    const dbResult = await saveImageToDatabase(
      fileName,
      file,
      displayLocation,
      imageDescription,
      productPrice,
      sortOrder,
      productGroupId
    );

    if (!dbResult.success) {
      // Clean up uploaded file if database insert fails
      await cleanupFailedUpload(fileName);
      return dbResult;
    }

    console.log(`Image ${sortOrder + 1} saved successfully`);
    return { success: true };
  } catch (error) {
    const errorMessage = `Unexpected error during upload of image ${sortOrder + 1}: ${error}`;
    console.error(errorMessage);
    return { success: false, error: errorMessage };
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
  const errors: string[] = [];

  if (validImages.length === 0) {
    return { successCount: 0, errorCount: 1, errors: ['No valid images to upload'] };
  }

  const productGroupId = crypto.randomUUID();
  const productPrice = Number(validImages[0].price) || 0;

  console.log('Starting product group upload:', {
    productName,
    validImages: validImages.length,
    displayLocation,
    productGroupId,
    productPrice
  });

  // Ensure bucket exists before starting uploads
  const bucketReady = await ensureStorageBucket();
  if (!bucketReady) {
    return { 
      successCount: 0, 
      errorCount: validImages.length, 
      errors: ['Failed to create or access storage bucket'] 
    };
  }

  // Upload images sequentially to avoid race conditions
  for (let i = 0; i < validImages.length; i++) {
    const imageData = validImages[i];
    console.log(`Processing image ${i + 1} of ${validImages.length}:`, imageData.file?.name);
    
    // Add a small delay between uploads to prevent overwhelming the server
    if (i > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const result = await uploadSingleImage(
      imageData,
      productName,
      displayLocation,
      productGroupId,
      i,
      productPrice
    );

    if (result.success) {
      successCount++;
      console.log(`Image ${i + 1} uploaded successfully`);
    } else {
      errorCount++;
      const errorMsg = `Image ${i + 1} failed: ${result.error}`;
      console.log(errorMsg);
      errors.push(errorMsg);
    }
  }

  console.log('Upload completed:', { successCount, errorCount, errors });
  return { successCount, errorCount, errors };
};
