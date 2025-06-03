
import { useState, useEffect } from 'react';
import { ProductDetails } from '@/data/products/roland-jupiter-x';

const productDetailsMap: { [key: string]: () => Promise<ProductDetails> } = {
  'roland-jupiter-x': () => import('@/data/products/roland-jupiter-x').then(m => m.rolandJupiterX),
  'yamaha-montage-8': () => import('@/data/products/yamaha-montage-8').then(m => m.yamahaMontage8),
  'korg-minilogue-xd': () => import('@/data/products/korg-minilogue-xd').then(m => m.korgMinilogueXd),
  'korg-kronos-2': () => import('@/data/products/korg-kronos-2').then(m => m.korgKronos2),
};

export const useProductDetails = (productId: string) => {
  const [data, setData] = useState<ProductDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProductDetails = async () => {
      setIsLoading(true);
      try {
        const loader = productDetailsMap[productId];
        if (loader) {
          const details = await loader();
          setData(details);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error('Error loading product details:', error);
        setData(null);
      }
      setIsLoading(false);
    };

    if (productId) {
      loadProductDetails();
    }
  }, [productId]);

  return { data, isLoading };
};
