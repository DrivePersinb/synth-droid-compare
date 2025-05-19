
import React from "react";
import { Link } from "react-router-dom";
import { Instrument } from "@/data/instrumentTypes";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts/CompareContext";
import { getInstrumentImagePath } from "@/data/instruments";
import { X } from "lucide-react";

interface CompareTableProps {
  instruments: Instrument[];
}

const CompareTable: React.FC<CompareTableProps> = ({ instruments }) => {
  const { removeFromCompare } = useCompare();

  if (instruments.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No instruments to compare</h2>
        <p className="text-gray-400 mb-6">
          Add some instruments to your comparison list to see them here
        </p>
        <Button asChild>
          <Link to="/all-instruments">Browse Instruments</Link>
        </Button>
      </div>
    );
  }

  // Get all unique spec keys from all instruments
  const allSpecs = new Set<string>();
  instruments.forEach(instrument => {
    Object.keys(instrument.specs).forEach(key => {
      allSpecs.add(key);
    });
  });
  
  const specKeys = Array.from(allSpecs);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr>
            <th className="p-4 text-left border-b border-gray-700 bg-androidBox sticky left-0 z-10">Specification</th>
            {instruments.map((instrument) => (
              <th key={instrument.id} className="p-4 text-center border-b border-gray-700 bg-androidBox min-w-[200px]">
                <div className="relative">
                  <button 
                    onClick={() => removeFromCompare(instrument.id)}
                    className="absolute top-0 right-0 text-gray-400 hover:text-white"
                    title="Remove from comparison"
                  >
                    <X size={16} />
                  </button>
                  <div className="h-32 flex items-center justify-center mb-2">
                    <img 
                      src={instrument.image === '/placeholder.svg' ? '/placeholder.svg' : getInstrumentImagePath(instrument.id)} 
                      alt={instrument.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="text-sm text-gray-400">{instrument.brand}</div>
                  <div className="text-lg font-medium">{instrument.name}</div>
                  <div className="text-xl font-bold text-primary mt-1">${instrument.price}</div>
                  <div className="mt-2">
                    <Button asChild size="sm">
                      <Link to={`/product/${instrument.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Body */}
        <tbody>
          {/* Basic specs */}
          <tr>
            <td className="p-4 text-left border-b border-gray-700 bg-androidBox font-medium sticky left-0 z-10">
              Rating
            </td>
            {instruments.map((instrument) => (
              <td key={instrument.id} className="p-4 text-center border-b border-gray-700">
                <div className="flex items-center justify-center">
                  <span className="text-yellow-400">★</span> {instrument.rating}
                </div>
              </td>
            ))}
          </tr>
          
          <tr>
            <td className="p-4 text-left border-b border-gray-700 bg-androidBox font-medium sticky left-0 z-10">
              Release Year
            </td>
            {instruments.map((instrument) => (
              <td key={instrument.id} className="p-4 text-center border-b border-gray-700">
                {instrument.releaseYear}
              </td>
            ))}
          </tr>
          
          {/* Dynamic specs */}
          {specKeys.map((key) => (
            <tr key={key}>
              <td className="p-4 text-left border-b border-gray-700 bg-androidBox font-medium sticky left-0 z-10 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </td>
              {instruments.map((instrument) => (
                <td key={instrument.id} className="p-4 text-center border-b border-gray-700">
                  {instrument.specs[key] !== undefined ? (
                    typeof instrument.specs[key] === 'boolean' ? 
                      instrument.specs[key] ? '✓' : '✗' : 
                      instrument.specs[key]
                  ) : (
                    <span className="text-gray-500">—</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
