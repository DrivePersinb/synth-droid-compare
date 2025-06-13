
import React from "react";
import { useInstruments } from "@/hooks/useInstruments";
import { useCompare } from "@/contexts/CompareContext";
import { useProductDetailsByUniqueId } from "@/hooks/useProductDetailsByUniqueId";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CompareTable = () => {
  const { compareItems, removeFromCompare } = useCompare();
  const { data: instruments = [] } = useInstruments();

  const comparedInstruments = instruments.filter(instrument => 
    compareItems.some(item => item.instrumentId === instrument.uniqueId)
  );

  // Get product details using unique IDs
  const productDetails1 = useProductDetailsByUniqueId(comparedInstruments[0]?.uniqueId || '');
  const productDetails2 = useProductDetailsByUniqueId(comparedInstruments[1]?.uniqueId || '');
  const productDetails3 = useProductDetailsByUniqueId(comparedInstruments[2]?.uniqueId || '');
  const productDetails4 = useProductDetailsByUniqueId(comparedInstruments[3]?.uniqueId || '');

  // Create an array of the product details in order
  const productDetailsQueries = [
    productDetails1,
    productDetails2,
    productDetails3,
    productDetails4
  ].slice(0, comparedInstruments.length);

  const renderSpecValue = (value: unknown): React.ReactNode => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (value === null || value === undefined) {
      return '-';
    }
    return String(value);
  };

  if (comparedInstruments.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No instruments to compare</h2>
        <p className="text-gray-400">Add some instruments to your comparison list to see them here.</p>
      </div>
    );
  }

  // Collect all specification categories from all instruments
  const allCategories = new Map<string, Set<string>>();
  productDetailsQueries.forEach(query => {
    if (query.data?.specifications) {
      query.data.specifications.forEach(category => {
        if (!allCategories.has(category.name)) {
          allCategories.set(category.name, new Set());
        }
        Object.keys(category.specs).forEach(specKey => {
          allCategories.get(category.name)?.add(specKey);
        });
      });
    }
  });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left p-4 font-medium">Specification</th>
            {comparedInstruments.map(instrument => (
              <th key={instrument.uniqueId} className="text-left p-4 min-w-[200px]">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{instrument.name}</h3>
                      <p className="text-sm text-gray-400">{instrument.brand}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCompare(instrument.uniqueId)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  <div className="text-primary font-bold">
                    ₹{instrument.price?.toLocaleString()}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Basic Info */}
          <tr className="border-b border-gray-700/50">
            <td className="p-4 font-medium text-primary">Price</td>
            {comparedInstruments.map(instrument => (
              <td key={instrument.uniqueId} className="p-4">
                ₹{instrument.price?.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-700/50">
            <td className="p-4 font-medium text-primary">Rating</td>
            {comparedInstruments.map(instrument => (
              <td key={instrument.uniqueId} className="p-4">
                {instrument.rating ? `${instrument.rating}/5` : 'N/A'}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-700/50">
            <td className="p-4 font-medium text-primary">Release Year</td>
            {comparedInstruments.map(instrument => (
              <td key={instrument.uniqueId} className="p-4">
                {instrument.releaseYear || 'N/A'}
              </td>
            ))}
          </tr>

          {/* Detailed Specifications by Category */}
          {Array.from(allCategories.entries()).map(([categoryName, specs]) => (
            <React.Fragment key={categoryName}>
              <tr className="border-b border-gray-700">
                <td colSpan={comparedInstruments.length + 1} className="p-4 bg-gray-800/50">
                  <h3 className="font-semibold text-primary">{categoryName}</h3>
                </td>
              </tr>
              {Array.from(specs).map(specKey => {
                // Check if at least one instrument has this specification
                const hasData = productDetailsQueries.some(query => 
                  query.data?.specifications?.some(cat => 
                    cat.name === categoryName && cat.specs[specKey] !== undefined
                  )
                );

                if (!hasData) return null;

                return (
                  <tr key={specKey} className="border-b border-gray-700/50">
                    <td className="p-4 font-medium">{specKey}</td>
                    {comparedInstruments.map((instrument, index) => {
                      const productDetails = productDetailsQueries[index].data;
                      const category = productDetails?.specifications?.find(cat => cat.name === categoryName);
                      const value = category?.specs[specKey];
                      
                      return (
                        <td key={instrument.uniqueId} className="p-4">
                          {renderSpecValue(value)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
