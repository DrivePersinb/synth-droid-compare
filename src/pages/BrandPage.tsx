
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
    priceRange: [0, 5000],
    brands: [capitalizedBrandName],
    releaseYears: []
  });
  
  useEffect(() => {
    if (brandName) {
      const brand = brandName.charAt(0).toUpperCase() + brandName.slice(1) as Brand;
      const filtered = instruments.filter(instrument => instrument.brand === brand);
      setFilteredInstruments(filtered);
      setCurrentFilters({
        ...currentFilters,
        brands: [brand]
      });
    }
  }, [brandName]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div className="mb-4 md:mb-8">
          <Link to="/brands" className="text-primary hover:underline text-sm md:text-base">
            All Brands
          </Link>
          {" › "}
          <span className="font-medium text-sm md:text-base">{capitalizedBrandName}</span>
        </div>
        
        <div className="flex flex-col lg:flex-row items-start gap-4 md:gap-8 mb-4 md:mb-8">
          <div className="w-full lg:w-1/3">
            <div className={`
              p-3 md:p-6 rounded-xl 
              bg-gradient-to-br 
              ${brandName === 'roland' ? 'from-roland/20 to-roland/40 border-roland/50' : ''}
              ${brandName === 'yamaha' ? 'from-yamaha/20 to-yamaha/40 border-yamaha/50' : ''}
              ${brandName === 'korg' ? 'from-korg/20 to-korg/40 border-korg/50' : ''}
              border
            `}>
              <h1 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">{capitalizedBrandName} Synthesizers</h1>
              <p className="text-gray-300 mb-3 md:mb-4 text-sm md:text-base">
                Discover the complete range of {capitalizedBrandName} synthesizers. 
                Compare features, prices, and specifications to find your perfect instrument.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <div className="text-lg md:text-2xl font-bold">{brandInstruments.length}</div>
                  <div className="text-gray-400 text-xs md:text-sm">Products</div>
                </div>
                <div>
                  <div className="text-lg md:text-2xl font-bold">
                    ${Math.min(...brandInstruments.map(i => i.price))}+
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm">Starting Price</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3">
            <FilterSortBar 
              onFilterChange={setCurrentFilters}
              onSortChange={setCurrentSort}
              currentSort={currentSort}
              currentFilters={currentFilters}
            />
            
            {filteredInstruments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {filteredInstruments.map(instrument => (
                  <ProductCard key={instrument.id} instrument={instrument} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 md:py-16 bg-androidBox rounded-lg">
                <h2 className="text-lg md:text-2xl font-bold mb-2">No instruments found</h2>
                <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base px-4">
                  Try adjusting your filters to see more results
                </p>
                <button 
                  onClick={() => setCurrentFilters({
                    priceRange: [0, 5000],
                    brands: [capitalizedBrandName],
                    releaseYears: []
                  })}
                  className="android-btn bg-primary text-white hover:bg-primary/90 text-sm md:text-base"
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
