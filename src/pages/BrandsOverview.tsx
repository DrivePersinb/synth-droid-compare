
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandCard from "@/components/BrandCard";
import { brands } from "@/data/instruments";
import { Brand } from "@/data/instrumentTypes";

const BrandsOverview = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Brands</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {brands.map((brand) => (
            <div key={brand} className="bg-androidBox rounded-xl overflow-hidden card-shadow">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-black p-6 flex items-center justify-center">
                  <div className={`
                    text-4xl font-bold 
                    ${brand === 'Roland' ? 'text-roland' : ''}
                    ${brand === 'Casio' ? 'text-casio' : ''}
                    ${brand === 'Yamaha' ? 'text-yamaha' : ''}
                    ${brand === 'Korg' ? 'text-korg' : ''}
                  `}>
                    {brand}
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <h2 className="text-2xl font-bold mb-4">{brand} Synthesizers</h2>
                  <p className="text-gray-300 mb-6">
                    Explore the complete range of {brand} synthesizers and music production tools. 
                    Compare models, features, and find your perfect instrument.
                  </p>
                  <Link
                    to={`/brands/${brand.toLowerCase()}`}
                    className="android-btn bg-primary text-white hover:bg-primary/90 inline-block"
                  >
                    View {brand} Products
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-androidBox rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Compare Across Brands</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Want to compare synthesizers from different brands? Add products to your comparison 
            list and see detailed side-by-side specifications.
          </p>
          <Link
            to="/all-instruments"
            className="android-btn bg-primary text-white hover:bg-primary/90 inline-block"
          >
            Browse All Instruments
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrandsOverview;
