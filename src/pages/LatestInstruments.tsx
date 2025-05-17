
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FilterSortBar from "@/components/FilterSortBar";
import { instruments } from "@/data/instruments";
import { FilterOptions, SortOption } from "@/data/instrumentTypes";

const LatestInstruments = () => {
  // Get instruments sorted by release year (newest first)
  const latestInstruments = [...instruments].sort((a, b) => b.releaseYear - a.releaseYear);
  
  const [filteredInstruments, setFilteredInstruments] = useState(latestInstruments);
  const [currentSort, setCurrentSort] = useState<SortOption>("newest");
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    priceRange: [0, 5000],
    brands: [],
    releaseYears: []
  });
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    let filtered = [...latestInstruments];
    
    if (newFilters.priceRange) {
      filtered = filtered.filter(
        instr => instr.price >= newFilters.priceRange[0] && 
                 instr.price <= newFilters.priceRange[1]
      );
    }
    
    if (newFilters.brands && newFilters.brands.length > 0) {
      filtered = filtered.filter(instr => 
        newFilters.brands.includes(instr.brand)
      );
    }
    
    if (newFilters.releaseYears && newFilters.releaseYears.length > 0) {
      filtered = filtered.filter(instr => 
        newFilters.releaseYears.includes(instr.releaseYear)
      );
    }
    
    if (newFilters.hasSequencer !== undefined) {
      filtered = filtered.filter(
        instr => instr.specs.sequencer === newFilters.hasSequencer
      );
    }
    
    setFilteredInstruments(filtered);
    setCurrentFilters(newFilters);
  };
  
  const handleSortChange = (sort: SortOption) => {
    let sorted = [...filteredInstruments];
    
    switch (sort) {
      case "price-low-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        sorted.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        sorted.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      default:
        break;
    }
    
    setFilteredInstruments(sorted);
    setCurrentSort(sort);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Latest Instruments</h1>
        
        <FilterSortBar 
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          currentSort={currentSort}
          currentFilters={currentFilters}
        />
        
        {filteredInstruments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredInstruments.map(instrument => (
              <ProductCard key={instrument.id} instrument={instrument} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-androidBox rounded-lg">
            <h2 className="text-2xl font-bold mb-2">No instruments found</h2>
            <p className="text-gray-400 mb-6">
              Try adjusting your filters to see more results
            </p>
            <button 
              onClick={() => handleFilterChange({
                priceRange: [0, 5000],
                brands: [],
                releaseYears: []
              })}
              className="android-btn bg-primary text-white hover:bg-primary/90"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default LatestInstruments;
