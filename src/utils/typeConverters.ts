
import { DatabaseInstrument } from '@/hooks/useInstruments';
import { Instrument } from '@/data/instrumentTypes';

export const convertDatabaseToInstrument = (dbInstrument: DatabaseInstrument): Instrument => {
  return {
    id: dbInstrument.id,
    name: dbInstrument.name,
    brand: dbInstrument.brand as any, // Convert to Brand type
    image: dbInstrument.image || '/placeholder.svg',
    price: Number(dbInstrument.price),
    rating: Number(dbInstrument.rating || 0),
    releaseYear: dbInstrument.release_year || 2023,
    description: dbInstrument.description,
    specs: dbInstrument.specs as any,
    compareCount: dbInstrument.compare_count,
    popularityScore: dbInstrument.popularity_score
  };
};
