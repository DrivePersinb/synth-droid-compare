
import React from "react";
import { useSpecCategories, useSpecFields } from "@/hooks/useSpecifications";

interface StructuredSpecificationsProps {
  specs: Record<string, any>;
  showOnlyAvailable?: boolean;
}

const StructuredSpecifications: React.FC<StructuredSpecificationsProps> = ({ 
  specs, 
  showOnlyAvailable = true 
}) => {
  const { data: categories = [] } = useSpecCategories();
  const { data: fields = [] } = useSpecFields();

  const renderSpecValue = (value: unknown): React.ReactNode => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (value === null || value === undefined) {
      return 'N/A';
    }
    return String(value);
  };

  const getCategoryFields = (categoryId: string) => {
    return fields
      .filter(field => field.category_id === categoryId)
      .sort((a, b) => a.display_order - b.display_order);
  };

  const hasAvailableFields = (categoryId: string) => {
    const categoryFields = getCategoryFields(categoryId);
    return categoryFields.some(field => 
      specs[field.name] !== undefined && 
      specs[field.name] !== null && 
      specs[field.name] !== ""
    );
  };

  const sortedCategories = [...categories].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="space-y-6">
      {sortedCategories.map(category => {
        const categoryFields = getCategoryFields(category.id);
        
        if (showOnlyAvailable && !hasAvailableFields(category.id)) {
          return null;
        }

        return (
          <div key={category.id} className="space-y-3">
            <h3 className="text-lg font-semibold text-primary border-b border-gray-700 pb-2">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryFields.map(field => {
                const value = specs[field.name];
                
                if (showOnlyAvailable && (value === undefined || value === null || value === "")) {
                  return null;
                }

                return (
                  <div key={field.id} className="flex justify-between py-2 border-b border-gray-700/50">
                    <span className="text-gray-400">{field.display_name}</span>
                    <span className="font-medium">{renderSpecValue(value)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      
      {/* Show any specs that don't match defined fields */}
      {Object.entries(specs).filter(([key]) => 
        key !== 'buyLinks' && !fields.some(field => field.name === key)
      ).length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary border-b border-gray-700 pb-2">
            Other Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(specs)
              .filter(([key]) => key !== 'buyLinks' && !fields.some(field => field.name === key))
              .map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-700/50">
                  <span className="text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-medium">{renderSpecValue(value)}</span>
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default StructuredSpecifications;
