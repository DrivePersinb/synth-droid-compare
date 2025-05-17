
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import CompareButton from "./CompareButton";
import { useCompare } from "@/contexts/CompareContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { compareItems } = useCompare();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-androidBox py-3 px-4 sticky top-0 z-50 card-shadow">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-primary">Synth</span>Droid
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/brands" className="text-white hover:text-primary transition-colors">
              Brands
            </Link>
            <Link to="/all-instruments" className="text-white hover:text-primary transition-colors">
              All Instruments
            </Link>
            <Link to="/latest" className="text-white hover:text-primary transition-colors">
              Latest
            </Link>
          </div>

          {/* Search & Compare */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search instruments..."
                className="bg-accent/30 text-white px-4 py-2 rounded-md w-52 focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 text-white/60 h-4 w-4" />
            </div>
            <CompareButton />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-white"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                placeholder="Search instruments..."
                className="bg-accent/30 text-white px-4 py-2 rounded-md flex-1 focus:outline-none focus:ring-1 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="secondary" size="sm">
                <Search size={16} />
              </Button>
            </div>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-white hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/brands" 
                className="text-white hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Brands
              </Link>
              <Link 
                to="/all-instruments" 
                className="text-white hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                All Instruments
              </Link>
              <Link 
                to="/latest" 
                className="text-white hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Latest
              </Link>
              <div className="pt-2">
                <CompareButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
