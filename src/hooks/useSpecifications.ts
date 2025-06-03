
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SpecCategory {
  id: string;
  name: string;
  display_order: number;
  created_at: string;
}

export interface SpecField {
  id: string;
  category_id: string | null;
  name: string;
  display_name: string;
  display_order: number;
  created_at: string;
}

export const useSpecCategories = () => {
  return useQuery({
    queryKey: ['spec-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('spec_categories')
        .select('*')
        .order('display_order');

      if (error) {
        console.error('Error fetching spec categories:', error);
        throw error;
      }

      return data as SpecCategory[];
    },
  });
};

export const useSpecFields = () => {
  return useQuery({
    queryKey: ['spec-fields'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('spec_fields')
        .select('*')
        .order('category_id, display_order');

      if (error) {
        console.error('Error fetching spec fields:', error);
        throw error;
      }

      return data as SpecField[];
    },
  });
};

export const useAddSpecCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (category: { name: string; display_order: number }) => {
      const { data, error } = await supabase
        .from('spec_categories')
        .insert([category])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spec-categories'] });
    },
  });
};

export const useAddSpecField = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (field: { category_id: string; name: string; display_name: string; display_order: number }) => {
      const { data, error } = await supabase
        .from('spec_fields')
        .insert([field])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spec-fields'] });
    },
  });
};

export const useDeleteSpecCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('spec_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spec-categories'] });
      queryClient.invalidateQueries({ queryKey: ['spec-fields'] });
    },
  });
};

export const useDeleteSpecField = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('spec_fields')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spec-fields'] });
    },
  });
};
