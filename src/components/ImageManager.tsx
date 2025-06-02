
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ImageFile {
  id: string;
  filename: string;
  original_name: string | null;
  file_path: string;
  file_size: number | null;
  mime_type: string | null;
  uploaded_at: string;
}

const ImageManager = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      console.log('Fetching images...');
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Error fetching images:', error);
        toast({
          title: "Error",
          description: `Failed to fetch images: ${error.message}`,
          variant: "destructive"
        });
      } else {
        console.log('Images fetched successfully:', data);
        setImages(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    console.log('Starting file upload for:', file.name);
    setUploading(true);
    
    try {
      // Generate a unique filename
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const timestamp = Date.now();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      console.log('Generated filename:', fileName);

      // First, check if bucket exists
      const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
      console.log('Available buckets:', buckets);
      
      if (bucketsError) {
        console.error('Error listing buckets:', bucketsError);
        throw new Error(`Bucket error: ${bucketsError.message}`);
      }

      const imagesBucket = buckets?.find(bucket => bucket.id === 'images');
      if (!imagesBucket) {
        throw new Error('Images bucket not found. Please contact administrator.');
      }

      // Upload to storage
      console.log('Uploading to storage...');
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('Upload successful:', uploadData);

      // Record in database
      console.log('Recording in database...');
      const { data: dbData, error: dbError } = await supabase
        .from('images')
        .insert({
          filename: fileName,
          original_name: file.name,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error:', dbError);
        // If database insert fails, try to clean up the uploaded file
        await supabase.storage.from('images').remove([fileName]);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log('Database record created:', dbData);

      toast({
        title: "Success",
        description: "Image uploaded successfully"
      });

      fetchImages();
      
      // Reset file input
      event.target.value = '';
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image: ImageFile) => {
    if (!confirm(`Are you sure you want to delete "${image.original_name}"?`)) {
      return;
    }

    try {
      console.log('Deleting image:', image.filename);
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('images')
        .remove([image.file_path]);

      if (storageError) {
        console.error('Storage delete error:', storageError);
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('images')
        .delete()
        .eq('id', image.id);

      if (dbError) {
        throw dbError;
      }

      toast({
        title: "Success",
        description: "Image deleted successfully"
      });

      fetchImages();
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete image",
        variant: "destructive"
      });
    }
  };

  const getImageUrl = (filePath: string) => {
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    return data.publicUrl;
  };

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading images...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload New Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageFile">Choose Image File</Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="mt-1"
              />
            </div>
            {uploading && (
              <div className="text-sm text-blue-600">Uploading image...</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Images ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No images uploaded yet
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.id} className="border rounded-lg p-4 space-y-3">
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={getImageUrl(image.file_path)}
                      alt={image.original_name || 'Uploaded image'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image load error for:', image.file_path);
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-medium text-sm truncate" title={image.original_name || ''}>
                      {image.original_name || image.filename}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(image.file_size)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(image.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(getImageUrl(image.file_path), '_blank')}
                      className="flex-1"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(image)}
                      className="flex-1"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageManager;
