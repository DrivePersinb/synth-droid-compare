
import { instruments, getBrands, InstrumentBasic } from '@/data/instrumentsData';

export const useInstruments = () => {
  return { data: instruments, isLoading: false };
};

export const useBrands = () => {
  return { data: getBrands(), isLoading: false };
};
