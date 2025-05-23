
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useDeleteInstrument = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (instrumentId: string) => {
      const { error } = await supabase
        .from('instruments')
        .delete()
        .eq('id', instrumentId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instruments'] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast({
        title: "Success",
        description: "Instrument deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to delete instrument: ${error.message}`,
        variant: "destructive"
      });
    }
  });
};

export const useUpdateInstrument = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from('instruments')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instruments'] });
      queryClient.invalidateQueries({ queryKey: ['brands'] });
      toast({
        title: "Success",
        description: "Instrument updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to update instrument: ${error.message}`,
        variant: "destructive"
      });
    }
  });
};
