
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompareTable from "@/components/CompareTable";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts/CompareContext";
import { getInstrumentById } from "@/data/instruments";
import { Instrument } from "@/data/instrumentTypes";
import { ArrowLeft, Trash } from "lucide-react";

const ComparePage = () => {
  const { compareItems, clearCompare } = useCompare();
  const [instruments, setInstruments] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchInstruments() {
      setLoading(true);
      try {
        const loadedInstruments = await Promise.all(
          compareItems.map(async item => {
            const instrument = await getInstrumentById(item.instrumentId);
            return instrument;
          })
        );
        
        // Filter out any undefined results
        setInstruments(loadedInstruments.filter((item): item is Instrument => item !== undefined));
      } catch (error) {
        console.error("Error loading instruments for comparison:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchInstruments();
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
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-pulse text-xl">Loading...</div>
          </div>
        ) : (
          <div className="bg-androidBox rounded-xl overflow-hidden">
            <CompareTable instruments={instruments} />
            
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
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ComparePage;
