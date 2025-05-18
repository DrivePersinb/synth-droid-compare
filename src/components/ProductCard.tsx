
import React from "react";
import { Link } from "react-router-dom";
import { Instrument } from "@/data/instrumentTypes";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, IndianRupee } from "lucide-react";
import { getInstrumentImagePath } from "@/data/instruments";

interface ProductCardProps {
  instrument: Instrument;
}

const ProductCard: React.FC<ProductCardProps> = ({ instrument }) => {
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(instrument.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inCompare) {
      removeFromCompare(instrument.id);
    } else {
      addToCompare(instrument.id);
    }
  };
  
  const brandColor = {
    Roland: "border-roland/30 hover:border-roland/60",
    Casio: "border-casio/30 hover:border-casio/60",
    Yamaha: "border-yamaha/30 hover:border-yamaha/60",
    Korg: "border-korg/30 hover:border-korg/60",
  }[instrument.brand];

  // Format the price in Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div 
      className={`product-card border-2 ${brandColor} h-full flex flex-col`}
    >
      <Link to={`/product/${instrument.id}`} className="flex-1 flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={instrument.image === '/placeholder.svg' ? '/placeholder.svg' : getInstrumentImagePath(instrument.id)} 
            alt={instrument.name}
            className="object-contain h-full w-full p-4"
          />
          <div 
            className="absolute top-2 right-2 z-10 cursor-pointer" 
            onClick={handleCompareToggle}
          >
            {inCompare ? (
              <MinusCircle size={24} className="text-red-500 hover:text-red-400" />
            ) : (
              <PlusCircle size={24} className="text-primary hover:text-primary/80" />
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="mb-2 text-xs font-medium text-gray-400">{instrument.brand}</div>
          <h3 className="text-lg font-medium mb-2">{instrument.name}</h3>
          
          <div className="flex justify-between items-center mb-3">
            <div className="text-lg font-bold text-primary flex items-center">
              <IndianRupee size={18} className="mr-1" />
              {instrument.price.toLocaleString('en-IN')}
            </div>
            <div className="bg-androidBox rounded-full px-2 py-1 text-xs">
              ★ {instrument.rating}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-auto mb-4">
            {Object.entries(instrument.specs).slice(0, 3).map(([key, value]) => (
              <div 
                key={key} 
                className="text-xs bg-accent/30 px-2 py-1 rounded-sm"
                title={`${key}: ${value}`}
              >
                {key}: {value.toString().substring(0, 10)}
                {value.toString().length > 10 ? "..." : ""}
              </div>
            ))}
            <div className="text-xs bg-accent/30 px-2 py-1 rounded-sm">
              +{Object.keys(instrument.specs).length - 3} more
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-4 pt-0 mt-auto">
        <div className="flex gap-2">
          <Button className="flex-1" asChild>
            <Link to={`/product/${instrument.id}`}>View</Link>
          </Button>
          <Button 
            variant={inCompare ? "destructive" : "outline"}
            className="flex-1"
            onClick={handleCompareToggle}
          >
            {inCompare ? "Remove" : "Compare"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
