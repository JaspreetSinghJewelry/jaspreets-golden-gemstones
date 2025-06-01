
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Truck, Search, Package, Clock, CheckCircle, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TrackOrderModal = ({ isOpen, onClose }: TrackOrderModalProps) => {
  const [trackingId, setTrackingId] = useState('');
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const mockOrderStatuses = [
    { status: 'Order Confirmed', date: '2024-06-01 10:30 AM', completed: true, icon: CheckCircle },
    { status: 'Processing', date: '2024-06-01 02:15 PM', completed: true, icon: Package },
    { status: 'Shipped', date: '2024-06-02 09:00 AM', completed: true, icon: Truck },
    { status: 'Out for Delivery', date: 'Expected today', completed: false, icon: MapPin },
  ];

  const handleTrackOrder = () => {
    if (!trackingId.trim()) {
      toast({
        title: "Invalid Tracking ID",
        description: "Please enter a valid tracking ID.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (trackingId.startsWith('JS')) {
        setOrderStatus({
          trackingId,
          customerName: 'John Doe',
          orderDate: '2024-06-01',
          expectedDelivery: '2024-06-03',
          currentStatus: 'Shipped',
          statuses: mockOrderStatuses
        });
        toast({
          title: "Order Found!",
          description: "Your order details have been loaded.",
        });
      } else {
        toast({
          title: "Order Not Found",
          description: "Please check your tracking ID and try again.",
          variant: "destructive",
        });
        setOrderStatus(null);
      }
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrackOrder();
    }
  };

  const resetModal = () => {
    setTrackingId('');
    setOrderStatus(null);
    setIsLoading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Track Your Order</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tracking-id">Tracking ID</Label>
            <div className="flex gap-2">
              <Input
                id="tracking-id"
                placeholder="Enter your tracking ID (e.g., JS123456789)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                onKeyDown={handleKeyDown}
                autoFocus
                disabled={isLoading}
              />
              <Button 
                onClick={handleTrackOrder} 
                disabled={isLoading}
                className="bg-gradient-to-r from-[#0D0C29] to-purple-800 text-white hover:from-purple-900 hover:to-[#0D0C29]"
              >
                {isLoading ? (
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Track
              </Button>
            </div>
          </div>

          {/* Order Status Display */}
          {orderStatus && (
            <div className="space-y-4 mt-6">
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <h3 className="font-bold text-lg text-green-800 mb-2">Order Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Tracking ID:</p>
                    <p className="font-semibold">{orderStatus.trackingId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Order Date:</p>
                    <p className="font-semibold">{orderStatus.orderDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Current Status:</p>
                    <p className="font-semibold text-blue-600">{orderStatus.currentStatus}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Expected Delivery:</p>
                    <p className="font-semibold">{orderStatus.expectedDelivery}</p>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Order Timeline</h4>
                {orderStatus.statuses.map((status: any, index: number) => {
                  const IconComponent = status.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        status.completed 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          status.completed ? 'text-gray-800' : 'text-gray-500'
                        }`}>
                          {status.status}
                        </p>
                        <p className="text-sm text-gray-500">{status.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrackOrderModal;
