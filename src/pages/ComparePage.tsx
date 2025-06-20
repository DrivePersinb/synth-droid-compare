
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompareTable from "@/components/CompareTable";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts/CompareContext";
import { getInstrumentByUniqueId, InstrumentBasic } from "@/data/instrumentsData";
import { ArrowLeft, Trash } from "lucide-react";

const ComparePage = () => {
  const { compareItems, clearCompare, addToCompare, removeFromCompare } = useCompare();
  const [instruments, setInstruments] = useState<InstrumentBasic[]>([]);
  const { ids } = useParams<{ ids?: string }>();
  const navigate = useNavigate();
  const hasLoadedFromUrl = useRef(false);
  
  // Load instruments from URL parameters on component mount
  useEffect(() => {
    if (ids && !hasLoadedFromUrl.current) {
      const urlIds = ids.split('+').filter(id => id.trim());
      
      // Only add instruments that aren't already in the compare list
      urlIds.forEach(id => {
        const instrument = getInstrumentByUniqueId(id);
        if (instrument && !compareItems.some(item => item.instrumentId === id)) {
          addToCompare(id);
        }
      });
      hasLoadedFromUrl.current = true;
    }
  }, [ids, addToCompare, compareItems]);
  
  // Update instruments state when compareItems change
  useEffect(() => {
    const loadedInstruments = compareItems
      .map(item => getInstrumentByUniqueId(item.instrumentId))
      .filter(item => item !== undefined) as InstrumentBasic[];
      
    setInstruments(loadedInstruments);
    
    // Update URL when compare items change (but only if we've already loaded from URL)
    if (hasLoadedFromUrl.current) {
      if (loadedInstruments.length > 0) {
        const newIds = loadedInstruments.map(inst => inst.uniqueId).join('+');
        navigate(`/compare/${newIds}`, { replace: true });
      } else if (compareItems.length === 0) {
        // Navigate to base compare page when no items
        navigate('/compare', { replace: true });
      }
    }
  }, [compareItems, navigate]);

  const handleClearAll = () => {
    clearCompare();
    navigate('/compare', { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link to="/" className="inline-flex items-center text-primary hover:underline mb-2">
              <ArrowLeft size={16} className="mr-1" /> Back to Home
            </Link>
            <h1 className="text-3xl font-bold">Compare Instruments</h1>
          </div>
          
          {instruments.length > 0 && (
            <Button variant="outline" onClick={handleClearAll} className="flex items-center">
              <Trash size={16} className="mr-2" /> Clear All
            </Button>
          )}
        </div>
        
        <div className="bg-card border border-border rounded-[10px] overflow-hidden">
          <CompareTable />
          
          {instruments.length > 0 && instruments.length < 4 && (
            <div className="p-6 border-t border-border">
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-muted-foreground">
                  You can add up to {4 - instruments.length} more instrument{instruments.length === 3 ? '' : 's'} for comparison
                </div>
                <Button asChild>
                  <Link to="/all-instruments">Browse More Instruments</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComparePage;
