
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DatabaseInstrument {
  id: string;
  name: string;
  brand: string;
  image: string | null;
  price: number;
  rating: number | null;
  release_year: number | null;
  description: string;
  specs: any;
  compare_count: number;
  popularity_score: number;
  category: string;
  subcategory: string | null;
  created_at: string;
  updated_at: string;
}

export const useInstruments = () => {
  return useQuery({
    queryKey: ['instruments'],
    queryFn: async () => {
      console.log('Fetching instruments from database...');
      const { data, error } = await supabase
        .from('instruments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching instruments:', error);
        throw error;
      }

      console.log('Fetched instruments:', data);
      return data as DatabaseInstrument[];
    },
  });
};

export const useInstrumentsByBrand = (brand: string) => {
  return useQuery({
    queryKey: ['instruments', 'brand', brand],
    queryFn: async () => {
      console.log(`Fetching instruments for brand: ${brand}`);
      const { data, error } = await supabase
        .from('instruments')
        .select('*')
        .ilike('brand', brand)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching instruments by brand:', error);
        throw error;
      }

      console.log(`Fetched instruments for ${brand}:`, data);
      return data as DatabaseInstrument[];
    },
  });
};

export const useBrands = () => {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      console.log('Fetching unique brands from database...');
      const { data, error } = await supabase
        .from('instruments')
        .select('brand')
        .order('brand');

      if (error) {
        console.error('Error fetching brands:', error);
        throw error;
      }

      // Get unique brands
      const uniqueBrands = [...new Set(data.map(item => item.brand))];
      console.log('Unique brands:', uniqueBrands);
      return uniqueBrands;
    },
  });
};
