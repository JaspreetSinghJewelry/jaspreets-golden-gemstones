
import { supabase } from '@/integrations/supabase/client';

export const ensureStorageBucket = async (): Promise<boolean> => {
  try {
    console.log('Checking if images bucket exists...');
    
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return false;
    }

    const imagesBucket = buckets?.find(bucket => bucket.name === 'images');
    
    if (!imagesBucket) {
      console.log('Images bucket not found, creating...');
      const { error: createError } = await supabase.storage.createBucket('images', {
        public: true,
        allowedMimeTypes: ['image/*'],
        fileSizeLimit: 10485760 // 10MB
      });
      
      if (createError) {
        console.error('Error creating images bucket:', createError);
        return false;
      } else {
        console.log('Images bucket created successfully');
      }
    } else {
      console.log('Images bucket already exists');
    }
    
    return true;
  } catch (error) {
    console.error('Error ensuring storage bucket:', error);
    return false;
  }
};

export const uploadFileToStorage = async (
  file: File,
  fileName: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('Uploading file to storage:', fileName);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return { success: false, error: `Storage upload failed: ${uploadError.message}` };
    }

    console.log('File uploaded to storage successfully');
    return { success: true };
  } catch (error) {
    console.error('Unexpected error during file upload:', error);
    return { success: false, error: `Unexpected error during file upload: ${error}` };
  }
};

export const generateFileName = (file: File, sortOrder: number): string => {
  const fileExt = file.name.split('.').pop()?.toLowerCase();
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2);
  return `${timestamp}-${randomId}-${sortOrder}.${fileExt}`;
};
