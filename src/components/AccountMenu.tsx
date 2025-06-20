
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
import { useNavigate } from 'react-router-dom';
import TrackOrderModal from './TrackOrderModal';
import { toast } from '@/hooks/use-toast';

interface AccountMenuProps {
  children: React.ReactNode;
}

const AccountMenu = ({ children }: AccountMenuProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);

  const handleOrderHistory = () => {
    navigate('/order-history');
  };

  const handleTrackOrder = () => {
    setIsTrackOrderOpen(true);
  };

  const handleContactUs = () => {
    // Scroll to footer section
    const footer = document.querySelector('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <div className="px-2 py-1.5 text-sm font-medium text-gray-900">
            Hello, {user?.user_metadata?.full_name || user?.email || 'User'}!
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
