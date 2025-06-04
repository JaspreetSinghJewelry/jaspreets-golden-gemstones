
import { supabase } from '@/integrations/supabase/client';

export const saveImageToDatabase = async (
  fileName: string,
  file: File,
  displayLocation: string,
  description: string,
  price: number,
  sortOrder: number,
  productGroupId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('Saving image to database...');

    const { error: dbError } = await supabase
      .from('images')
      .insert({
        filename: fileName,
        original_name: file.name,
        file_path: fileName,
        file_size: file.size,
        mime_type: file.type,
        display_location: displayLocation,
        description: description,
        price: price,
        is_active: true,
        sort_order: sortOrder,
        product_group: productGroupId
      });

    if (dbError) {
      console.error('Database error:', dbError);
      return { success: false, error: `Database error: ${dbError.message}` };
    }

    console.log('Image saved to database successfully');
    return { success: true };
  } catch (error) {
    console.error('Unexpected error during database save:', error);
    return { success: false, error: `Unexpected error during database save: ${error}` };
  }
};

export const cleanupFailedUpload = async (fileName: string): Promise<void> => {
  try {
    await supabase.storage.from('images').remove([fileName]);
    console.log('Cleaned up failed upload file:', fileName);
  } catch (error) {
    console.error('Error cleaning up failed upload:', error);
  }
};
