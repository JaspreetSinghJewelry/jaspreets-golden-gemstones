
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
}

const SearchModal = ({ isOpen, onClose, triggerRef }: SearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const searchSuggestions = [
    'Diamond Rings',
    'Gold Necklaces',
    'Pearl Earrings',
    'Silver Bracelets',
    'Wedding Rings',
    'Engagement Rings',
    'Chain Necklaces',
    'Stud Earrings',
    'Tennis Bracelet',
    'Emerald Ring',
    'Lab Grown Diamonds',
    'Eco-Friendly Jewelry'
  ];

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: triggerRect.bottom + window.scrollY + 8,
        left: triggerRect.left + window.scrollX
      });
      
      // Focus the input when modal opens
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  }, [isOpen, triggerRef]);

  const handleSearch = (term?: string) => {
    const searchQuery = term || searchTerm;
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
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
        className="fixed z-50 bg-white rounded-lg shadow-xl border p-4 min-w-[320px] max-w-[400px] animate-fade-in"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="flex items-center space-x-2 mb-3">
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
        
        <div className="flex space-x-2 mb-3">
          <Input
            ref={inputRef}
            placeholder="Search for rings, necklaces, earrings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border-2 border-gray-300 focus:border-[#0D0C29] focus:ring-[#0D0C29] bg-white text-gray-900 placeholder:text-gray-500"
          />
          <Button 
            onClick={() => handleSearch()} 
            size="icon"
            className="bg-[#0D0C29] hover:bg-[#2A2857]"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        {searchTerm && (
          <div className="border-t pt-3">
            <p className="text-sm text-gray-600 mb-2">
              {filteredSuggestions.length > 0 ? 'Suggestions:' : 'No suggestions found'}
            </p>
            {filteredSuggestions.length > 0 && (
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
                  >
                    <Search className="h-3 w-3 text-gray-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {!searchTerm && (
          <div className="border-t pt-3">
            <p className="text-sm text-gray-600 mb-2">Popular searches:</p>
            <div className="space-y-1">
              {searchSuggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors flex items-center gap-2"
                >
                  <Search className="h-3 w-3 text-gray-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchModal;
