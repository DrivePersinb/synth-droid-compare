
import { useState, useEffect } from 'react';
import { instrumentsData, InstrumentBasic, getBrands } from '@/data/instrumentsData';

export const useInstruments = () => {
  const [data, setData] = useState<InstrumentBasic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate async loading
    const loadData = async () => {
      setIsLoading(true);
      // Add small delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, 100));
      setData(instrumentsData);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return { data, isLoading };
};

export const useBrands = () => {
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBrands = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 50));
      setData(getBrands());
      setIsLoading(false);
    };

    loadBrands();
  }, []);

  return { data, isLoading };
};
