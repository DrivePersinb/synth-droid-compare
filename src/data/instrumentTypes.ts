
// Types for our instrument data model
export interface Instrument {
  id: string;
  name: string;
  brand: Brand;
  image: string;
  price: number;
  rating: number;
  releaseYear: number;
  description: string;
  specs: {
    [key: string]: string | number | boolean;
  };
  // For comparison features
  compareCount: number;
  popularityScore: number;
}

export type Brand = "Roland" | "Casio" | "Yamaha" | "Korg";

export interface FilterOptions {
  priceRange: [number, number];
  brands: Brand[];
  releaseYears: number[];
  keysCount?: number[];
  hasSequencer?: boolean;
  polyphony?: number[];
}

export type SortOption = 
  | "price-low-high"
  | "price-high-low" 
  | "popularity"
  | "rating"
  | "newest";

export interface CompareItem {
  instrumentId: string;
  dateAdded: Date;
}
