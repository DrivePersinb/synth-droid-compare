
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface CompareItem {
  instrumentId: string;
  dateAdded: Date;
}

interface CompareContextType {
  compareItems: CompareItem[];
  addToCompare: (instrumentId: string) => void;
  removeFromCompare: (instrumentId: string) => void;
  clearCompare: () => void;
  isInCompare: (instrumentId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<CompareItem[]>(() => {
    const savedItems = localStorage.getItem("compareItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save to local storage whenever the compare list changes
  useEffect(() => {
    localStorage.setItem("compareItems", JSON.stringify(compareItems));
  }, [compareItems]);

  const getCompareUrl = (items: CompareItem[]) => {
    if (items.length === 0) return "/compare";
    const ids = items.map(item => item.instrumentId).join('+');
    return `/compare/${ids}`;
  };

  const addToCompare = (instrumentId: string) => {
    if (compareItems.length >= 4) {
      toast.error("Maximum 4 instruments can be compared at once. Please remove one to add another.");
      return;
    }
    
    if (isInCompare(instrumentId)) {
      toast.info("This instrument is already in your comparison list.");
      return;
    }
    
    const newItem: CompareItem = {
      instrumentId,
      dateAdded: new Date()
    };
    
    const newItems = [...compareItems, newItem];
    setCompareItems(newItems);
    
    // Show toast with navigation function instead of Link
    const compareUrl = getCompareUrl(newItems);
    toast.success(
      <div className="flex items-center justify-between w-full">
        <span>Added to comparison list</span>
        <Button 
          size="sm" 
          variant="outline" 
          className="ml-2"
          onClick={() => {
            // Navigate programmatically
            window.location.href = compareUrl;
          }}
        >
          Start Comparison
        </Button>
      </div>,
      {
        duration: 4000,
      }
    );
  };

  const removeFromCompare = (instrumentId: string) => {
    setCompareItems(prevItems => 
      prevItems.filter(item => item.instrumentId !== instrumentId)
    );
    toast.info("Removed from comparison list");
  };

  const clearCompare = () => {
    setCompareItems([]);
    toast.info("Comparison list cleared");
  };

  const isInCompare = (instrumentId: string) => {
    return compareItems.some(item => item.instrumentId === instrumentId);
  };

  return (
    <CompareContext.Provider 
      value={{ 
        compareItems, 
        addToCompare, 
        removeFromCompare, 
        clearCompare,
        isInCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
