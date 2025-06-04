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

  const createImage = async () => {
    const { data, error } = await supabase
      .from('images')
      .insert([newImage]);

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

        {/* Image List */}
        <div className="bg-white shadow-md rounded-md p-4">
          <h2 className="text-lg font-semibold mb-4">Image List</h2>
          <Table>
            <TableCaption>A list of your recent images.</TableCaption>
            <TableHead>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {images.map((image) => (
                <TableRow key={image.id} onClick={() => handleImageSelect(image)} className="cursor-pointer hover:bg-gray-100">
                  <TableCell className="font-medium">{image.original_name}</TableCell>
                  <TableCell>{image.display_location}</TableCell>
                  <TableCell className="text-right">{image.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
