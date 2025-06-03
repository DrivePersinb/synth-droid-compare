
import { useState, useEffect } from 'react';
import { instruments, getBrands, InstrumentBasic } from '@/data/instrumentsData';

export const useInstruments = () => {
  const [data, setData] = useState<InstrumentBasic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(instruments);
    setIsLoading(false);
  }, []);

  return { data, isLoading };
};

export const useBrands = () => {
  const [data, setData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setData(getBrands());
    setIsLoading(false);
  }, []);

  return { data, isLoading };
};
