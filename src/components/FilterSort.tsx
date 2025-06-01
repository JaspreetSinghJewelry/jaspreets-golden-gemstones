
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface FilterSortProps {
  onFiltersChange?: (filters: any) => void;
  onSortChange?: (sort: string) => void;
}

const FilterSort = ({ onFiltersChange, onSortChange }: FilterSortProps) => {
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    jewelryType: [],
    purity: [],
    diamondClarity: [],
    metalColor: []
  });

  const jewelryTypes = ['Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Pendants'];
  const purityOptions = ['14K', '18K', '22K', '24K', '925 Silver', 'Platinum'];
  const diamondClarityOptions = ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'];
  const metalColors = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Silver', 'Platinum'];

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category as keyof typeof prev], value]
        : prev[category as keyof typeof prev].filter((item: string) => item !== value)
    }));
  };

  return (
    <div className="bg-white border rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex gap-4 items-center">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            <Select onValueChange={onSortChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {showFilters && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3 text-gray-800">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100000}
                  min={0}
                  step={1000}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              {/* Jewelry Type */}
              <div>
                <h4 className="font-medium mb-3 text-gray-800">Jewelry Type</h4>
                <div className="space-y-2">
                  {jewelryTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={type}
                        onCheckedChange={(checked) => 
                          handleFilterChange('jewelryType', type, checked as boolean)
                        }
                      />
                      <label htmlFor={type} className="text-sm text-gray-600">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Purity */}
              <div>
                <h4 className="font-medium mb-3 text-gray-800">Purity</h4>
                <div className="space-y-2">
                  {purityOptions.map((purity) => (
                    <div key={purity} className="flex items-center space-x-2">
                      <Checkbox
                        id={purity}
                        onCheckedChange={(checked) => 
                          handleFilterChange('purity', purity, checked as boolean)
                        }
                      />
                      <label htmlFor={purity} className="text-sm text-gray-600">
                        {purity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diamond Clarity */}
              <div>
                <h4 className="font-medium mb-3 text-gray-800">Diamond Clarity</h4>
                <div className="space-y-2">
                  {diamondClarityOptions.map((clarity) => (
                    <div key={clarity} className="flex items-center space-x-2">
                      <Checkbox
                        id={clarity}
                        onCheckedChange={(checked) => 
                          handleFilterChange('diamondClarity', clarity, checked as boolean)
                        }
                      />
                      <label htmlFor={clarity} className="text-sm text-gray-600">
                        {clarity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metal Color */}
              <div>
                <h4 className="font-medium mb-3 text-gray-800">Metal Color</h4>
                <div className="space-y-2">
                  {metalColors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={color}
                        onCheckedChange={(checked) => 
                          handleFilterChange('metalColor', color, checked as boolean)
                        }
                      />
                      <label htmlFor={color} className="text-sm text-gray-600">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button 
                onClick={() => onFiltersChange?.(selectedFilters)}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                Apply Filters
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedFilters({
                    jewelryType: [],
                    purity: [],
                    diamondClarity: [],
                    metalColor: []
                  });
                  setPriceRange([0, 100000]);
                }}
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FilterSort;
