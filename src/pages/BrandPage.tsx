
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FilterSortBar from "@/components/FilterSortBar";
import { getInstrumentsByBrand } from "@/data/instruments";
import { FilterOptions, SortOption, Brand } from "@/data/instrumentTypes";

const BrandPage = () => {
  const { brandName } = useParams<{ brandName: string }>();
  
  const capitalizedBrandName = brandName ? 
    brandName.charAt(0).toUpperCase() + brandName.slice(1) as Brand : 
    "Roland"; // Default fallback
  
  const [instruments, setInstruments] = useState(
    getInstrumentsByBrand(capitalizedBrandName)
  );
  
  const [currentSort, setCurrentSort] = useState<SortOption>("popularity");
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    priceRange: [0, 5000],
    brands: [capitalizedBrandName],
    releaseYears: []
  });
  
  useEffect(() => {
    if (brandName) {
      const brand = brandName.charAt(0).toUpperCase() + brandName.slice(1) as Brand;
      setInstruments(getInstrumentsByBrand(brand));
      setCurrentFilters({
        ...currentFilters,
        brands: [brand]
      });
    }
  }, [brandName]);
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/brands" className="text-primary hover:underline">
            All Brands
          </Link>
          {" › "}
          <span className="font-medium">{capitalizedBrandName}</span>
        </div>
        
        <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
          <div className="md:w-1/3">
            <div className={`
              p-6 rounded-xl 
              bg-gradient-to-br 
              ${brandName === 'roland' ? 'from-roland/20 to-roland/40 border-roland/50' : ''}
              ${brandName === 'casio' ? 'from-casio/20 to-casio/40 border-casio/50' : ''}
              ${brandName === 'yamaha' ? 'from-yamaha/20 to-yamaha/40 border-yamaha/50' : ''}
              ${brandName === 'korg' ? 'from-korg/20 to-korg/40 border-korg/50' : ''}
              border
            `}>
              <h1 className="text-3xl font-bold mb-4">{capitalizedBrandName} Synthesizers</h1>
              <p className="text-gray-300 mb-4">
                Discover the complete range of {capitalizedBrandName} synthesizers. 
                Compare features, prices, and specifications to find your perfect instrument.
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold">{instruments.length}</div>
                  <div className="text-gray-400">Products</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    ${Math.min(...instruments.map(i => i.price))}+
                  </div>
                  <div className="text-gray-400">Starting Price</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <FilterSortBar 
              onFilterChange={setCurrentFilters}
              onSortChange={setCurrentSort}
              currentSort={currentSort}
              currentFilters={currentFilters}
            />
            
            {instruments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {instruments.map(instrument => (
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
                    brands: [capitalizedBrandName],
                    releaseYears: []
                  })}
                  className="android-btn bg-primary text-white hover:bg-primary/90"
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
