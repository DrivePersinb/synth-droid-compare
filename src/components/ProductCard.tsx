
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from '@/contexts/CompareContext';
import CompareButton from './CompareButton';
import BuyLinksDialog from './BuyLinksDialog';

const ProductCard = ({ instrument }) => {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const isCompared = isInCompare(instrument.id);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);

  // Extract buy links from specs if they exist
  const buyLinks = instrument.specs?.buyLinks || [];
  const hasBuyLinks = buyLinks && buyLinks.length > 0;

  const handleCompareToggle = () => {
    if (isCompared) {
      removeFromCompare(instrument.id);
    } else {
      addToCompare(instrument.id);
    }
  };
  
  return (
    <div className="bg-androidBox rounded-lg overflow-hidden hover:shadow-lg border border-gray-800 transition-all duration-300 flex flex-col">
      <Link to={`/product/${instrument.id}`} className="block relative">
        <div className="aspect-[4/3] overflow-hidden bg-black">
          <img 
            src={instrument.image} 
            alt={instrument.name} 
            className="w-full h-full object-contain mix-blend-lighten p-2"
          />
        </div>
      </Link>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Link 
            to={`/brands/${instrument.brand?.toLowerCase()}`}
            className="text-xs uppercase tracking-wider text-primary hover:text-primary/80"
          >
            {instrument.brand}
          </Link>
          
          <div className="flex items-center text-amber-400">
            <Star className="fill-amber-400 stroke-amber-400 h-4 w-4 mr-1" />
            <span className="text-xs">{instrument.rating?.toFixed(1) || "N/A"}</span>
          </div>
        </div>
        
        <Link to={`/product/${instrument.id}`} className="block mb-2">
          <h3 className="font-medium text-lg leading-tight hover:text-primary transition-colors">
            {instrument.name}
          </h3>
        </Link>
        
        <div className="mb-4 flex-grow">
          <p className="text-sm text-gray-300 line-clamp-2">
            {instrument.description?.substring(0, 100)}...
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="font-semibold">
            ₹{instrument.price?.toLocaleString() || "Call for price"}
          </div>
          
          <div className="flex space-x-2">
            {hasBuyLinks && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  setBuyDialogOpen(true);
                }}
              >
                Buy
              </Button>
            )}
            <CompareButton 
              onClick={handleCompareToggle}
            />
          </div>
        </div>
      </div>

      <BuyLinksDialog 
        isOpen={buyDialogOpen}
        onClose={() => setBuyDialogOpen(false)}
        instrumentName={instrument.name}
        buyLinks={buyLinks}
      />
    </div>
  );
};

export default ProductCard;
