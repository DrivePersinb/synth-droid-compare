import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts/CompareContext";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

export const HeaderExtended = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { compareItems } = useCompare();
  const { user, isAdmin, signOut } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="bg-androidBox border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div>
            <Link to="/" className="text-2xl font-bold text-primary">
              Instrument<span className="text-white">Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
            <Link to="/all-instruments" className="text-gray-300 hover:text-white">
              All Instruments
            </Link>
            <Link to="/brands" className="text-gray-300 hover:text-white">
              Brands
            </Link>
            <Link to="/latest" className="text-gray-300 hover:text-white">
              Latest
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Compare button with count */}
            <Link to="/compare">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ShoppingBag size={16} />
                Compare
                {compareItems.length > 0 && (
                  <span className="bg-primary text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {compareItems.length}
                  </span>
                )}
              </Button>
            </Link>
            
            {user ? (
              <div className="relative group">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User size={16} />
                  {user.email?.split('@')[0]}
                  <ChevronDown size={14} />
                </Button>
                <div className="absolute right-0 mt-2 w-48 bg-androidBox border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  {isAdmin && (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => signOut()} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/auth">
                <Button size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/all-instruments"
                className="text-gray-300 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                All Instruments
              </Link>
              <Link
                to="/brands"
                className="text-gray-300 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Brands
              </Link>
              <Link
                to="/latest"
                className="text-gray-300 hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Latest
              </Link>
              <Link
                to="/compare"
                className="text-gray-300 hover:text-white flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag size={16} />
                Compare
                {compareItems.length > 0 && (
                  <span className="bg-primary text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {compareItems.length}
                  </span>
                )}
              </Link>
              
              {user ? (
                <>
                  <div className="border-t border-gray-700 pt-2">
                    <p className="text-sm text-gray-400">Signed in as: {user.email}</p>
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-primary hover:text-primary/80"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button size="sm" className="w-full">Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
