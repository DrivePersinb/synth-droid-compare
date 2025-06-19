
import { useState, useEffect } from 'react';
import { ProductDetails } from '@/types/ProductDetails';
import { instrumentDetailsRegistry, hasInstrumentDetails } from '@/data/instrumentDetailsRegistry';

export const useProductDetailsByUniqueId = (uniqueId: string) => {
  const [data, setData] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProductDetails = async () => {
      if (!uniqueId) {
        setData(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      try {
        if (hasInstrumentDetails(uniqueId)) {
          const details = await instrumentDetailsRegistry[uniqueId]();
          setData(details);
        } else {
          console.warn(`No product details found for ID: ${uniqueId}`);
          setData(null);
        }
      } catch (error) {
        console.error('Error loading product details:', error);
        setData(null);
      }
      
      setIsLoading(false);
    };

    loadProductDetails();
  }, [uniqueId]);

  return { data, isLoading };
};
