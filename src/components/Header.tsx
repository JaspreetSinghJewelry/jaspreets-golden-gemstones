
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, ShoppingBag, User, Heart, ChevronDown, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer';
import AccountMenu from './AccountMenu';
import { useAuth } from '@/hooks/useAuth';
import SearchModal from './SearchModal';
import UploadedImages from './UploadedImages';
import ProductDetailModal from './ProductDetailModal';
import { supabase } from '@/integrations/supabase/client';

interface ProductGroup {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  category: string;
  images: Array<{
    id: string;
    url: string;
    description?: string;
  }>;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopNowOpen, setIsShopNowOpen] = useState(false);
  const [shopNowProducts, setShopNowProducts] = useState<ProductGroup[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductGroup | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const searchButtonRef = useRef<HTMLButtonElement>(null);
 
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Lab Grown Diamonds', path: '/lab-grown-diamonds' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const collectionItems = [
    { name: 'Rings', path: '/rings' },
    { name: 'Necklaces', path: '/necklaces' },
    { name: 'Earrings', path: '/earrings' },
    { name: 'Bracelets', path: '/bracelets' },
  ];

  // Fetch featured products for Shop Now dropdown
  useEffect(() => {
    const fetchShopNowProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(8);

        if (error) {
          console.error('Error fetching shop now products:', error);
          return;
        }

        // Group images by product_group and take first 4 products
        const groupedProducts = new Map<string, ProductGroup>();

        data?.forEach((item) => {
          const groupId = item.product_group;
          const imageUrl = supabase.storage.from('images').getPublicUrl(item.file_path).data.publicUrl;
          
          if (!groupedProducts.has(groupId)) {
            groupedProducts.set(groupId, {
              id: parseInt(groupId.replace(/-/g, '').substring(0, 8), 16).toString(),
              name: item.description || item.original_name || 'Jewelry Piece',
              description: item.description || 'Elegant handcrafted design with premium materials',
              price: item.price ? `₹${item.price.toLocaleString()}` : 'Price on request',
              originalPrice: item.price ? `₹${(item.price * 1.2).toLocaleString()}` : undefined,
              category: item.display_location || 'jewelry',
              images: []
            });
          }

          const productGroup = groupedProducts.get(groupId)!;
          productGroup.images.push({
            id: item.id,
            url: imageUrl,
            description: item.description || undefined
          });
        });

        setShopNowProducts(Array.from(groupedProducts.values()).slice(0, 4));
      } catch (error) {
        console.error('Error in fetchShopNowProducts:', error);
      }
    };

    fetchShopNowProducts();
  }, []);

  const handleUserAction = () => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  const handleProductClick = (product: ProductGroup) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
    setIsShopNowOpen(false);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <header className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 py-2 shadow-sm sticky top-0 bg-white z-50">
      {/* Logo */}
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <img 
          src="/lovable-uploads/deffbc69-707d-4995-91d2-a22c4a999179.png" 
          alt="Jaspreet Singh Jewelry" 
          className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto"
        />
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-6 text-sm">
        <button
          onClick={() => navigate('/')}
          className="text-black hover:text-gray-600 transition-colors"
        >
          Home
        </button>
        
        <button
          onClick={() => navigate('/about')}
          className="text-black hover:text-gray-600 transition-colors"
        >
          About Us
        </button>
        
        {/* Collections Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-black hover:text-gray-600 transition-colors flex items-center">
              Collections
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border shadow-lg z-50">
            {collectionItems.map((item) => (
              <DropdownMenuItem
                key={item.name}
                onClick={() => navigate(item.path)}
                className="cursor-pointer hover:bg-gray-100"
              >
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          onClick={() => navigate('/lab-grown-diamonds')}
          className="text-black hover:text-gray-600 transition-colors"
        >
          Lab Grown Diamonds
        </button>
        
        <button
          onClick={() => navigate('/contact')}
          className="text-black hover:text-gray-600 transition-colors"
        >
          Contact Us
        </button>
      </nav>

      {/* Actions */}
      <div className="flex items-center space-x-2 md:space-x-4">
        <Button 
          ref={searchButtonRef}
          variant="ghost" 
          size="icon" 
          className="text-gray-600 hover:text-black h-8 w-8 md:h-10 md:w-10"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-4 w-4 md:h-5 md:w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-600 hover:text-black relative h-8 w-8 md:h-10 md:w-10"
          onClick={handleWishlistClick}
        >
          <Heart className="h-4 w-4 md:h-5 md:w-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-black text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
        </Button>
        
        {isAuthenticated ? (
          <AccountMenu>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-black h-8 w-8 md:h-10 md:w-10">
              <User className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
          </AccountMenu>
        ) : (
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:text-black h-8 w-8 md:h-10 md:w-10"
            onClick={handleUserAction}
          >
            <User className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        )}
        
        <CartDrawer>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-black relative h-8 w-8 md:h-10 md:w-10">
            <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-black text-white text-xs rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Button>
        </CartDrawer>

        {/* Shop Now Dropdown */}
        <DropdownMenu open={isShopNowOpen} onOpenChange={setIsShopNowOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-black text-white px-2 py-1 md:px-4 md:py-2 rounded-full hover:bg-gray-800 text-xs md:text-sm hidden sm:block"
            >
              Shop Now
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-96 p-4 bg-white border shadow-lg z-50" align="end">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Featured Products</h3>
              <div className="grid grid-cols-2 gap-4">
                {shopNowProducts.map((product) => (
                  <div key={product.id} className="space-y-2">
                    <div className="relative group">
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg cursor-pointer"
                        onClick={() => handleProductClick(product)}
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      {/* Circular View Details Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-2 right-2 bg-black/70 hover:bg-black text-white rounded-full h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-center">
                      <h4 className="font-medium text-sm truncate">{product.name}</h4>
                      <p className="text-black font-semibold text-sm">{product.price}</p>
                      <button
                        onClick={() => handleProductClick(product)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Click to view details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center pt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    navigate('/products');
                    setIsShopNowOpen(false);
                  }}
                >
                  View All Products
                </Button>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-gray-600 h-8 w-8 md:h-10 md:w-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-4 w-4 md:h-5 md:w-5" /> : <Menu className="h-4 w-4 md:h-5 md:w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation - Desktop-like layout */}
      {isMenuOpen && (
        <nav className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t z-50 min-w-full overflow-x-auto">
          <div className="flex flex-row items-center justify-start p-4 space-x-6 min-w-max">
            <button
              onClick={() => {
                navigate('/');
                setIsMenuOpen(false);
              }}
              className="text-black hover:text-gray-600 transition-colors whitespace-nowrap text-sm font-medium"
            >
              Home
            </button>
            
            <button
              onClick={() => {
                navigate('/about');
                setIsMenuOpen(false);
              }}
              className="text-black hover:text-gray-600 transition-colors whitespace-nowrap text-sm font-medium"
            >
              About Us
            </button>
            
            {/* Mobile Collections Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-black hover:text-gray-600 transition-colors flex items-center whitespace-nowrap text-sm font-medium">
                  Collections
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border shadow-lg z-50">
                {collectionItems.map((item) => (
                  <DropdownMenuItem
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <button
              onClick={() => {
                navigate('/lab-grown-diamonds');
                setIsMenuOpen(false);
              }}
              className="text-black hover:text-gray-600 transition-colors whitespace-nowrap text-sm font-medium"
            >
              Lab Grown Diamonds
            </button>
            
            <button
              onClick={() => {
                navigate('/contact');
                setIsMenuOpen(false);
              }}
              className="text-black hover:text-gray-600 transition-colors whitespace-nowrap text-sm font-medium"
            >
              Contact Us
            </button>
            
            <Button
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 text-sm whitespace-nowrap ml-4"
              onClick={() => {
                navigate('/products');
                setIsMenuOpen(false);
              }}
            >
              Shop Now
            </Button>
          </div>
        </nav>
      )}

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        triggerRef={searchButtonRef}
      />

      <ProductDetailModal 
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
      />
    </header>
  );
};

export default Header;
