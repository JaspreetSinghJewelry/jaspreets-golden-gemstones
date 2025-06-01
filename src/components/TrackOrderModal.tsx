
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Truck, Search } from 'lucide-react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrackOrderModal = ({ isOpen, onClose }: TrackOrderModalProps) => {
  const [trackingId, setTrackingId] = useState('');

  const handleTrackOrder = () => {
    if (trackingId.trim()) {
      console.log('Tracking order with ID:', trackingId);
      // Add order tracking functionality here
      alert(`Tracking order: ${trackingId}`);
      onClose();
      setTrackingId('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrackOrder();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Track Your Order</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tracking-id">Tracking ID</Label>
            <Input
              id="tracking-id"
              placeholder="Enter your tracking ID"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
          <Button onClick={handleTrackOrder} className="w-full">
            <Search className="h-4 w-4 mr-2" />
            Track Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrackOrderModal;
