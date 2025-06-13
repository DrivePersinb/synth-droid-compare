
import { useState, useEffect } from 'react';
import { ProductDetails } from '@/data/products/roland-jupiter-x';

const productDetailsMap: { [key: string]: () => Promise<ProductDetails> } = {
  '1000001': () => import('@/data/instruments/1000001').then(m => m.instrument1000001),
  '2000001': () => import('@/data/instruments/2000001').then(m => m.instrument2000001),
  '3000001': () => import('@/data/instruments/3000001').then(m => m.instrument3000001),
  '3000002': () => import('@/data/instruments/3000002').then(m => m.instrument3000002),
  '1000002': () => import('@/data/instruments/1000002').then(m => m.instrument1000002),
};

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
        const loader = productDetailsMap[uniqueId];
        if (loader) {
          const details = await loader();
          setData(details);
        } else {
          console.warn(`No product details found for unique ID: ${uniqueId}`);
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
