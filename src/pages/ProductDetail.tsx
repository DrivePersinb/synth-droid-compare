
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DatabaseInstrument } from "@/hooks/useInstruments";
import BuyLinksDialog from "@/components/BuyLinksDialog";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  
  const { data: instrument, isLoading } = useQuery({
    queryKey: ['instrument', id],
    queryFn: async () => {
      if (!id) return null;
      console.log('Fetching instrument with id:', id);
      const { data, error } = await supabase
        .from('instruments')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching instrument:', error);
        throw error;
      }

      console.log('Fetched instrument:', data);
      return data as DatabaseInstrument;
    },
    enabled: !!id,
  });

  const { data: similarInstruments = [] } = useQuery({
    queryKey: ['similar-instruments', instrument?.brand, id],
    queryFn: async () => {
      if (!instrument?.brand) return [];
      console.log(`Fetching similar instruments for brand: ${instrument.brand}`);
      const { data, error } = await supabase
        .from('instruments')
        .select('*')
        .ilike('brand', instrument.brand)
        .neq('id', id)
        .limit(3);

      if (error) {
        console.error('Error fetching similar instruments:', error);
        return [];
      }

      console.log('Similar instruments:', data);
      return data as DatabaseInstrument[];
    },
    enabled: !!instrument?.brand && !!id,
  });
  
  const inCompare = instrument ? isInCompare(instrument.id) : false;

  const handleCompareToggle = () => {
    if (!instrument) return;
    
    if (inCompare) {
      removeFromCompare(instrument.id);
    } else {
      addToCompare(instrument.id);
    }
  };

  // Extract buy links from specs if they exist
  const buyLinks = instrument?.specs?.buyLinks || [];
  const hasBuyLinks = buyLinks && buyLinks.length > 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-6">Loading...</h1>
        </div>
        <Footer />
      </div>
    );
  }

  if (!instrument) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-6">Instrument not found</h1>
          <p className="text-gray-400 mb-6">
            Sorry, we couldn't find the instrument you were looking for.
          </p>
          <Button asChild>
            <Link to="/all-instruments">Browse All Instruments</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/all-instruments" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft size={16} className="mr-1" /> Back to instruments
          </Link>
        </div>
        
        <div className="bg-androidBox rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Image */}
            <div className="bg-black rounded-lg flex items-center justify-center p-8">
              <img 
                src={instrument.image || '/placeholder.svg'} 
                alt={instrument.name}
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
            
            {/* Info */}
            <div>
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-accent/40 rounded-full text-sm">
                  {instrument.brand}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{instrument.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{instrument.rating || "N/A"}</span>
                </div>
                <div className="text-muted-foreground">
                  {instrument.release_year}
                </div>
              </div>
              
              <div className="text-3xl font-bold text-primary mb-6">
                ₹{instrument.price?.toLocaleString()}
              </div>
              
              <p className="text-gray-300 mb-6">
                {instrument.description}
              </p>
              
              <div className="flex space-x-4 mb-8">
                {hasBuyLinks && (
                  <Button 
                    size="lg" 
                    className="flex-1"
                    onClick={() => setBuyDialogOpen(true)}
                  >
                    Buy Now
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleCompareToggle}
                  className={`flex-1 ${inCompare ? 'border-red-500 text-red-500 hover:bg-red-500/10' : ''}`}
                >
                  {inCompare ? (
                    <>
                      <MinusCircle size={18} className="mr-2" />
                      Remove from Compare
                    </>
                  ) : (
                    <>
                      <PlusCircle size={18} className="mr-2" />
                      Add to Compare
                    </>
                  )}
                </Button>
              </div>
              
              {/* Quick specs */}
              <div className="bg-black/30 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Key Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(instrument.specs || {}).slice(0, 6).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span>{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Full Specifications */}
          <div className="border-t border-gray-700 p-6">
            <h2 className="text-2xl font-bold mb-6">Full Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {Object.entries(instrument.specs || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-700">
                  <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-medium">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Similar Instruments */}
        {similarInstruments.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Instruments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarInstruments.map(instr => (
                <Link 
                  key={instr.id} 
                  to={`/product/${instr.id}`}
                  className="bg-androidBox rounded-xl overflow-hidden hover:translate-y-[-4px] transition-transform duration-200"
                >
                  <div className="p-4">
                    <div className="bg-black rounded-lg h-40 flex items-center justify-center mb-4">
                      <img 
                        src={instr.image || '/placeholder.svg'}
                        alt={instr.name}
                        className="max-h-full max-w-full object-contain p-4"
                      />
                    </div>
                    <h3 className="font-medium">{instr.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-primary font-bold">₹{instr.price?.toLocaleString()}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span>{instr.rating || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />

      <BuyLinksDialog 
        isOpen={buyDialogOpen}
        onClose={() => setBuyDialogOpen(false)}
        instrumentName={instrument.name}
        buyLinks={buyLinks}
      />
    </div>
  );
};

export default ProductDetail;
