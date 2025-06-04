
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface AutoUploadToggleProps {
  autoUpload: boolean;
  onToggle: (enabled: boolean) => void;
  disabled: boolean;
}

const AutoUploadToggle: React.FC<AutoUploadToggleProps> = ({
  autoUpload,
  onToggle,
  disabled
}) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <Label htmlFor="auto-upload" className="text-base font-medium">
          Auto Upload
        </Label>
        <p className="text-sm text-gray-600 mt-1">
          Automatically upload when product name, first image, and price are set
        </p>
      </div>
      <Switch
        id="auto-upload"
        checked={autoUpload}
        onCheckedChange={onToggle}
        disabled={disabled}
      />
    </div>
  );
};

export default AutoUploadToggle;
