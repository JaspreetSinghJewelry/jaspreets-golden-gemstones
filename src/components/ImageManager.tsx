
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Trash2, Eye, X } from 'lucide-react';
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
  display_location: string | null;
  description: string | null;
  price: number | null;
  is_active: boolean | null;
  sort_order: number | null;
}

const ImageManager = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [displayLocation, setDisplayLocation] = useState('home');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('File selected:', file.name, file.type, file.size);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a description for the image",
        variant: "destructive"
      });
      return;
    }

    const priceValue = price.trim();
    if (!priceValue || isNaN(Number(priceValue)) || Number(priceValue) <= 0) {
      toast({
        title: "Valid Price Required",
        description: "Please enter a valid price greater than 0",
        variant: "destructive"
      });
      return;
    }

    console.log('Starting file upload for:', selectedFile.name);
    setUploading(true);
    
    try {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      // Generate a unique filename
      const fileExt = selectedFile.name.split('.').pop()?.toLowerCase();
      const timestamp = Date.now();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      console.log('Generated filename:', fileName);

      // Upload to storage
      console.log('Uploading to storage...');
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, selectedFile, {
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
          original_name: selectedFile.name,
          file_path: fileName,
          file_size: selectedFile.size,
          mime_type: selectedFile.type,
          display_location: displayLocation,
          description: description.trim(),
          price: Number(priceValue),
          is_active: true,
          sort_order: 0
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database insert error:', dbError);
        // Clean up uploaded file if database insert fails
        await supabase.storage.from('images').remove([fileName]);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log('Database record created:', dbData);

      toast({
        title: "Success",
        description: `Image "${selectedFile.name}" uploaded successfully!`
      });

      // Refresh the images list
      await fetchImages();
      setSelectedFile(null);
      setDescription('');
      setPrice('');
      setDisplayLocation('home');
      
      // Reset file input
      const fileInput = document.getElementById('imageFile') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
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
      
      // Delete from database first
      const { error: dbError } = await supabase
        .from('images')
        .delete()
        .eq('id', image.id);

      if (dbError) {
        throw dbError;
      }

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('images')
        .remove([image.file_path]);

      if (storageError) {
        console.error('Storage delete error (non-critical):', storageError);
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

  const formatPrice = (price: number | null) => {
    if (!price) return 'No price';
    return `₹${price.toLocaleString()}`;
  };

  const getLocationLabel = (location: string | null) => {
    switch (location) {
      case 'home': return 'Home Page';
      case 'featured': return 'Featured Products';
      case 'categories': return 'Categories';
      case 'lab-grown': return 'Lab Grown Diamonds';
      case 'rings': return 'Rings';
      case 'necklaces': return 'Necklaces';
      case 'earrings': return 'Earrings';
      case 'bracelets': return 'Bracelets';
      case 'shop-now': return 'Shop Now';
      default: return location || 'Unknown';
    }
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
      <Card className="upload-form">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Upload className="h-5 w-5" />
            Upload New Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageFile" className="text-base font-medium">Choose Image File</Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading}
                className="mt-2"
              />
              {selectedFile && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600 flex-wrap">
                  <span>Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="displayLocation" className="text-base font-medium">Display Location</Label>
              <Select value={displayLocation} onValueChange={setDisplayLocation}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select where to display this image" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="home">Home Page</SelectItem>
                  <SelectItem value="featured">Featured Products</SelectItem>
                  <SelectItem value="categories">Categories</SelectItem>
                  <SelectItem value="lab-grown">Lab Grown Diamonds</SelectItem>
                  <SelectItem value="rings">Rings</SelectItem>
                  <SelectItem value="necklaces">Necklaces</SelectItem>
                  <SelectItem value="earrings">Earrings</SelectItem>
                  <SelectItem value="bracelets">Bracelets</SelectItem>
                  <SelectItem value="shop-now">Shop Now</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description" className="text-base font-medium">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a description for this jewelry piece..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={uploading}
                className="mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="price" className="text-base font-medium">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price in rupees"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={uploading}
                className="mt-2"
                min="1"
                step="1"
              />
              <p className="text-sm text-gray-500 mt-1">Enter a valid price greater than 0</p>
            </div>
            
            <Button 
              onClick={handleFileUpload}
              disabled={uploading || !selectedFile}
              className="w-full text-base py-3"
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>
            
            {uploading && (
              <div className="text-sm text-blue-600">Processing upload...</div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Uploaded Images ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No images uploaded yet
            </div>
          ) : (
            <div className="image-grid">
              {images.map((image) => (
                <div key={image.id} className="border rounded-lg p-4 space-y-3 bg-white">
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                    <img
                      src={getImageUrl(image.file_path)}
                      alt={image.description || image.original_name || 'Uploaded image'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image load error for:', image.file_path);
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="font-medium text-sm truncate" title={image.original_name || ''}>
                      {image.original_name || image.filename}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {image.description || 'No description'}
                    </p>
                    <p className="text-base font-semibold text-green-600">
                      {formatPrice(image.price)}
                    </p>
                    <p className="text-sm text-blue-600">
                      {getLocationLabel(image.display_location)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(image.file_size)} • {new Date(image.uploaded_at).toLocaleDateString()}
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
