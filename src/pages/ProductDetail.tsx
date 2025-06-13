
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, MinusCircle, ArrowLeft, Star } from "lucide-react";
import { getInstrumentById } from "@/data/instrumentsData";
import { useProductDetailsByUniqueId } from "@/hooks/useProductDetailsByUniqueId";
import BuyLinksDialog from "@/components/BuyLinksDialog";
import StructuredSpecifications from "@/components/StructuredSpecifications";
import FAQSection from "@/components/FAQSection";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  
  const instrument = id ? getInstrumentById(id) : undefined;
  const { data: productDetails, isLoading: detailsLoading } = useProductDetailsByUniqueId(instrument?.uniqueId || '');
  
  const inCompare = instrument ? isInCompare(instrument.id) : false;

  const handleCompareToggle = () => {
    if (!instrument) return;
    
    if (inCompare) {
      removeFromCompare(instrument.id);
    } else {
      addToCompare(instrument.id);
    }
  };

  if (!instrument) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-6">Instrument not found</h1>
          <p className="text-muted-foreground mb-6">
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
        <div className="mb-8">
          <Link to="/all-instruments" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-4">
            <ArrowLeft size={20} className="mr-2" /> Back to instruments
          </Link>
        </div>
        
        <div className="glass-effect rounded-3xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Enhanced image section */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                <img 
                  src={instrument.image || '/placeholder.svg'} 
                  alt={instrument.name}
                  className="relative z-10 max-w-full max-h-full object-contain"
                />
              </div>
            </div>
            
            {/* Enhanced info section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium">
                    {instrument.brand}
                  </span>
                  <span className="px-3 py-1 glass-effect rounded-full text-sm">
                    {instrument.releaseYear}
                  </span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
                    ID: {instrument.uniqueId}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{instrument.name}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(instrument.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-medium">{instrument.rating}</span>
                  </div>
                </div>
                
                <div className="text-4xl font-bold gradient-text mb-6">
                  ₹{instrument.price?.toLocaleString()}
                </div>
                
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  {instrument.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                {productDetails?.buyLinks && productDetails.buyLinks.length > 0 && (
                  <Button 
                    size="lg" 
                    className="btn-primary flex-1"
                    onClick={() => setBuyDialogOpen(true)}
                  >
                    Buy Now
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleCompareToggle}
                  className={`flex-1 ${inCompare ? 'border-red-500 text-red-500 hover:bg-red-500/10' : 'btn-secondary'}`}
                >
                  {inCompare ? (
                    <>
                      <MinusCircle size={20} className="mr-2" />
                      Remove from Compare
                    </>
                  ) : (
                    <>
                      <PlusCircle size={20} className="mr-2" />
                      Add to Compare
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Enhanced specifications section */}
          {productDetails?.specifications && (
            <div className="border-t border-border p-8">
              <h2 className="text-2xl font-bold mb-8">Technical Specifications</h2>
              <StructuredSpecifications specifications={productDetails.specifications} />
            </div>
          )}

          {/* Enhanced FAQ section */}
          {productDetails?.faq && (
            <div className="border-t border-border p-8">
              <FAQSection faqs={productDetails.faq} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />

      <BuyLinksDialog 
        isOpen={buyDialogOpen}
        onClose={() => setBuyDialogOpen(false)}
        instrumentName={instrument.name}
        buyLinks={productDetails?.buyLinks || []}
      />
    </div>
  );
};

export default ProductDetail;
