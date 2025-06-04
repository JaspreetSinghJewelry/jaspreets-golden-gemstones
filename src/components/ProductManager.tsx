import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface ProductImage {
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
  product_group: string | null;
  user_id: string | null;
  updated_at: string | null;
}

const ProductManager = () => {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [newImage, setNewImage] = useState<Omit<ProductImage, 'id' | 'filename' | 'file_size' | 'mime_type' | 'uploaded_at' | 'user_id' | 'updated_at'>>({
    original_name: '',
    file_path: '',
    display_location: '',
    description: '',
    price: null,
    is_active: true,
    sort_order: null,
    product_group: null,
  });
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [bulkImages, setBulkImages] = useState<Array<{
    filename: string;
    file_path: string;
    original_name: string;
    description: string;
    price: number | null;
    sort_order: number;
  }>>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('images')
      .select('*')
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching images:', error);
    } else {
      // Transform data to match ProductImage interface
      const transformedData: ProductImage[] = data.map((item: any) => ({
        id: item.id,
        filename: item.filename,
        original_name: item.original_name,
        file_path: item.file_path,
        file_size: item.file_size,
        mime_type: item.mime_type,
        uploaded_at: item.uploaded_at,
        display_location: item.display_location,
        description: item.description,
        price: item.price,
        is_active: item.is_active,
        sort_order: item.sort_order,
        product_group: item.product_group || item.id,
        user_id: item.user_id,
        updated_at: item.updated_at
      }));
      setImages(transformedData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewImage(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewImage(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSelectChange = (value: string) => {
    setNewImage(prevState => ({
      ...prevState,
      display_location: value,
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewImage(prevState => ({
      ...prevState,
      price: value === '' ? null : parseFloat(value),
    }));
  };

  const addBulkImage = () => {
    setBulkImages([...bulkImages, {
      filename: '',
      file_path: '',
      original_name: '',
      description: '',
      price: null,
      sort_order: bulkImages.length + 1
    }]);
  };

  const updateBulkImage = (index: number, field: string, value: any) => {
    const updated = [...bulkImages];
    updated[index] = { ...updated[index], [field]: value };
    setBulkImages(updated);
  };

  const removeBulkImage = (index: number) => {
    setBulkImages(bulkImages.filter((_, i) => i !== index));
  };

  const createBulkImages = async () => {
    if (bulkImages.length === 0) return;

    const productGroup = `group_${Date.now()}`;
    const imagesToInsert = bulkImages.map(img => ({
      filename: img.filename || `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      file_path: img.file_path,
      original_name: img.original_name,
      description: img.description,
      price: img.price,
      sort_order: img.sort_order,
      display_location: newImage.display_location,
      is_active: newImage.is_active,
      product_group: productGroup
    }));

    const { data, error } = await supabase
      .from('images')
      .insert(imagesToInsert);

    if (error) {
      console.error('Error creating bulk images:', error);
    } else {
      console.log('Bulk images created successfully:', data);
      fetchImages();
      setBulkImages([]);
    }
  };

  const createImage = async () => {
    const imageToInsert = {
      ...newImage,
      filename: newImage.original_name || `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    const { data, error } = await supabase
      .from('images')
      .insert([imageToInsert]);

    if (error) {
      console.error('Error creating image:', error);
    } else {
      console.log('Image created successfully:', data);
      fetchImages();
      setNewImage({
        original_name: '',
        file_path: '',
        display_location: '',
        description: '',
        price: null,
        is_active: true,
        sort_order: null,
        product_group: null,
      });
    }
  };

  const updateImage = async () => {
    if (!selectedImage) return;

    const { data, error } = await supabase
      .from('images')
      .update(newImage)
      .eq('id', selectedImage.id);

    if (error) {
      console.error('Error updating image:', error);
    } else {
      console.log('Image updated successfully:', data);
      fetchImages();
      setEditMode(false);
      setSelectedImage(null);
      setNewImage({
        original_name: '',
        file_path: '',
        display_location: '',
        description: '',
        price: null,
        is_active: true,
        sort_order: null,
        product_group: null,
      });
    }
  };

  const deleteImage = async () => {
    if (!selectedImage) return;

    const { error } = await supabase
      .from('images')
      .delete()
      .eq('id', selectedImage.id);

    if (error) {
      console.error('Error deleting image:', error);
    } else {
      console.log('Image deleted successfully');
      fetchImages();
      setEditMode(false);
      setSelectedImage(null);
      setNewImage({
        original_name: '',
        file_path: '',
        display_location: '',
        description: '',
        price: null,
        is_active: true,
        sort_order: null,
        product_group: null,
      });
    }
  };

  const handleImageSelect = (image: ProductImage) => {
    setSelectedImage(image);
    setNewImage({
      original_name: image.original_name || '',
      file_path: image.file_path,
      display_location: image.display_location || '',
      description: image.description || '',
      price: image.price,
      is_active: image.is_active || true,
      sort_order: image.sort_order,
      product_group: image.product_group,
    });
    setEditMode(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Creation Form */}
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">{editMode ? 'Edit Image' : 'Create New Image'}</h2>
          <div className="mb-2">
            <Label htmlFor="original_name">Original Name</Label>
            <Input
              type="text"
              id="original_name"
              name="original_name"
              value={newImage.original_name || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="file_path">File Path</Label>
            <Input
              type="text"
              id="file_path"
              name="file_path"
              value={newImage.file_path}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="display_location">Display Location</Label>
            <Select onValueChange={handleSelectChange} defaultValue={newImage.display_location || ''}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rings">Rings</SelectItem>
                <SelectItem value="necklaces">Necklaces</SelectItem>
                <SelectItem value="earrings">Earrings</SelectItem>
                <SelectItem value="bracelets">Bracelets</SelectItem>
                <SelectItem value="lab-grown-diamonds">Lab Grown Diamonds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newImage.description || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="price">Price</Label>
            <Input
              type="number"
              id="price"
              name="price"
              value={newImage.price === null ? '' : newImage.price.toString()}
              onChange={handlePriceChange}
            />
          </div>
          <div className="mb-2 flex items-center space-x-2">
            <Label htmlFor="is_active">Is Active</Label>
            <Switch
              id="is_active"
              name="is_active"
              checked={newImage.is_active || false}
              onCheckedChange={(checked) => setNewImage(prevState => ({ ...prevState, is_active: checked }))}
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="sort_order">Sort Order</Label>
            <Input
              type="number"
              id="sort_order"
              name="sort_order"
              value={newImage.sort_order === null ? '' : newImage.sort_order.toString()}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <Label htmlFor="product_group">Product Group</Label>
            <Input
              type="text"
              id="product_group"
              name="product_group"
              value={newImage.product_group || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex justify-between">
            {editMode ? (
              <>
                <Button variant="secondary" onClick={updateImage}>Update Image</Button>
                <Button variant="destructive" onClick={deleteImage}>Delete Image</Button>
              </>
            ) : (
              <Button onClick={createImage}>Create Image</Button>
            )}
          </div>
        </div>

        {/* Bulk Upload Section */}
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-2">Bulk Upload for Product Group</h2>
          
          <div className="mb-4">
            <Button onClick={addBulkImage} className="mb-2">Add Image to Group</Button>
            {bulkImages.map((img, index) => (
              <div key={index} className="border p-2 mb-2 rounded">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Input
                    placeholder="Filename"
                    value={img.filename}
                    onChange={(e) => updateBulkImage(index, 'filename', e.target.value)}
                  />
                  <Input
                    placeholder="File Path"
                    value={img.file_path}
                    onChange={(e) => updateBulkImage(index, 'file_path', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <Input
                    placeholder="Original Name"
                    value={img.original_name}
                    onChange={(e) => updateBulkImage(index, 'original_name', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={img.price || ''}
                    onChange={(e) => updateBulkImage(index, 'price', e.target.value ? parseFloat(e.target.value) : null)}
                  />
                </div>
                <Textarea
                  placeholder="Description"
                  value={img.description}
                  onChange={(e) => updateBulkImage(index, 'description', e.target.value)}
                  className="mb-2"
                />
                <div className="flex justify-between items-center">
                  <Input
                    type="number"
                    placeholder="Sort Order"
                    value={img.sort_order}
                    onChange={(e) => updateBulkImage(index, 'sort_order', parseInt(e.target.value))}
                    className="w-24"
                  />
                  <Button variant="destructive" size="sm" onClick={() => removeBulkImage(index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            {bulkImages.length > 0 && (
              <Button onClick={createBulkImages} className="w-full">Create Product Group</Button>
            )}
          </div>
        </div>
      </div>

      {/* Image List */}
      <div className="bg-white shadow-md rounded-md p-4 mt-4">
        <h2 className="text-lg font-semibold mb-4">Image List</h2>
        <Table>
          <TableCaption>A list of your recent images.</TableCaption>
          <TableHead>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Group</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHead>
          <TableBody>
            {images.map((image) => (
              <TableRow key={image.id} onClick={() => handleImageSelect(image)} className="cursor-pointer hover:bg-gray-100">
                <TableCell className="font-medium">{image.original_name}</TableCell>
                <TableCell>{image.display_location}</TableCell>
                <TableCell>{image.product_group}</TableCell>
                <TableCell className="text-right">{image.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductManager;
