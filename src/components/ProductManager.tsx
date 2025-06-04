import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Trash2, Edit, Save, X, Eye, ChevronDown, ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

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
}

interface EditingProduct {
  id: string;
  description: string;
  price: string;
  display_location: string;
  is_active: boolean;
  product_group: string;
}

const ProductManager = () => {
  const [products, setProducts] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<EditingProduct | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [bulkLocation, setBulkLocation] = useState('rings');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products...');
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: `Failed to fetch products: ${error.message}`,
          variant: "destructive"
        });
      } else {
        console.log('Products fetched successfully:', data);
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    console.log('Files selected:', files.length);
  };

  const generateProductGroup = () => {
    return `product_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  };

  const handleBulkUpload = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to upload",
        variant: "destructive"
      });
      return;
    }

    if (!productName.trim()) {
      toast({
        title: "Product Name Required",
        description: "Please enter a product name",
        variant: "destructive"
      });
      return;
    }

    if (!productPrice.trim() || isNaN(Number(productPrice)) || Number(productPrice) <= 0) {
      toast({
        title: "Valid Price Required",
        description: "Please enter a valid price greater than 0",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    let successCount = 0;
    let errorCount = 0;
    const productGroup = generateProductGroup();

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
        const fileName = `${timestamp}_${i}_${Math.random().toString(36).substring(2)}.${fileExt}`;

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
            display_location: bulkLocation,
            description: productName.trim(),
            price: Number(productPrice),
            is_active: true,
            sort_order: i,
            product_group: productGroup
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
    setSelectedFiles([]);
    setProductName('');
    setProductPrice('');

    if (successCount > 0) {
      toast({
        title: "Upload Complete",
        description: `${successCount} images uploaded successfully for product "${productName}"${errorCount > 0 ? `, ${errorCount} failed` : ''}`
      });
      fetchProducts();
    } else {
      toast({
        title: "Upload Failed",
        description: "No images were uploaded successfully",
        variant: "destructive"
      });
    }

    // Reset file input
    const fileInput = document.getElementById('bulkFiles') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const startEditing = (product: ProductImage) => {
    setEditingProduct({
      id: product.id,
      description: product.description || '',
      price: product.price?.toString() || '0',
      display_location: product.display_location || 'rings',
      is_active: product.is_active || true,
      product_group: product.product_group || ''
    });
  };

  const saveEdit = async () => {
    if (!editingProduct) return;

    try {
      const { error } = await supabase
        .from('images')
        .update({
          description: editingProduct.description.trim(),
          price: Number(editingProduct.price),
          display_location: editingProduct.display_location,
          is_active: editingProduct.is_active,
          product_group: editingProduct.product_group
        })
        .eq('id', editingProduct.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product updated successfully"
      });

      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      console.error('Update error:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update product",
        variant: "destructive"
      });
    }
  };

  const deleteProduct = async (product: ProductImage) => {
    if (!confirm(`Are you sure you want to delete "${product.original_name}"?`)) {
      return;
    }

    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('images')
        .delete()
        .eq('id', product.id);

      if (dbError) throw dbError;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('images')
        .remove([product.file_path]);

      if (storageError) {
        console.error('Storage delete error (non-critical):', storageError);
      }

      toast({
        title: "Success",
        description: "Product deleted successfully"
      });

      fetchProducts();
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete product",
        variant: "destructive"
      });
    }
  };

  const bulkDelete = async () => {
    if (selectedProducts.length === 0) {
      toast({
        title: "No Products Selected",
        description: "Please select products to delete",
        variant: "destructive"
      });
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedProducts.length} selected products?`)) {
      return;
    }

    try {
      // Get file paths for storage cleanup
      const productsToDelete = products.filter(p => selectedProducts.includes(p.id));
      const filePaths = productsToDelete.map(p => p.file_path);

      // Delete from database
      const { error: dbError } = await supabase
        .from('images')
        .delete()
        .in('id', selectedProducts);

      if (dbError) throw dbError;

      // Delete from storage
      if (filePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from('images')
          .remove(filePaths);

        if (storageError) {
          console.error('Storage delete error (non-critical):', storageError);
        }
      }

      toast({
        title: "Success",
        description: `${selectedProducts.length} products deleted successfully`
      });

      setSelectedProducts([]);
      fetchProducts();
    } catch (error: any) {
      console.error('Bulk delete error:', error);
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete products",
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
    if (!price) return '₹0';
    return `₹${price.toLocaleString()}`;
  };

  const getLocationLabel = (location: string | null) => {
    switch (location) {
      case 'rings': return 'Rings';
      case 'necklaces': return 'Necklaces';
      case 'earrings': return 'Earrings';
      case 'bracelets': return 'Bracelets';
      case 'lab-grown-diamonds': return 'Lab Grown Diamonds';
      case 'best-sellers': return 'Best Sellers';
      default: return location || 'Unknown';
    }
  };

  const getCategoryProducts = (category: string) => {
    if (category === 'all') return products;
    return products.filter(product => product.display_location === category);
  };

  const groupProductsByGroup = (products: ProductImage[]) => {
    const grouped: { [key: string]: ProductImage[] } = {};
    
    products.forEach(product => {
      const groupKey = product.product_group || product.id;
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(product);
    });

    // Sort images within each group by sort_order
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
    });

    return grouped;
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'rings', label: 'Rings' },
    { value: 'necklaces', label: 'Necklaces' },
    { value: 'earrings', label: 'Earrings' },
    { value: 'bracelets', label: 'Bracelets' },
    { value: 'lab-grown-diamonds', label: 'Lab Grown Diamonds' },
    { value: 'best-sellers', label: 'Best Sellers' }
  ];

  const filteredProducts = getCategoryProducts(selectedCategory);
  const groupedProducts = groupProductsByGroup(filteredProducts);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Bulk Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Multiple Product Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name (e.g., Diamond Solitaire Ring)"
                disabled={uploading}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="productPrice">Product Price (₹)</Label>
              <Input
                id="productPrice"
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="Enter price in rupees"
                disabled={uploading}
                className="mt-2"
                min="1"
                step="1"
              />
            </div>

            <div>
              <Label htmlFor="bulkFiles">Select Multiple Images (Different Angles)</Label>
              <Input
                id="bulkFiles"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                disabled={uploading}
                className="mt-2"
              />
              {selectedFiles.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  {selectedFiles.length} images selected for this product
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="bulkLocation">Collection Category</Label>
              <Select value={bulkLocation} onValueChange={setBulkLocation}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rings">Rings</SelectItem>
                  <SelectItem value="necklaces">Necklaces</SelectItem>
                  <SelectItem value="earrings">Earrings</SelectItem>
                  <SelectItem value="bracelets">Bracelets</SelectItem>
                  <SelectItem value="lab-grown-diamonds">Lab Grown Diamonds</SelectItem>
                  <SelectItem value="best-sellers">Best Sellers</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleBulkUpload}
              disabled={uploading || selectedFiles.length === 0 || !productName.trim() || !productPrice.trim()}
              className="w-full"
            >
              {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Images for "${productName || 'Product'}"`}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Collection Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Product Collection Management</CardTitle>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Label htmlFor="categoryFilter">Filter by Collection:</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-50">
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-gray-600">
                {Object.keys(groupedProducts).length} products
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {Object.keys(groupedProducts).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No products found in {selectedCategory === 'all' ? 'any category' : getLocationLabel(selectedCategory)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Object.entries(groupedProducts).map(([groupKey, productImages]) => {
                const mainProduct = productImages[0];
                return (
                  <Card key={groupKey} className="border rounded-lg overflow-hidden">
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={getImageUrl(mainProduct.file_path)}
                        alt={mainProduct.description || 'Product'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      {productImages.length > 1 && (
                        <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                          <ImageIcon className="h-3 w-3" />
                          {productImages.length}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3 space-y-2">
                      <div className="font-medium text-sm truncate">
                        {mainProduct.description || mainProduct.original_name}
                      </div>
                      <div className="text-sm font-semibold text-green-600">
                        {formatPrice(mainProduct.price)}
                      </div>
                      <div className="text-xs text-blue-600">
                        {getLocationLabel(mainProduct.display_location)}
                      </div>
                      {productImages.length > 1 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {productImages.slice(1, 4).map((img, idx) => (
                            <img
                              key={img.id}
                              src={getImageUrl(img.file_path)}
                              alt={`Product angle ${idx + 2}`}
                              className="w-8 h-8 object-cover rounded border"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.svg';
                              }}
                            />
                          ))}
                          {productImages.length > 4 && (
                            <div className="w-8 h-8 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-600">
                              +{productImages.length - 4}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex gap-1 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(getImageUrl(mainProduct.file_path), '_blank')}
                          className="flex-1 h-8 text-xs"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEditing(mainProduct)}
                          className="flex-1 h-8 text-xs"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteProduct(mainProduct)}
                          className="flex-1 h-8 text-xs"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      {editingProduct && (
        <Card className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CardContent className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
            <div className="space-y-4">
              <div>
                <Label>Description</Label>
                <Textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    description: e.target.value
                  })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    price: e.target.value
                  })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Collection</Label>
                <Select
                  value={editingProduct.display_location}
                  onValueChange={(value) => setEditingProduct({
                    ...editingProduct,
                    display_location: value
                  })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rings">Rings</SelectItem>
                    <SelectItem value="necklaces">Necklaces</SelectItem>
                    <SelectItem value="earrings">Earrings</SelectItem>
                    <SelectItem value="bracelets">Bracelets</SelectItem>
                    <SelectItem value="lab-grown-diamonds">Lab Grown Diamonds</SelectItem>
                    <SelectItem value="best-sellers">Best Sellers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={saveEdit} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductManager;
