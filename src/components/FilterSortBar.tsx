
import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterOptions, SortOption, Brand } from "@/data/instrumentTypes";
import { brands } from "@/data/instruments";
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
  
  const handleSequencerToggle = () => {
    const newFilters = {
      ...filters,
      hasSequencer: filters.hasSequencer === undefined ? true : 
                   filters.hasSequencer === true ? false : undefined
    };
    setFilters(newFilters);
  };
  
  const handleApplyFilters = () => {
    onFilterChange(filters);
    setIsFilterOpen(false);
  };
  
  const clearFilters = () => {
    const defaultFilters: FilterOptions = {
      priceRange: [0, 5000],
      brands: [],
      releaseYears: []
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    setIsFilterOpen(false);
  };
  
  const years = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

  return (
    <div className="bg-androidBox p-4 rounded-lg mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="w-full md:w-auto">
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="h-4 w-4 mr-2" /> Filter
              <span className="ml-2 bg-primary/20 text-xs px-1.5 py-0.5 rounded-full">
                {Object.values(filters).flat().filter(x => x !== undefined && x !== false).length}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full max-w-screen-sm md:max-w-md p-4">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Filters</h3>
              
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                    max={5000}
                    step={100}
                    onValueChange={handlePriceChange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Brands</h4>
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
                      <label htmlFor={`brand-${brand}`}>{brand}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Release Year</h4>
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
                      <label htmlFor={`year-${year}`}>{year}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Features</h4>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasSequencer"
                    checked={filters.hasSequencer === true}
                    onChange={handleSequencerToggle}
                    className="mr-2"
                  />
                  <label htmlFor="hasSequencer">Has Sequencer</label>
                </div>
              </div>
              
              <div className="flex justify-between pt-4 border-t border-gray-700">
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
                <Button onClick={handleApplyFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="w-full md:w-auto">
        <Select
          value={currentSort}
          onValueChange={(value) => onSortChange(value as SortOption)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
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
