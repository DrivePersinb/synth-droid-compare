
import { supabase } from "@/integrations/supabase/client";
import { Brand, FilterOptions, Instrument, SortOption } from "@/data/instrumentTypes";

// Helper function to map database record to Instrument type
function mapDbRecordToInstrument(record: any): Instrument {
  return {
    id: record.id,
    name: record.name,
    brand: record.brand as Brand,
    image: record.image || '/placeholder.svg',
    price: record.price,
    rating: record.rating || 4.5,
    releaseYear: record.release_year,
    description: record.description || '',
    specs: record.specs || {},
    compareCount: record.compare_count || 0,
    popularityScore: record.popularity_score || 50
  };
}

export async function fetchAllInstruments(): Promise<Instrument[]> {
  const { data, error } = await supabase
    .from('instruments')
    .select('*');
    
  if (error) {
    console.error("Error fetching instruments:", error);
    throw new Error("Failed to fetch instruments");
  }
  
  return (data || []).map(mapDbRecordToInstrument);
}

export async function fetchInstrumentById(id: string): Promise<Instrument | null> {
  const { data, error } = await supabase
    .from('instruments')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    if (error.code === 'PGRST116') { // Not found error
      return null;
    }
    console.error("Error fetching instrument:", error);
    throw new Error("Failed to fetch instrument");
  }
  
  return data ? mapDbRecordToInstrument(data) : null;
}

export async function fetchInstrumentsByBrand(brand: Brand): Promise<Instrument[]> {
  const { data, error } = await supabase
    .from('instruments')
    .select('*')
    .eq('brand', brand);
    
  if (error) {
    console.error("Error fetching instruments by brand:", error);
    throw new Error(`Failed to fetch instruments for brand: ${brand}`);
  }
  
  return (data || []).map(mapDbRecordToInstrument);
}

export async function fetchLatestInstruments(limit = 6): Promise<Instrument[]> {
  const { data, error } = await supabase
    .from('instruments')
    .select('*')
    .order('release_year', { ascending: false })
    .limit(limit);
    
  if (error) {
    console.error("Error fetching latest instruments:", error);
    throw new Error("Failed to fetch latest instruments");
  }
  
  return (data || []).map(mapDbRecordToInstrument);
}

export async function incrementCompareCount(id: string): Promise<void> {
  // Since we don't have the increment_compare_count function yet, let's directly update the count
  const { data: instrument } = await supabase
    .from('instruments')
    .select('compare_count')
    .eq('id', id)
    .single();
    
  if (instrument) {
    await supabase
      .from('instruments')
      .update({ compare_count: (instrument.compare_count || 0) + 1 })
      .eq('id', id);
  }
}

export function getInstrumentImagePath(id: string): string {
  // Check if the image is from Supabase storage
  if (id.startsWith('http')) {
    return id;
  }
  
  // Return the placeholder image if no valid image is found
  return `/placeholder.svg`;
}

export async function fetchFilteredInstruments(
  filters: FilterOptions,
  sort: SortOption
): Promise<Instrument[]> {
  // Start with a base query
  let query = supabase.from('instruments').select('*');
  
  // Apply filters
  if (filters.priceRange) {
    query = query
      .gte('price', filters.priceRange[0])
      .lte('price', filters.priceRange[1]);
  }
  
  if (filters.brands && filters.brands.length > 0) {
    query = query.in('brand', filters.brands);
  }
  
  if (filters.releaseYears && filters.releaseYears.length > 0) {
    query = query.in('release_year', filters.releaseYears);
  }
  
  if (filters.hasSequencer !== undefined) {
    query = query.eq('specs->>sequencer', filters.hasSequencer.toString());
  }
  
  // Apply sorting
  switch (sort) {
    case 'price-low-high':
      query = query.order('price', { ascending: true });
      break;
    case 'price-high-low':
      query = query.order('price', { ascending: false });
      break;
    case 'popularity':
      query = query.order('popularity_score', { ascending: false });
      break;
    case 'rating':
      query = query.order('rating', { ascending: false });
      break;
    case 'newest':
      query = query.order('release_year', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching filtered instruments:", error);
    throw new Error("Failed to fetch instruments");
  }
  
  return (data || []).map(mapDbRecordToInstrument);
}

// New function to update an instrument
export async function updateInstrument(instrument: Instrument): Promise<void> {
  const { id, ...instrumentData } = instrument;
  
  // Convert from our frontend model to database model
  const dbData = {
    name: instrumentData.name,
    brand: instrumentData.brand,
    image: instrumentData.image,
    price: instrumentData.price,
    rating: instrumentData.rating,
    release_year: instrumentData.releaseYear,
    description: instrumentData.description,
    specs: instrumentData.specs,
    compare_count: instrumentData.compareCount,
    popularity_score: instrumentData.popularityScore,
    updated_at: new Date().toISOString()
  };
  
  const { error } = await supabase
    .from('instruments')
    .update(dbData)
    .eq('id', id);
    
  if (error) {
    console.error("Error updating instrument:", error);
    throw new Error("Failed to update instrument");
  }
}

// New function to delete an instrument
export async function deleteInstrument(id: string): Promise<void> {
  const { error } = await supabase
    .from('instruments')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error("Error deleting instrument:", error);
    throw new Error("Failed to delete instrument");
  }
}
