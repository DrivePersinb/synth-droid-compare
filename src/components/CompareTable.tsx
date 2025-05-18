
import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Instrument } from "@/data/instrumentTypes";
import { useCompare } from "@/contexts/CompareContext";
import { Trash } from "lucide-react";

interface CompareTableProps {
  instruments: Instrument[];
}

const CompareTable: React.FC<CompareTableProps> = ({ instruments }) => {
  const { removeFromCompare } = useCompare();
  
  if (instruments.length === 0) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-2xl font-bold mb-4">No instruments to compare</h2>
        <p className="mb-6 text-gray-400">
          Add some instruments to your comparison list to see how they stack up.
        </p>
        <Button asChild>
          <Link to="/all-instruments">Browse Instruments</Link>
        </Button>
      </div>
    );
  }
  
  // Get all unique spec keys from all instruments
  const allSpecsKeys = new Set<string>();
  instruments.forEach(instrument => {
    Object.keys(instrument.specs).forEach(key => {
      allSpecsKeys.add(key);
    });
  });
  
  // Sort spec keys alphabetically for consistent display
  const sortedSpecsKeys = Array.from(allSpecsKeys).sort();

  return (
    <div className="w-full overflow-auto">
      <Table className="table-fixed min-w-full">
        <TableHeader>
          <TableRow className="bg-black/40">
            <TableHead className="w-1/4 min-w-[200px]">Specification</TableHead>
            {instruments.map((instrument) => (
              <TableHead key={instrument.id} className="w-1/4 min-w-[200px]">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-xs text-muted-foreground">{instrument.brand}</div>
                    <div className="font-medium">{instrument.name}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCompare(instrument.id)}
                    className="h-7 w-7"
                  >
                    <Trash size={14} />
                  </Button>
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Image</TableCell>
            {instruments.map((instrument) => (
              <TableCell key={`${instrument.id}-image`}>
                <Link to={`/product/${instrument.id}`}>
                  <div className="h-32 flex items-center justify-center bg-black rounded overflow-hidden">
                    <img
                      src={instrument.image === '/placeholder.svg' ? '/placeholder.svg' : `/placeholder.svg`}
                      alt={instrument.name}
                      className="max-h-full max-w-full object-contain p-4"
                    />
                  </div>
                </Link>
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">Price</TableCell>
            {instruments.map((instrument) => (
              <TableCell key={`${instrument.id}-price`} className="text-primary font-bold">
                <div className="flex items-center">
                  <span className="mr-1">₹</span>{instrument.price.toLocaleString('en-IN')}
                </div>
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">Rating</TableCell>
            {instruments.map((instrument) => (
              <TableCell key={`${instrument.id}-rating`}>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{instrument.rating}</span>
                </div>
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow>
            <TableCell className="font-medium">Year</TableCell>
            {instruments.map((instrument) => (
              <TableCell key={`${instrument.id}-year`}>
                {instrument.releaseYear}
              </TableCell>
            ))}
          </TableRow>
          
          <TableRow className="bg-black/20">
            <TableCell colSpan={instruments.length + 1} className="font-bold py-2">
              Specifications
            </TableCell>
          </TableRow>
          
          {sortedSpecsKeys.map(specKey => (
            <TableRow key={`spec-${specKey}`}>
              <TableCell className="font-medium capitalize">
                {specKey.replace(/([A-Z])/g, ' $1').trim()}
              </TableCell>
              {instruments.map((instrument) => (
                <TableCell key={`${instrument.id}-${specKey}`}>
                  {instrument.specs[specKey] !== undefined ? 
                    typeof instrument.specs[specKey] === 'boolean' 
                      ? (instrument.specs[specKey] ? 'Yes' : 'No')
                      : instrument.specs[specKey]
                    : '-'
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompareTable;
