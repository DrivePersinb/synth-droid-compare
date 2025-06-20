
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BrandCard from "@/components/BrandCard";
import ProductCard from "@/components/ProductCard";
import { useInstruments } from "@/hooks/useInstruments";
import { Music, Zap, Users } from "lucide-react";

const HomePage = () => {
  const { data: instruments } = useInstruments();
  const brands = ["Roland", "Yamaha", "Korg"];

  const popularInstruments = [...instruments]
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 3);

  const newestInstruments = [...instruments]
    .sort((a, b) => b.releaseYear - a.releaseYear)
    .slice(0, 3);

  const features = [
    { icon: Music, title: "Professional Grade", description: "Studio-quality synthesizers from top brands" },
    { icon: Zap, title: "Smart Comparison", description: "Side-by-side specs and feature comparison" },
    { icon: Users, title: "Expert Reviews", description: "Detailed reviews from music professionals" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="gradient-text mb-6">
                Find Your Perfect <br />
                <span className="text-white">Synthesizer</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Compare specs, read reviews, and discover the ideal synthesizer for your music production journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/all-instruments" className="btn-primary">Explore Instruments</Link>
                <Link to="/compare" className="btn-secondary">Start Comparing</Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative glass-effect rounded-3xl p-8">
                <img src="/placeholder.svg" alt="Professional Synthesizer" className="w-full max-w-lg mx-auto rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Choose Our Platform?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to make an informed decision about your next synthesizer purchase.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="glass-effect w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-center mb-12">Featured Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brands.map((brand) => (
              <BrandCard key={brand} brand={brand} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 section-gradient">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2>Most Popular</h2>
            <Link to="/all-instruments" className="text-primary hover:text-primary/80 transition-colors font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularInstruments.map((instrument) => (
              <ProductCard key={instrument.uniqueId} instrument={instrument} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2>Latest Releases</h2>
            <Link to="/latest" className="text-primary hover:text-primary/80 transition-colors font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newestInstruments.map((instrument) => (
              <ProductCard key={instrument.uniqueId} instrument={instrument} />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-500/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="mb-6">Ready to Find Your Sound?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of musicians who have found their perfect synthesizer through our platform.
          </p>
          <Link to="/all-instruments" className="btn-primary text-lg px-8 py-4">
            Start Your Journey
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;
