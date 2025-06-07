
import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterOptions, SortOption, Brand } from "@/data/instrumentsData";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Slider
} from "@/components/ui/slider";

interface FilterSortBarProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
  currentSort: SortOption;
  currentFilters: FilterOptions;
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({
  onFilterChange,
  onSortChange,
  currentSort,
  currentFilters
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);
  
  const brands: Brand[] = ["Roland", "Yamaha", "Korg"];
  const years = [2019, 2017, 2016];
  
  const handlePriceChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      priceRange: [value[0], value[1]] as [number, number]
    };
    setFilters(newFilters);
  };
  
  const handleBrandToggle = (brand: Brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
      
    const newFilters = {
      ...filters,
      brands: newBrands
    };
    setFilters(newFilters);
  };
  
  const handleYearToggle = (year: number) => {
    const newYears = filters.releaseYears.includes(year)
      ? filters.releaseYears.filter(y => y !== year)
      : [...filters.releaseYears, year];
      
    const newFilters = {
      ...filters,
      releaseYears: newYears
    };
    setFilters(newFilters);
  };
  
  const handleApplyFilters = () => {
    onFilterChange(filters);
    setIsFilterOpen(false);
  };
  
  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      priceRange: [0, 400000],
      brands: [],
      releaseYears: []
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    setIsFilterOpen(false);
  };

  // Calculate active filter count properly
  const getActiveFilterCount = () => {
    let count = 0;
    
    // Only count price range if it's not the default range
    const isDefaultPriceRange = filters.priceRange[0] === 0 && filters.priceRange[1] === 400000;
    if (!isDefaultPriceRange) {
      count += 1;
    }
    
    // Count selected brands
    if (filters.brands.length > 0) {
      count += filters.brands.length;
    }
    
    // Count selected years
    if (filters.releaseYears.length > 0) {
      count += filters.releaseYears.length;
    }
    
    return count;
  };

  return (
    <div className="bg-androidBox p-2 md:p-4 rounded-lg mb-4 md:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 md:gap-4">
      <div className="w-full sm:w-auto">
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto text-sm">
              <Filter className="h-4 w-4 mr-2" /> Filter
              {getActiveFilterCount() > 0 && (
                <span className="ml-2 bg-primary/20 text-xs px-1.5 py-0.5 rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-screen-sm md:max-w-md p-4">
            <div className="space-y-4">
              <h3 className="font-medium text-base md:text-lg">Filters</h3>
              
              <div>
                <h4 className="font-medium mb-2 text-sm">Price Range</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                    max={400000}
                    step={1000}
                    onValueChange={handlePriceChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹{filters.priceRange[0].toLocaleString()}</span>
                    <span>₹{filters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-sm">Brands</h4>
                <div className="grid grid-cols-2 gap-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`brand-${brand}`}
                        checked={filters.brands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                        className="mr-2"
                      />
                      <label htmlFor={`brand-${brand}`} className="text-sm">{brand}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 text-sm">Release Year</h4>
                <div className="grid grid-cols-3 gap-2">
                  {years.map((year) => (
                    <div key={year} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`year-${year}`}
                        checked={filters.releaseYears.includes(year)}
                        onChange={() => handleYearToggle(year)}
                        className="mr-2"
                      />
                      <label htmlFor={`year-${year}`} className="text-sm">{year}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t border-gray-700">
                <Button variant="outline" onClick={clearFilters} className="text-sm">
                  Clear Filters
                </Button>
                <Button onClick={handleApplyFilters} className="text-sm">
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="w-full sm:w-auto">
        <Select
          value={currentSort}
          onValueChange={(value) => onSortChange(value as SortOption)}
        >
          <SelectTrigger className="w-full sm:w-[180px] text-sm">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterSortBar;
