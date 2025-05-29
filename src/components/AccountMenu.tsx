
import React, { useState } from 'react';
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
import TrackOrderModal from './TrackOrderModal';

interface AccountMenuProps {
  children: React.ReactNode;
}

const AccountMenu = ({ children }: AccountMenuProps) => {
  const { user, logout } = useAuth();
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);

  const handleOrderHistory = () => {
    console.log('Order History clicked');
    // Add navigation logic here
  };

  const handleTrackOrder = () => {
    setIsTrackOrderOpen(true);
  };

  const handleContactUs = () => {
    // Redirect to social media and store location
    const options = [
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/jaspreetsinghjewelry/'
      },
      {
        name: 'Facebook', 
        url: 'https://www.facebook.com/jaspreetsinghjewelry/?locale=es_ES'
      },
      {
        name: 'Store Location',
        url: 'https://www.google.com/maps/place/Jaspreet+Singh+Jewelry/@28.6508732,77.1944579,17z/data=!3m1!4b1!4m6!3m5!1s0x390d0340ec032af1:0x308f4120a3d3baa5!8m2!3d28.6508732!4d77.1944579!16s%2Fg%2F11sy3t7knv?entry=ttu&g_ep=EgoyMDI1MDUyNi4wIKXMDSoASAFQAw%3D%3D'
      }
    ];

    const choice = window.confirm(
      'Choose how to contact us:\n\n' +
      '1. Instagram\n' +
      '2. Facebook\n' +
      '3. Store Location\n\n' +
      'Click OK for Instagram, Cancel to see other options'
    );

    if (choice) {
      window.open(options[0].url, '_blank');
    } else {
      const secondChoice = window.confirm('Click OK for Facebook, Cancel for Store Location');
      if (secondChoice) {
        window.open(options[1].url, '_blank');
      } else {
        window.open(options[2].url, '_blank');
      }
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
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
      <TrackOrderModal isOpen={isTrackOrderOpen} onClose={() => setIsTrackOrderOpen(false)} />
    </>
  );
};

export default AccountMenu;
