import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Trash2, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface CarouselImage {
  id: string;
  filename: string;
  original_name: string | null;
  file_path: string;
  description: string | null;
  sort_order: number | null;
  is_active: boolean | null;
}

const DISPLAY_LOCATION = 'featured-collection';

const FeaturedCarouselManager = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [sortOrder, setSortOrder] = useState('0');

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .eq('display_location', DISPLAY_LOCATION)
      .order('sort_order', { ascending: true });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setImages((data as any) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const getImageUrl = (filePath: string) =>
    supabase.storage.from('images').getPublicUrl(filePath).data.publicUrl;

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({ title: 'Select an image first', variant: 'destructive' });
      return;
    }
    if (!name.trim()) {
      toast({ title: 'Enter a product name', variant: 'destructive' });
      return;
    }
    setUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop()?.toLowerCase();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: upErr } = await supabase.storage
        .from('images')
        .upload(fileName, selectedFile, { cacheControl: '3600', upsert: false });
      if (upErr) throw upErr;

      const { error: dbErr } = await supabase.from('images').insert({
        filename: fileName,
        original_name: selectedFile.name,
        file_path: fileName,
        file_size: selectedFile.size,
        mime_type: selectedFile.type,
        display_location: DISPLAY_LOCATION,
        description: name.trim(),
        price: 0,
        is_active: true,
        sort_order: Number(sortOrder) || 0,
      });
      if (dbErr) {
        await supabase.storage.from('images').remove([fileName]);
        throw dbErr;
      }

      toast({ title: 'Added to Featured Collection' });
      setSelectedFile(null);
      setName('');
      setSortOrder('0');
      const fi = document.getElementById('featuredFile') as HTMLInputElement;
      if (fi) fi.value = '';
      fetchImages();
    } catch (e: any) {
      toast({ title: 'Upload failed', description: e.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (img: CarouselImage) => {
    if (!confirm(`Remove "${img.description || img.original_name}" from Featured Collection?`)) return;
    const { error } = await supabase.from('images').delete().eq('id', img.id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
      return;
    }
    await supabase.storage.from('images').remove([img.file_path]);
    toast({ title: 'Removed' });
    fetchImages();
  };

  const updateSortOrder = async (img: CarouselImage, newOrder: number) => {
    const { error } = await supabase
      .from('images')
      .update({ sort_order: newOrder })
      .eq('id', img.id);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    } else {
      fetchImages();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Add Image to Featured Collection Carousel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="featuredFile">Image File</Label>
            <Input
              id="featuredFile"
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              disabled={uploading}
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="featuredName">Product Name (shown on carousel)</Label>
            <Input
              id="featuredName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Diamond Solitaire Ring"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="featuredOrder">Display Order (lower shows first)</Label>
            <Input
              id="featuredOrder"
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="mt-2 w-32"
            />
          </div>
          <Button onClick={handleUpload} disabled={uploading || !selectedFile} className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Uploading...' : 'Add to Carousel'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Featured Carousel Images ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-6 text-gray-500">Loading...</div>
          ) : images.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No custom images yet. The carousel is showing the default images.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img) => (
                <div key={img.id} className="border rounded-lg p-3 space-y-2 bg-white">
                  <div className="aspect-video overflow-hidden rounded bg-gray-100">
                    <img
                      src={getImageUrl(img.file_path)}
                      alt={img.description || ''}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-medium text-sm truncate">{img.description}</p>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Order:</Label>
                    <Input
                      type="number"
                      defaultValue={img.sort_order ?? 0}
                      onBlur={(e) => {
                        const v = Number(e.target.value);
                        if (v !== (img.sort_order ?? 0)) updateSortOrder(img, v);
                      }}
                      className="h-8 w-20"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(img)}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturedCarouselManager;
