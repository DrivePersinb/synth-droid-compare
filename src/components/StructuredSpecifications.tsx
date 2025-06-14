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
    <div className="space-y-6">
      {specifications.map((category, categoryIndex) => (
        <div key={categoryIndex} className="space-y-3">
          <h3 className="text-lg font-semibold text-primary border-b border-gray-700 pb-2">
            {category.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(category.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-700/50">
                <span className="text-gray-400">{key}</span>
                <span className="font-medium">{renderSpecValue(value)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StructuredSpecifications;
