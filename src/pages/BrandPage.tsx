
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FilterSortBar from "@/components/FilterSortBar";
import { instruments, FilterOptions, SortOption, Brand } from "@/data/instrumentsData";

const BrandPage = () => {
  const { brandName } = useParams<{ brandName: string }>();
  
  const capitalizedBrandName = brandName ? 
    brandName.charAt(0).toUpperCase() + brandName.slice(1) as Brand : 
    "Roland";
  
  const brandInstruments = instruments.filter(instrument => 
    instrument.brand === capitalizedBrandName
  );
  
  const [filteredInstruments, setFilteredInstruments] = useState(brandInstruments);
  const [currentSort, setCurrentSort] = useState<SortOption>("popularity");
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    priceRange: [0, 400000],
    brands: [capitalizedBrandName],
    releaseYears: []
  });
  
  useEffect(() => {
    let filtered = [...brandInstruments];
    
    // Apply filters
    if (currentFilters.priceRange) {
      filtered = filtered.filter(
        instr => instr.price >= currentFilters.priceRange[0] && 
                 instr.price <= currentFilters.priceRange[1]
      );
    }
    
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
  }, [currentSort, currentFilters, brandInstruments]);

  const getBrandGradient = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'roland':
        return 'from-red-500/20 to-red-600/30 border-red-500/40';
      case 'yamaha':
        return 'from-purple-500/20 to-purple-600/30 border-purple-500/40';
      case 'korg':
        return 'from-cyan-500/20 to-cyan-600/30 border-cyan-500/40';
      default:
        return 'from-primary/20 to-primary/30 border-primary/40';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/brands" className="text-primary hover:text-primary/80 transition-colors">
            All Brands
          </Link>
          <span className="mx-3 text-muted-foreground">›</span>
          <span className="font-medium">{capitalizedBrandName}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className={`glass-effect p-8 rounded-[10px] bg-gradient-to-br ${getBrandGradient(brandName || '')} border relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{capitalizedBrandName}</h1>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Discover the complete range of {capitalizedBrandName} synthesizers. 
                  Compare features, prices, and specifications to find your perfect instrument.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <FilterSortBar 
              onFilterChange={setCurrentFilters}
              onSortChange={setCurrentSort}
              currentSort={currentSort}
              currentFilters={currentFilters}
            />
            
            {filteredInstruments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredInstruments.map(instrument => (
                  <ProductCard key={instrument.uniqueId} instrument={instrument} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 glass-effect rounded-[10px]">
                <h2 className="text-2xl font-bold mb-4">No instruments found</h2>
                <p className="text-muted-foreground mb-6">Try adjusting your filters to see more results</p>
                <button 
                  onClick={() => setCurrentFilters({
                    priceRange: [0, 400000],
                    brands: [capitalizedBrandName],
                    releaseYears: []
                  })}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrandPage;
