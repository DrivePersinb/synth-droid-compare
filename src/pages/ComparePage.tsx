
import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Load instruments from URL parameters on component mount
  useEffect(() => {
    const idsParam = searchParams.get('ids');
    if (idsParam) {
      const urlIds = idsParam.split('+').filter(id => id.trim());
      
      // Clear existing compare items and add URL instruments
      clearCompare();
      urlIds.forEach(id => {
        const instrument = getInstrumentByUniqueId(id);
        if (instrument) {
          addToCompare(id);
        }
      });
    }
  }, [searchParams, clearCompare, addToCompare]);
  
  // Update instruments state when compareItems change
  useEffect(() => {
    const loadedInstruments = compareItems
      .map(item => getInstrumentByUniqueId(item.instrumentId))
      .filter(item => item !== undefined) as InstrumentBasic[];
      
    setInstruments(loadedInstruments);
    
    // Update URL when compare items change (but only if not initially loading from URL)
    if (loadedInstruments.length > 0) {
      const ids = loadedInstruments.map(inst => inst.uniqueId).join('+');
      setSearchParams({ ids });
    } else if (compareItems.length === 0) {
      // Clear URL params when no items to compare
      setSearchParams({});
    }
  }, [compareItems, setSearchParams]);

  const handleClearAll = () => {
    clearCompare();
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link to="/" className="inline-flex items-center text-primary hover:underline mb-2">
              <ArrowLeft size={16} className="mr-1" /> Back to home
            </Link>
            <h1 className="text-3xl font-bold">Compare Instruments</h1>
          </div>
          
          {instruments.length > 0 && (
            <Button variant="outline" onClick={handleClearAll} className="flex items-center">
              <Trash size={16} className="mr-2" /> Clear All
            </Button>
          )}
        </div>
        
        <div className="bg-androidBox rounded-xl overflow-hidden">
          <CompareTable />
          
          {instruments.length > 0 && instruments.length < 4 && (
            <div className="p-6 border-t border-gray-700">
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-gray-300">
                  You can add up to {4 - instruments.length} more instrument{instruments.length === 3 ? '' : 's'} to compare
                </div>
                <Button asChild>
                  <Link to="/all-instruments">Add More Instruments</Link>
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
