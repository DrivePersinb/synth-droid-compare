
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from '@/contexts/CompareContext';
import CompareButton from './CompareButton';
import BuyLinksDialog from './BuyLinksDialog';
import { InstrumentBasic } from '@/data/instrumentsData';

interface ProductCardProps {
  instrument: InstrumentBasic;
}

const ProductCard: React.FC<ProductCardProps> = ({ instrument }) => {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const isCompared = isInCompare(instrument.uniqueId);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);

  const handleCompareToggle = () => {
    if (isCompared) {
      removeFromCompare(instrument.uniqueId);
    } else {
      addToCompare(instrument.uniqueId);
    }
  };
  
  return (
    <div className="product-card group border border-border transition-all duration-300 flex flex-col">
      <Link to={`/product/${instrument.uniqueId}`} className="block relative">
        <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-900 to-black">
          <img 
            src={instrument.image} 
            alt={instrument.name} 
            className="w-full h-full object-contain mix-blend-lighten p-2"
          />
        </div>
      </Link>
      
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <Link 
            to={`/brands/${instrument.brand?.toLowerCase()}`}
            className="text-xs uppercase tracking-wider text-primary hover:text-primary/80"
          >
            {instrument.brand}
          </Link>
          
          <div className="flex items-center text-amber-400">
            <Star className="fill-amber-400 stroke-amber-400 h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="text-xs">{instrument.rating?.toFixed(1) || "N/A"}</span>
          </div>
        </div>
        
        <Link to={`/product/${instrument.uniqueId}`} className="block mb-2">
          <h3 className="font-medium text-base sm:text-lg leading-tight hover:text-primary transition-colors">
            {instrument.name}
          </h3>
        </Link>
        
        <div className="mb-4 flex-grow">
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {instrument.description?.substring(0, 100)}...
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="font-semibold text-sm sm:text-base">
            ₹{instrument.price?.toLocaleString() || "Call for price"}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                setBuyDialogOpen(true);
              }}
              className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2"
            >
              Buy
            </Button>
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
        buyLinks={[]}
      />
    </div>
  );
};

export default ProductCard;
