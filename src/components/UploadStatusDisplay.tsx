
import React from 'react';

interface UploadStatusDisplayProps {
  uploading: boolean;
  autoUpload: boolean;
  selectedImageCount: number;
}

const UploadStatusDisplay: React.FC<UploadStatusDisplayProps> = ({
  uploading,
  autoUpload,
  selectedImageCount
}) => {
  if (uploading) {
    return (
      <div className="text-center py-4">
        <div className="text-lg font-medium text-blue-600">
          Creating Product Group with {selectedImageCount} Images...
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Please wait while we upload your images
        </div>
      </div>
    );
  }

  if (autoUpload) {
    return (
      <div className="text-center py-2">
        <div className="text-sm text-gray-600">
          Auto-upload enabled: Fill in product name, upload first image, and set price to automatically create product group
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-2">
      <div className="text-sm text-gray-600">
        Manual upload mode: Add images and click "Create Product Group" when ready
      </div>
    </div>
  );
};

export default UploadStatusDisplay;
