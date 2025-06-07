
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FilterSortBar from "@/components/FilterSortBar";
import { instruments, InstrumentBasic, FilterOptions, SortOption } from "@/data/instrumentsData";

const AllInstruments = () => {
  const [filteredInstruments, setFilteredInstruments] = useState<InstrumentBasic[]>(instruments);
  const [currentSort, setCurrentSort] = useState<SortOption>("popularity");
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    priceRange: [0, 400000],
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
    }
    
    setFilteredInstruments(filtered);
  }, [currentSort, currentFilters]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="glass-effect rounded-3xl p-8 mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">All Instruments</h1>
          <p className="text-muted-foreground text-lg">
            Discover our complete collection of synthesizers and keyboards
          </p>
        </div>
        
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
          <div className="text-center py-16 glass-effect rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">No instruments found</h2>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters to see more results
            </p>
            <button 
              onClick={() => setCurrentFilters({
                priceRange: [0, 400000],
                brands: [],
                releaseYears: []
              })}
              className="btn-primary"
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
