
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

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

  const addToCompare = (instrumentId: string) => {
    if (compareItems.length >= 4) {
      toast.error("You can compare up to 4 instruments at a time. Please remove one to add another.");
      return;
    }
    
    if (isInCompare(instrumentId)) {
      toast.info("This instrument is already in your compare list");
      return;
    }
    
    const newItem: CompareItem = {
      instrumentId,
      dateAdded: new Date()
    };
    
    setCompareItems(prevItems => [...prevItems, newItem]);
    toast.success("Added to comparison list");
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
