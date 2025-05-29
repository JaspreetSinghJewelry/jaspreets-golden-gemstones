
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, Package, Truck, MessageCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AccountMenuProps {
  children: React.ReactNode;
}

const AccountMenu = ({ children }: AccountMenuProps) => {
  const { user, logout } = useAuth();

  const handleOrderHistory = () => {
    console.log('Order History clicked');
    // Add navigation logic here
  };

  const handleTrackOrder = () => {
    console.log('Track Order clicked');
    // Add navigation logic here
  };

  const handleContactUs = () => {
    console.log('Contact Us clicked');
    // Add navigation logic here
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="px-2 py-1.5 text-sm font-medium text-gray-900">
          Hello, {user?.name || 'User'}!
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleOrderHistory} className="cursor-pointer">
          <Package className="mr-2 h-4 w-4" />
          Order History
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTrackOrder} className="cursor-pointer">
          <Truck className="mr-2 h-4 w-4" />
          Track Order
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleContactUs} className="cursor-pointer">
          <MessageCircle className="mr-2 h-4 w-4" />
          Contact Us
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
