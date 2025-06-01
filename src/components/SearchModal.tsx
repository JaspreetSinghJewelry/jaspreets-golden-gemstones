
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

  // Sanitize search input to prevent XSS
  const sanitizeSearchInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>\"'&]/g, '') // Remove potential XSS characters
      .substring(0, 100); // Limit length
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeSearchInput(e.target.value);
    setSearchTerm(sanitized);
  };

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
    const searchQuery = sanitizeSearchInput(term || searchTerm);
    if (searchQuery.length < 2) {
      return; // Minimum search length
    }
    
    if (searchQuery.trim()) {
      console.log('SearchModal - Navigating to products with search:', searchQuery.trim());
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchTerm('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

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
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 border-2 border-gray-300 focus:border-[#0D0C29] focus:ring-[#0D0C29] bg-white text-gray-900 placeholder:text-gray-500"
            maxLength={100}
          />
          <Button 
            onClick={() => handleSearch()} 
            size="icon"
            className="bg-[#0D0C29] hover:bg-[#2A2857]"
            disabled={searchTerm.length < 2}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        {searchTerm && (
          <div className="border-t pt-3">
            <p className="text-sm text-gray-700 mb-2 font-medium">
              {filteredSuggestions.length > 0 ? 'Suggestions:' : 'No suggestions found'}
            </p>
            {filteredSuggestions.length > 0 && (
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors flex items-center gap-2 text-gray-800 hover:text-gray-900"
                  >
                    <Search className="h-3 w-3 text-gray-500" />
                    <span className="font-medium">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        {!searchTerm && (
          <div className="border-t pt-3">
            <p className="text-sm text-gray-700 mb-2 font-medium">Popular searches:</p>
            <div className="space-y-1">
              {searchSuggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded transition-colors flex items-center gap-2 text-gray-800 hover:text-gray-900"
                >
                  <Search className="h-3 w-3 text-gray-500" />
                  <span className="font-medium">{suggestion}</span>
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
