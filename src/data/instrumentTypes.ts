
export type Brand = "Roland" | "Yamaha" | "Korg" | "Moog" | "Sequential" | "Novation" | "Arturia" | "Behringer" | "Nord" | "Access" | "Waldorf" | "Elektron";

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
