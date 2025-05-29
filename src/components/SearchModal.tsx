
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
}

const SearchModal = ({ isOpen, onClose, triggerRef }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: triggerRect.bottom + window.scrollY + 8,
        left: triggerRect.left + window.scrollX
      });
    }
  }, [isOpen, triggerRef]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm);
      // Add search functionality here
      onClose();
      setSearchTerm('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/20" 
        onClick={onClose}
      />
      
      {/* Search Modal */}
      <div
        ref={modalRef}
        className="fixed z-50 bg-white rounded-lg shadow-xl border p-4 min-w-[320px]"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="flex items-center space-x-2 mb-2">
          <Search className="h-5 w-5 text-gray-500" />
          <span className="font-semibold text-gray-900">Search Jewelry</span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="ml-auto h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <Input
            placeholder="Search for rings, necklaces, earrings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
            autoFocus
          />
          <Button onClick={handleSearch} size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
