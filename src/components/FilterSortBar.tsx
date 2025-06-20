
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
import { Input } from "@/components/ui/input";

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
  
  const handleMinPriceChange = (value: string) => {
    const minPrice = parseInt(value) || 0;
    const newFilters = {
      ...filters,
      priceRange: [minPrice, filters.priceRange[1]] as [number, number]
    };
    setFilters(newFilters);
  };
  
  const handleMaxPriceChange = (value: string) => {
    const maxPrice = parseInt(value) || 400000;
    const newFilters = {
      ...filters,
      priceRange: [filters.priceRange[0], maxPrice] as [number, number]
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

  const getActiveFilterCount = () => {
    let count = 0;
    
    const isDefaultPriceRange = filters.priceRange[0] === 0 && filters.priceRange[1] === 400000;
    if (!isDefaultPriceRange) {
      count += 1;
    }
    
    if (filters.brands.length > 0) {
      count += filters.brands.length;
    }
    
    if (filters.releaseYears.length > 0) {
      count += filters.releaseYears.length;
    }
    
    return count;
  };

  return (
    <div className="bg-card border border-border p-3 rounded-[10px] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="w-full sm:w-auto">
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full sm:w-auto text-sm border-0">
              <Filter className="h-4 w-4 mr-2" /> Filter
              {getActiveFilterCount() > 0 && (
                <span className="ml-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Filters</h3>
              
              <div>
                <h4 className="font-medium mb-3 text-sm">Price Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Min Price</label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={filters.priceRange[0]}
                      onChange={(e) => handleMinPriceChange(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Max Price</label>
                    <Input
                      type="number"
                      placeholder="400000"
                      value={filters.priceRange[1]}
                      onChange={(e) => handleMaxPriceChange(e.target.value)}
                      className="text-sm"
                    />
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
              
              <div className="flex justify-between pt-4 border-t">
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
                <Button size="sm" onClick={handleApplyFilters}>
                  Apply
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
          <SelectTrigger className="w-full sm:w-[160px] text-sm border-0">
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
