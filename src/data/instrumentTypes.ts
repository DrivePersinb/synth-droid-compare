
export type Brand = "Roland" | "Yamaha" | "Korg" | "Moog" | "Sequential" | "Novation" | "Arturia" | "Behringer" | "Nord" | "Access" | "Waldorf" | "Elektron" | "Casio";

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
    keys: number;
    keyType: string;
    soundEngine: string;
    polyphony: number;
    presets: number;
    sequencer: boolean;
    effects: number;
    outputs: number;
    weight: string;
  };
  compareCount: number;
  popularityScore: number;
}

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
