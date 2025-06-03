import React from "react";
import { useInstruments } from "@/hooks/useInstruments";
import { useCompare } from "@/contexts/CompareContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useSpecCategories, useSpecFields } from "@/hooks/useSpecifications";

const CompareTable = () => {
  const { compareItems, removeFromCompare } = useCompare();
  const { data: instruments = [] } = useInstruments();
  const { data: categories = [] } = useSpecCategories();
  const { data: fields = [] } = useSpecFields();

  const comparedInstruments = instruments.filter(instrument => 
    compareItems.includes(instrument.id)
  );

  const renderSpecValue = (value: unknown): React.ReactNode => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (value === null || value === undefined) {
      return '-';
    }
    return String(value);
  };

  const getCategoryFields = (categoryId: string) => {
    return fields
      .filter(field => field.category_id === categoryId)
      .sort((a, b) => a.display_order - b.display_order);
  };

  const hasAnyData = (fieldName: string) => {
    return comparedInstruments.some(instrument => 
      instrument.specs?.[fieldName] !== undefined && 
      instrument.specs?.[fieldName] !== null && 
      instrument.specs?.[fieldName] !== ""
    );
  };

  const sortedCategories = [...categories].sort((a, b) => a.display_order - b.display_order);

  if (comparedInstruments.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No instruments to compare</h2>
        <p className="text-gray-400">Add some instruments to your comparison list to see them here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left p-4 font-medium">Specification</th>
            {comparedInstruments.map(instrument => (
              <th key={instrument.id} className="text-left p-4 min-w-[200px]">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{instrument.name}</h3>
                      <p className="text-sm text-gray-400">{instrument.brand}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCompare(instrument.id)}
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
              <td key={instrument.id} className="p-4">
                ₹{instrument.price?.toLocaleString()}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-700/50">
            <td className="p-4 font-medium text-primary">Rating</td>
            {comparedInstruments.map(instrument => (
              <td key={instrument.id} className="p-4">
                {instrument.rating ? `${instrument.rating}/5` : 'N/A'}
              </td>
            ))}
          </tr>
          <tr className="border-b border-gray-700/50">
            <td className="p-4 font-medium text-primary">Release Year</td>
            {comparedInstruments.map(instrument => (
              <td key={instrument.id} className="p-4">
                {instrument.release_year || 'N/A'}
              </td>
            ))}
          </tr>

          {/* Categorized Specifications */}
          {sortedCategories.map(category => {
            const categoryFields = getCategoryFields(category.id);
            const fieldsWithData = categoryFields.filter(field => hasAnyData(field.name));
            
            if (fieldsWithData.length === 0) return null;

            return (
              <React.Fragment key={category.id}>
                <tr className="border-b border-gray-700">
                  <td colSpan={comparedInstruments.length + 1} className="p-4 bg-gray-800/50">
                    <h3 className="font-semibold text-primary">{category.name}</h3>
                  </td>
                </tr>
                {fieldsWithData.map(field => (
                  <tr key={field.id} className="border-b border-gray-700/50">
                    <td className="p-4 font-medium">{field.display_name}</td>
                    {comparedInstruments.map(instrument => (
                      <td key={instrument.id} className="p-4">
                        {renderSpecValue(instrument.specs?.[field.name])}
                      </td>
                    ))}
                  </tr>
                ))}
              </React.Fragment>
            );
          })}

          {/* Other specifications not in defined categories */}
          {comparedInstruments.some(instrument => 
            Object.keys(instrument.specs || {}).some(key => 
              key !== 'buyLinks' && !fields.some(field => field.name === key)
            )
          ) && (
            <>
              <tr className="border-b border-gray-700">
                <td colSpan={comparedInstruments.length + 1} className="p-4 bg-gray-800/50">
                  <h3 className="font-semibold text-primary">Other Specifications</h3>
                </td>
              </tr>
              {Array.from(new Set(
                comparedInstruments.flatMap(instrument => 
                  Object.keys(instrument.specs || {}).filter(key => 
                    key !== 'buyLinks' && !fields.some(field => field.name === key)
                  )
                )
              )).map(specKey => (
                <tr key={specKey} className="border-b border-gray-700/50">
                  <td className="p-4 font-medium capitalize">
                    {specKey.replace(/([A-Z])/g, ' $1').trim()}
                  </td>
                  {comparedInstruments.map(instrument => (
                    <td key={instrument.id} className="p-4">
                      {renderSpecValue(instrument.specs?.[specKey])}
                    </td>
                  ))}
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;
