
export type Brand = "Roland" | "Yamaha" | "Korg" | "Moog" | "Sequential" | "Novation" | "Arturia" | "Behringer" | "Nord" | "Access" | "Waldorf" | "Elektron" | "Casio";

export interface InstrumentBasic {
  uniqueId: string; // 7-digit unique identifier - now the primary ID
  name: string;
  brand: Brand;
  image: string;
  price: number;
  rating: number;
  releaseYear: number;
  description: string;
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

export const instruments: InstrumentBasic[] = [
  {
    uniqueId: "1000001",
    name: "Roland Jupiter-X",
    brand: "Roland",
    image: "/images/roland-jupiter-x.jpg",
    price: 199999,
    rating: 4.8,
    releaseYear: 2019,
    description: "Legendary Jupiter sound with modern ZEN-Core technology and deep synthesis capabilities.",
    popularityScore: 95
  },
  {
    uniqueId: "2000001",
    name: "Yamaha MONTAGE 8",
    brand: "Yamaha",
    image: "/images/yamaha-montage-8.jpg",
    price: 329999,
    rating: 4.9,
    releaseYear: 2016,
    description: "Professional synthesizer workstation with AWM2 and FM-X sound engines.",
    popularityScore: 98
  },
  {
    uniqueId: "3000001",
    name: "Korg minilogue xd",
    brand: "Korg",
    image: "/images/korg-minilogue-xd.jpg",
    price: 54999,
    rating: 4.7,
    releaseYear: 2019,
    description: "Analog synthesizer with digital multi-engine for hybrid sound creation.",
    popularityScore: 92
  },
  {
    uniqueId: "3000002",
    name: "Korg Kronos 2",
    brand: "Korg",
    image: "/images/korg-kronos-2.jpg",
    price: 329999,
    rating: 4.8,
    releaseYear: 2017,
    description: "Ultimate music workstation with 9 sound engines and comprehensive sampling.",
    popularityScore: 90
  },
  {
    uniqueId: "1000002",
    name: "Roland Fantom 8",
    brand: "Roland",
    image: "/images/roland-fantom-8.jpg",
    price: 279999,
    rating: 4.7,
    releaseYear: 2019,
    description: "Next-generation music production workstation with ZEN-Core synthesis and advanced sampling.",
    popularityScore: 89
  }
];

export const getInstrumentByUniqueId = (uniqueId: string): InstrumentBasic | undefined => {
  return instruments.find(instrument => instrument.uniqueId === uniqueId);
};

export const getBrands = (): string[] => {
  return Array.from(new Set(instruments.map(i => i.brand))).sort();
};

export const instrumentFilters = {
  brands: getBrands(),
  releaseYears: Array.from(new Set(instruments.map(i => i.releaseYear))).sort((a, b) => a - b),
  priceRange: [
    Math.min(...instruments.map(i => i.price)),
    Math.max(...instruments.map(i => i.price))
  ]
};

// Backward compatibility
export const instrumentsData = instruments;
