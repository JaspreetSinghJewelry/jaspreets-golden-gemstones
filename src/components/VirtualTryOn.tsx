
import React, { useRef, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, RotateCcw, Download, X, AlertCircle } from 'lucide-react';
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
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const startCamera = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Stop any existing stream first
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      // Request camera with specific constraints
      const constraints = {
        video: { 
          facingMode,
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          frameRate: { ideal: 30 }
        },
        audio: false
      };

      console.log('Requesting camera access with constraints:', constraints);
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        
        // Wait for the video to be ready
        await new Promise((resolve, reject) => {
          const video = videoRef.current!;
          video.onloadedmetadata = () => {
            video.play()
              .then(resolve)
              .catch(reject);
          };
          video.onerror = reject;
        });

        setStream(mediaStream);
        setIsStreaming(true);
        
        toast({
          title: "Camera started successfully!",
          description: "Position yourself in front of the camera to try on the product.",
        });
      }
    } catch (error: any) {
      console.error('Error accessing camera:', error);
      let errorMessage = 'Failed to access camera. ';
      
      if (error.name === 'NotAllowedError') {
        errorMessage += 'Please allow camera access in your browser settings.';
      } else if (error.name === 'NotFoundError') {
        errorMessage += 'No camera found on your device.';
      } else if (error.name === 'NotSupportedError') {
        errorMessage += 'Camera is not supported on this device.';
      } else {
        errorMessage += error.message || 'Unknown error occurred.';
      }
      
      setError(errorMessage);
      toast({
        title: "Camera Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped track:', track.label);
      });
      setStream(null);
      setIsStreaming(false);
      setError('');
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      toast({
        title: "Camera stopped",
        description: "Camera has been turned off.",
      });
    }
  };

  const switchCamera = async () => {
    console.log('Switching camera from', facingMode, 'to', facingMode === 'user' ? 'environment' : 'user');
    stopCamera();
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    
    // Small delay to ensure camera is properly stopped
    setTimeout(() => {
      startCamera();
    }, 500);
  };

  const getOverlayPosition = (category: string, canvasWidth: number, canvasHeight: number) => {
    // More accurate positioning based on typical face/body proportions
    switch (category) {
      case 'necklaces':
        return {
          x: canvasWidth * 0.25,
          y: canvasHeight * 0.35,
          width: canvasWidth * 0.5,
          height: canvasHeight * 0.25
        };
      case 'earrings':
        return [
          // Left earring
          {
            x: canvasWidth * 0.2,
            y: canvasHeight * 0.2,
            width: canvasWidth * 0.12,
            height: canvasHeight * 0.15
          },
          // Right earring
          {
            x: canvasWidth * 0.68,
            y: canvasHeight * 0.2,
            width: canvasWidth * 0.12,
            height: canvasHeight * 0.15
          }
        ];
      case 'rings':
        return {
          x: canvasWidth * 0.4,
          y: canvasHeight * 0.65,
          width: canvasWidth * 0.2,
          height: canvasHeight * 0.12
        };
      case 'bracelets':
        return {
          x: canvasWidth * 0.15,
          y: canvasHeight * 0.55,
          width: canvasWidth * 0.3,
          height: canvasHeight * 0.2
        };
      default:
        return {
          x: canvasWidth * 0.25,
          y: canvasHeight * 0.3,
          width: canvasWidth * 0.5,
          height: canvasHeight * 0.4
        };
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) {
      toast({
        title: "Cannot capture photo",
        description: "Camera is not active or video is not ready.",
        variant: "destructive"
      });
      return;
    }

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      console.log('Canvas dimensions:', canvas.width, 'x', canvas.height);
      
      // Mirror the image if using front camera
      if (facingMode === 'user') {
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
      } else {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
      
      // Add product overlay if available
      if (productImage && productCategory) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          const positions = getOverlayPosition(productCategory, canvas.width, canvas.height);
          
          if (Array.isArray(positions)) {
            // Handle earrings (multiple positions)
            positions.forEach(pos => {
              ctx.drawImage(img, pos.x, pos.y, pos.width, pos.height);
            });
          } else {
            // Handle single position items
            ctx.drawImage(img, positions.x, positions.y, positions.width, positions.height);
          }
          
          downloadImage(canvas);
        };
        
        img.onerror = () => {
          console.error('Failed to load product image');
          downloadImage(canvas);
        };
        
        img.src = productImage;
      } else {
        downloadImage(canvas);
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
      toast({
        title: "Capture failed",
        description: "Failed to capture photo. Please try again.",
        variant: "destructive"
      });
    }
  };

  const downloadImage = (canvas: HTMLCanvasElement) => {
    canvas.toBlob(blob => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `virtual-tryOn-${productName?.replace(/\s+/g, '-') || 'jewelry'}-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Photo saved!",
          description: "Your virtual try-on photo has been downloaded.",
        });
      } else {
        toast({
          title: "Download failed",
          description: "Failed to save the photo. Please try again.",
          variant: "destructive"
        });
      }
    }, 'image/png', 1.0);
  };

  // Auto-start camera when modal opens
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  // Cleanup on component unmount
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
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Video Container */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-96 object-cover"
              style={{ 
                transform: facingMode === 'user' ? 'scaleX(-1)' : 'none',
                display: isStreaming ? 'block' : 'none'
              }}
            />
            
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-2 border-gray-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Starting camera...</p>
                </div>
              </div>
            )}
            
            {/* No Camera State */}
            {!isStreaming && !isLoading && !error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 h-96">
                <div className="text-center">
                  <Camera className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Camera not started</p>
                  <p className="text-sm text-gray-500 mt-2">Click "Start Camera" to begin</p>
                </div>
              </div>
            )}
            
            {/* Positioning Guides */}
            {isStreaming && productCategory && (
              <div className="absolute inset-0 pointer-events-none">
                {productCategory === 'necklaces' && (
                  <div className="absolute top-1/3 left-1/4 w-1/2 h-1/4 border-2 border-white/70 rounded-full">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      Necklace Area
                    </div>
                  </div>
                )}
                {productCategory === 'earrings' && (
                  <>
                    <div className="absolute top-1/5 left-1/5 w-12 h-16 border-2 border-white/70 rounded-full">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                        Left Ear
                      </div>
                    </div>
                    <div className="absolute top-1/5 right-1/5 w-12 h-16 border-2 border-white/70 rounded-full">
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                        Right Ear
                      </div>
                    </div>
                  </>
                )}
                {productCategory === 'rings' && (
                  <div className="absolute top-2/3 left-2/5 w-1/5 h-1/8 border-2 border-white/70 rounded-lg">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      Hand Area
                    </div>
                  </div>
                )}
                {productCategory === 'bracelets' && (
                  <div className="absolute top-1/2 left-1/6 w-1/3 h-1/5 border-2 border-white/70 rounded-full">
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      Wrist Area
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} className="hidden" />
          
          {/* Control Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            {!isStreaming && !isLoading ? (
              <Button onClick={startCamera} className="flex items-center gap-2" disabled={isLoading}>
                <Camera className="h-4 w-4" />
                Start Camera
              </Button>
            ) : (
              <>
                <Button 
                  onClick={stopCamera} 
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={isLoading}
                >
                  <CameraOff className="h-4 w-4" />
                  Stop Camera
                </Button>
                
                <Button 
                  onClick={switchCamera}
                  variant="outline"
                  className="flex items-center gap-2"
                  disabled={isLoading}
                >
                  <RotateCcw className="h-4 w-4" />
                  Flip Camera
                </Button>
                
                <Button 
                  onClick={capturePhoto}
                  className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white"
                  disabled={!isStreaming || isLoading}
                >
                  <Download className="h-4 w-4" />
                  Capture Photo
                </Button>
              </>
            )}
          </div>
          
          {/* Instructions */}
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p className="font-medium">How to use Virtual Try-On:</p>
            <ol className="text-left max-w-md mx-auto space-y-1">
              <li>1. Allow camera access when prompted</li>
              <li>2. Position yourself within the guide lines</li>
              <li>3. Ensure good lighting for best results</li>
              <li>4. Click "Capture Photo" to save your try-on</li>
              <li>5. Use "Flip Camera" to switch between front/back camera</li>
            </ol>
            {productCategory && (
              <p className="mt-2 text-blue-600">
                Currently optimized for: <span className="font-medium">{productCategory}</span>
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualTryOn;
