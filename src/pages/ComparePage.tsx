
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompareTable from "@/components/CompareTable";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts/CompareContext";
import { getInstrumentByUniqueId, InstrumentBasic } from "@/data/instrumentsData";
import { ArrowLeft, Trash } from "lucide-react";

const ComparePage = () => {
  const { compareItems, clearCompare } = useCompare();
  const [instruments, setInstruments] = useState<InstrumentBasic[]>([]);
  
  useEffect(() => {
    const loadedInstruments = compareItems
      .map(item => getInstrumentByUniqueId(item.instrumentId))
      .filter(item => item !== undefined) as InstrumentBasic[];
      
    setInstruments(loadedInstruments);
  }, [compareItems]);

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
            <Button variant="outline" onClick={clearCompare} className="flex items-center">
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
