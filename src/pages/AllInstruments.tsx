
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FilterSortBar from "@/components/FilterSortBar";
import { instruments } from "@/data/instruments";
import { Instrument, FilterOptions, SortOption } from "@/data/instrumentTypes";

const AllInstruments = () => {
  const [filteredInstruments, setFilteredInstruments] = useState<Instrument[]>(instruments);
  const [currentSort, setCurrentSort] = useState<SortOption>("popularity");
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    priceRange: [0, 5000],
    brands: [],
    releaseYears: []
  });

  useEffect(() => {
    let filtered = [...instruments];
    
    // Apply price filter
    if (currentFilters.priceRange) {
      filtered = filtered.filter(
        instr => instr.price >= currentFilters.priceRange[0] && 
                 instr.price <= currentFilters.priceRange[1]
      );
    }
    
    // Apply brand filter
    if (currentFilters.brands && currentFilters.brands.length > 0) {
      filtered = filtered.filter(instr => 
        currentFilters.brands.includes(instr.brand)
      );
    }
    
    // Apply year filter
    if (currentFilters.releaseYears && currentFilters.releaseYears.length > 0) {
      filtered = filtered.filter(instr => 
        currentFilters.releaseYears.includes(instr.releaseYear)
      );
    }
    
    // Apply sequencer filter
    if (currentFilters.hasSequencer !== undefined) {
      filtered = filtered.filter(
        instr => instr.specs.sequencer === currentFilters.hasSequencer
      );
    }
    
    // Apply sorting
    switch (currentSort) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        filtered.sort((a, b) => b.popularityScore - a.popularityScore);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.releaseYear - a.releaseYear);
        break;
      default:
        break;
    }
    
    setFilteredInstruments(filtered);
  }, [currentSort, currentFilters]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Instruments</h1>
        
        <FilterSortBar 
          onFilterChange={setCurrentFilters}
          onSortChange={setCurrentSort}
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
              onClick={() => setCurrentFilters({
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

export default AllInstruments;
