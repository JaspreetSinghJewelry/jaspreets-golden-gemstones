
import React, { useRef, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, RotateCcw, Download, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VirtualTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  productImage?: string;
  productName?: string;
  productCategory?: string;
}

const VirtualTryOn = ({ isOpen, onClose, productImage, productName, productCategory }: VirtualTryOnProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsStreaming(true);
        toast({
          title: "Camera started",
          description: "Position yourself to try on the product!",
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use virtual try-on feature.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsStreaming(false);
    }
  };

  const switchCamera = () => {
    stopCamera();
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the video frame
        ctx.drawImage(video, 0, 0);
        
        // If we have a product image, overlay it
        if (productImage) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            // Calculate position based on product category
            let x, y, width, height;
            
            switch (productCategory) {
              case 'necklaces':
                x = canvas.width * 0.3;
                y = canvas.height * 0.25;
                width = canvas.width * 0.4;
                height = canvas.height * 0.3;
                break;
              case 'earrings':
                // Draw on both sides for earrings
                width = canvas.width * 0.08;
                height = canvas.height * 0.12;
                // Left earring
                x = canvas.width * 0.25;
                y = canvas.height * 0.15;
                ctx.drawImage(img, x, y, width, height);
                // Right earring
                x = canvas.width * 0.67;
                ctx.drawImage(img, x, y, width, height);
                break;
              case 'rings':
                x = canvas.width * 0.45;
                y = canvas.height * 0.6;
                width = canvas.width * 0.1;
                height = canvas.height * 0.08;
                break;
              case 'bracelets':
                x = canvas.width * 0.2;
                y = canvas.height * 0.5;
                width = canvas.width * 0.25;
                height = canvas.height * 0.15;
                break;
              default:
                x = canvas.width * 0.3;
                y = canvas.height * 0.3;
                width = canvas.width * 0.4;
                height = canvas.height * 0.3;
            }
            
            if (productCategory !== 'earrings') {
              ctx.drawImage(img, x, y, width, height);
            }
            
            // Download the image
            canvas.toBlob(blob => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `virtual-tryOn-${productName || 'jewelry'}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                toast({
                  title: "Photo captured!",
                  description: "Your virtual try-on photo has been saved.",
                });
              }
            });
          };
          img.src = productImage;
        } else {
          // Just capture without product overlay
          canvas.toBlob(blob => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'virtual-tryOn-photo.png';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              
              toast({
                title: "Photo captured!",
                description: "Your photo has been saved.",
              });
            }
          });
        }
      }
    }
  };

  useEffect(() => {
    if (isOpen && facingMode) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">
            Virtual Try-On{productName ? ` - ${productName}` : ''}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-96 object-cover"
              style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
            />
            
            {!isStreaming && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="text-center">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Camera not started</p>
                </div>
              </div>
            )}
            
            {/* Overlay guides for different jewelry types */}
            {isStreaming && productCategory && (
              <div className="absolute inset-0 pointer-events-none">
                {productCategory === 'necklaces' && (
                  <div className="absolute top-1/4 left-1/3 w-1/3 h-1/3 border-2 border-white/50 rounded-full" />
                )}
                {productCategory === 'earrings' && (
                  <>
                    <div className="absolute top-1/6 left-1/4 w-8 h-12 border-2 border-white/50 rounded-full" />
                    <div className="absolute top-1/6 right-1/4 w-8 h-12 border-2 border-white/50 rounded-full" />
                  </>
                )}
                {productCategory === 'rings' && (
                  <div className="absolute top-3/5 left-1/2 transform -translate-x-1/2 w-16 h-12 border-2 border-white/50 rounded-lg" />
                )}
                {productCategory === 'bracelets' && (
                  <div className="absolute top-1/2 left-1/5 w-1/4 h-1/6 border-2 border-white/50 rounded-full" />
                )}
              </div>
            )}
          </div>
          
          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />
          
          <div className="flex justify-center gap-4">
            {!isStreaming ? (
              <Button onClick={startCamera} className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                Start Camera
              </Button>
            ) : (
              <>
                <Button 
                  onClick={stopCamera} 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <CameraOff className="h-4 w-4" />
                  Stop Camera
                </Button>
                
                <Button 
                  onClick={switchCamera}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Flip Camera
                </Button>
                
                <Button 
                  onClick={capturePhoto}
                  className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white"
                >
                  <Download className="h-4 w-4" />
                  Capture Photo
                </Button>
              </>
            )}
          </div>
          
          <div className="text-center text-sm text-gray-600">
            <p>Position yourself in front of the camera and align with the guides to try on the jewelry.</p>
            {productCategory && (
              <p className="mt-1">Optimized for: {productCategory}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualTryOn;
