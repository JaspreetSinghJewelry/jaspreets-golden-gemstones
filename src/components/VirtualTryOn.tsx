
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
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [productImageLoaded, setProductImageLoaded] = useState<HTMLImageElement | null>(null);

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

  // Load and preprocess product image
  useEffect(() => {
    if (productImage) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setProductImageLoaded(img);
      };
      img.onerror = () => {
        console.error('Failed to load product image');
      };
      img.src = productImage;
    }
  }, [productImage]);

  // Real-time overlay rendering
  useEffect(() => {
    if (!isStreaming || !productImageLoaded || !overlayCanvasRef.current || !videoRef.current) return;

    const renderOverlay = () => {
      const canvas = overlayCanvasRef.current!;
      const video = videoRef.current!;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      // Set canvas size to match video
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw product overlay
      drawProductOverlay(ctx, canvas.width, canvas.height);
      
      // Continue animation
      if (isStreaming) {
        requestAnimationFrame(renderOverlay);
      }
    };

    renderOverlay();
  }, [isStreaming, productImageLoaded, productCategory]);

  const drawProductOverlay = (ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) => {
    if (!productImageLoaded) return;

    // Improved positioning based on category with better proportions
    switch (productCategory) {
      case 'necklaces':
        // Position around neck area
        const necklaceX = canvasWidth * 0.2;
        const necklaceY = canvasHeight * 0.25;
        const necklaceWidth = canvasWidth * 0.6;
        const necklaceHeight = canvasHeight * 0.35;
        
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.drawImage(productImageLoaded, necklaceX, necklaceY, necklaceWidth, necklaceHeight);
        ctx.restore();
        break;
        
      case 'earrings':
        // Position on both ears
        const earSize = Math.min(canvasWidth, canvasHeight) * 0.08;
        const earY = canvasHeight * 0.15;
        
        // Left earring (appears on right side due to mirror effect)
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.drawImage(productImageLoaded, canvasWidth * 0.75, earY, earSize, earSize * 1.2);
        
        // Right earring (appears on left side due to mirror effect)
        ctx.scale(-1, 1);
        ctx.drawImage(productImageLoaded, -canvasWidth * 0.25, earY, earSize, earSize * 1.2);
        ctx.restore();
        break;
        
      case 'rings':
        // Position on ring finger area
        const ringX = canvasWidth * 0.35;
        const ringY = canvasHeight * 0.6;
        const ringWidth = canvasWidth * 0.15;
        const ringHeight = canvasHeight * 0.08;
        
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.drawImage(productImageLoaded, ringX, ringY, ringWidth, ringHeight);
        ctx.restore();
        break;
        
      case 'bracelets':
        // Position on wrist area
        const braceletX = canvasWidth * 0.05;
        const braceletY = canvasHeight * 0.5;
        const braceletWidth = canvasWidth * 0.25;
        const braceletHeight = canvasHeight * 0.15;
        
        ctx.save();
        ctx.globalAlpha = 0.9;
        ctx.drawImage(productImageLoaded, braceletX, braceletY, braceletWidth, braceletHeight);
        ctx.restore();
        break;
        
      default:
        // Default positioning
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.drawImage(productImageLoaded, canvasWidth * 0.25, canvasHeight * 0.3, canvasWidth * 0.5, canvasHeight * 0.4);
        ctx.restore();
    }
  };

  const getGuidePosition = (category: string) => {
    switch (category) {
      case 'necklaces':
        return { top: '25%', left: '20%', width: '60%', height: '35%', shape: 'rounded-full' };
      case 'earrings':
        return [
          { top: '15%', left: '15%', width: '8%', height: '12%', shape: 'rounded-full' },
          { top: '15%', right: '15%', width: '8%', height: '12%', shape: 'rounded-full' }
        ];
      case 'rings':
        return { top: '60%', left: '35%', width: '15%', height: '8%', shape: 'rounded-lg' };
      case 'bracelets':
        return { top: '50%', left: '5%', width: '25%', height: '15%', shape: 'rounded-full' };
      default:
        return { top: '30%', left: '25%', width: '50%', height: '40%', shape: 'rounded-lg' };
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
      
      // Add product overlay
      if (productImageLoaded) {
        drawProductOverlay(ctx, canvas.width, canvas.height);
      }
      
      downloadImage(canvas);
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

  const guidePositions = productCategory ? getGuidePosition(productCategory) : null;

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
            
            {/* Overlay Canvas for real-time product overlay */}
            <canvas
              ref={overlayCanvasRef}
              className="absolute inset-0 w-full h-96 object-cover pointer-events-none"
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
            {isStreaming && guidePositions && (
              <div className="absolute inset-0 pointer-events-none">
                {Array.isArray(guidePositions) ? (
                  // Multiple guides (earrings)
                  guidePositions.map((guide, index) => (
                    <div
                      key={index}
                      className={`absolute border-2 border-white/70 ${guide.shape}`}
                      style={{
                        top: guide.top,
                        left: guide.left,
                        right: guide.right,
                        width: guide.width,
                        height: guide.height
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                        {index === 0 ? 'Left Ear' : 'Right Ear'}
                      </div>
                    </div>
                  ))
                ) : (
                  // Single guide
                  <div
                    className={`absolute border-2 border-white/70 ${guidePositions.shape}`}
                    style={{
                      top: guidePositions.top,
                      left: guidePositions.left,
                      width: guidePositions.width,
                      height: guidePositions.height
                    }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                      {productCategory === 'necklaces' && 'Necklace Area'}
                      {productCategory === 'rings' && 'Ring Area'}
                      {productCategory === 'bracelets' && 'Bracelet Area'}
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
              <li>4. The product will overlay automatically</li>
              <li>5. Click "Capture Photo" to save your try-on</li>
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
