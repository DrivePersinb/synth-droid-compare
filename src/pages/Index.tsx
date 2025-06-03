
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandCard from "@/components/BrandCard";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useInstruments, useBrands } from "@/hooks/useInstruments";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  const { data: instruments = [], isLoading: instrumentsLoading } = useInstruments();
  const { data: brands = [], isLoading: brandsLoading } = useBrands();

  // Get the three most popular instruments
  const popularInstruments = [...instruments]
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 3);

  // Get the newest instruments
  const newestInstruments = [...instruments]
    .sort((a, b) => {
      const yearA = a.releaseYear || 0;
      const yearB = b.releaseYear || 0;
      return yearB - yearA;
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      {/* Hero section */}
      <section className="py-12 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                Compare Your Perfect <span className="text-primary">Synthesizer</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 animate-slide-up">
                Find the ideal synthesizer for your music production needs by comparing 
                top models from various brands side by side.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link to="/all-instruments">Browse All Instruments</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/compare">Compare Now</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center animate-fade-in">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-indigo-500 rounded-xl blur-xl opacity-75"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Synthesizer" 
                  className="relative block rounded-xl border border-gray-800 bg-black p-4 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Brands section */}
      <section className="py-12 bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Brand</h2>
          {brandsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {brands.map((brand) => (
                <BrandCard key={brand} brand={brand} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Popular instruments section */}
      <section className="py-12 bg-gradient-to-b from-black/70 to-black/40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Popular Instruments</h2>
            <Link to="/all-instruments" className="text-primary hover:underline">
              View all
            </Link>
          </div>
          {instrumentsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularInstruments.map((instrument) => (
                <ProductCard key={instrument.id} instrument={instrument} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Latest instruments section */}
      <section className="py-12 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Models</h2>
            <Link to="/latest" className="text-primary hover:underline">
              View all
            </Link>
          </div>
          {instrumentsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-64 w-full rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newestInstruments.map((instrument) => (
                <ProductCard key={instrument.id} instrument={instrument} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-androidBox">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to compare?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Add instruments to your comparison list and find the perfect match for your music production needs.
          </p>
          <Button asChild size="lg">
            <Link to="/all-instruments">Start Comparing</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
