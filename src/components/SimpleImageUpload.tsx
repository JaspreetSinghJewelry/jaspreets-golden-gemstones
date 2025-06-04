
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const SimpleImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const uploadImages = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select image files to upload",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      try {
        // Validate file
        if (!file.type.startsWith('image/')) {
          errorCount++;
          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          errorCount++;
          continue;
        }

        // Generate filename
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const timestamp = Date.now();
        const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        // Upload to storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          errorCount++;
          continue;
        }

        // Save to database
        const { error: dbError } = await supabase
          .from('images')
          .insert({
            filename: fileName,
            original_name: file.name,
            file_path: fileName,
            file_size: file.size,
            mime_type: file.type,
            display_location: 'gallery',
            description: file.name.split('.')[0],
            price: 0,
            is_active: true,
            sort_order: i
          });

        if (dbError) {
          // Clean up uploaded file
          await supabase.storage.from('images').remove([fileName]);
          errorCount++;
          continue;
        }

        successCount++;
      } catch (error) {
        errorCount++;
      }
    }

    setUploading(false);

    if (successCount > 0) {
      toast({
        title: "Upload Successful!",
        description: `${successCount} images uploaded${errorCount > 0 ? `, ${errorCount} failed` : ''}`
      });
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      setSelectedFiles(null);
    } else {
      toast({
        title: "Upload Failed",
        description: "No images were uploaded successfully",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Simple Image Upload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="images">Select Images</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              disabled={uploading}
              className="mt-2"
            />
            {selectedFiles && (
              <div className="mt-2 text-sm text-gray-600">
                {selectedFiles.length} file(s) selected
              </div>
            )}
          </div>

          <Button 
            onClick={uploadImages}
            disabled={uploading || !selectedFiles || selectedFiles.length === 0}
            className="w-full"
          >
            {uploading ? 'Uploading...' : 'Upload Images'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleImageUpload;
