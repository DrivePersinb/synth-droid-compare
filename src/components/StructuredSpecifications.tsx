
import React from "react";
import { SpecificationCategory } from "@/types/ProductDetails";

interface StructuredSpecificationsProps {
  specifications: SpecificationCategory[];
}

const StructuredSpecifications: React.FC<StructuredSpecificationsProps> = ({ 
  specifications 
}) => {
  const renderSpecValue = (value: unknown): React.ReactNode => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (value === null || value === undefined) {
      return 'N/A';
    }
    return String(value);
  };

  if (!specifications || specifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No specifications available for this product.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {specifications.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          <h3 className="text-xl font-semibold text-primary pb-2">
            {category.name}
          </h3>
          <div className="space-y-3">
            {Object.entries(category.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-3 border-b border-gray-700/30">
                <span className="text-gray-300 font-medium">{key}</span>
                <span className="text-white font-semibold">{renderSpecValue(value)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StructuredSpecifications;
