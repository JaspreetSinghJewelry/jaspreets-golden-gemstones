
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
      console.error('File validation failed:', validation.error);
      return { success: false, error: validation.error };
    }

    // Generate filename and upload to storage
    const fileName = generateFileName(file, sortOrder);
    console.log('Generated filename:', fileName);
    
    const uploadResult = await uploadFileToStorage(file, fileName);
    
    if (!uploadResult.success) {
      console.error('Storage upload failed:', uploadResult.error);
      return uploadResult;
    }

    // Use the product name for ALL images, not individual descriptions
    // Only use custom description if it's different from the default
    let imageDescription: string;
    
    if (sortOrder === 0) {
      // Main thumbnail uses product name or custom description
      imageDescription = imageData.description.trim() || productName;
    } else {
      // Additional angles use product name with angle info, or custom description
      const defaultAngleDesc = `${productName} - Angle ${sortOrder + 1}`;
      imageDescription = (imageData.description.trim() && imageData.description.trim() !== file.name.split('.')[0]) 
        ? imageData.description.trim() 
        : defaultAngleDesc;
    }

    console.log('Saving to database with description:', imageDescription);

    // Save to database - ONLY the first image (sort_order 0) gets the price, others get 0
    const dbResult = await saveImageToDatabase(
      fileName,
      file,
      displayLocation,
      imageDescription,
      sortOrder === 0 ? productPrice : 0, // Only main image has price
      sortOrder,
      productGroupId
    );

    if (!dbResult.success) {
      console.error('Database save failed:', dbResult.error);
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
  console.log('=== Starting Product Group Upload ===');
  
  const validImages = productImages.filter(img => img.file);
  let successCount = 0;
  let errorCount = 0;
  const errors: string[] = [];

  if (validImages.length === 0) {
    console.error('No valid images to upload');
    return { successCount: 0, errorCount: 1, errors: ['No valid images to upload'] };
  }

  // Generate a single product group ID for ALL images in this upload
  const productGroupId = crypto.randomUUID();
  const productPrice = Number(validImages[0].price) || 0;

  console.log('Upload configuration:', {
    productName,
    validImages: validImages.length,
    displayLocation,
    productGroupId,
    productPrice,
    'All images will be grouped under': productGroupId
  });

  // Ensure bucket exists before starting uploads
  console.log('Ensuring storage bucket exists...');
  const bucketReady = await ensureStorageBucket();
  if (!bucketReady) {
    const error = 'Failed to create or access storage bucket';
    console.error(error);
    return { 
      successCount: 0, 
      errorCount: validImages.length, 
      errors: [error] 
    };
  }
  
  console.log('Storage bucket is ready, starting uploads...');

  // Upload images sequentially to avoid race conditions
  for (let i = 0; i < validImages.length; i++) {
    const imageData = validImages[i];
    console.log(`\n--- Processing image ${i + 1} of ${validImages.length} ---`);
    console.log('File:', imageData.file?.name);
    console.log('Product Group ID:', productGroupId);
    console.log('Sort Order:', i);
    console.log('Will be grouped with other images:', validImages.length > 1);
    
    // Add a small delay between uploads to prevent overwhelming the server
    if (i > 0) {
      console.log('Adding delay between uploads...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    const result = await uploadSingleImage(
      imageData,
      productName,
      displayLocation,
      productGroupId, // Same group ID for all images
      i, // Sequential sort order
      productPrice
    );

    if (result.success) {
      successCount++;
      console.log(`✅ Image ${i + 1} uploaded successfully to product group ${productGroupId}`);
    } else {
      errorCount++;
      const errorMsg = `Image ${i + 1} (${imageData.file?.name}) failed: ${result.error}`;
      console.error(`❌ ${errorMsg}`);
      errors.push(errorMsg);
    }
  }

  console.log('\n=== Upload Summary ===');
  console.log('Product Group ID:', productGroupId);
  console.log('Success count:', successCount);
  console.log('Error count:', errorCount);
  console.log('All successful images grouped together:', successCount > 1);
  console.log('Errors:', errors);
  
  return { successCount, errorCount, errors };
};
