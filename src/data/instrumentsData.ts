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

export interface InstrumentBasic {
  id: string;
  name: string;
  brand: Brand;
  image: string;
  price: number;
  rating: number;
  releaseYear: number;
  description: string;
}

export const instruments: InstrumentBasic[] = [
  {
    id: "roland-jupiter-x",
    name: "Roland Jupiter-X",
    brand: "Roland",
    image: "/images/roland-jupiter-x.jpg",
    price: 199999,
    rating: 4.8,
    releaseYear: 2019,
    description: "Legendary Jupiter sound with modern ZEN-Core technology and deep synthesis capabilities."
  },
  {
    id: "yamaha-montage-8",
    name: "Yamaha MONTAGE 8",
    brand: "Yamaha",
    image: "/images/yamaha-montage-8.jpg",
    price: 329999,
    rating: 4.9,
    releaseYear: 2016,
    description: "Professional synthesizer workstation with AWM2 and FM-X sound engines."
  },
  {
    id: "korg-minilogue-xd",
    name: "Korg minilogue xd",
    brand: "Korg",
    image: "/images/korg-minilogue-xd.jpg",
    price: 54999,
    rating: 4.7,
    releaseYear: 2019,
    description: "Analog synthesizer with digital multi-engine for hybrid sound creation."
  },
  {
    id: "korg-kronos-2",
    name: "Korg Kronos 2",
    brand: "Korg",
    image: "/images/korg-kronos-2.jpg",
    price: 329999,
    rating: 4.8,
    releaseYear: 2017,
    description: "Ultimate music workstation with 9 sound engines and comprehensive sampling."
  },
  {
    id: "roland-fantom-8",
    name: "Roland Fantom 8",
    brand: "Roland",
    image: "/images/roland-fantom-8.jpg",
    price: 279999,
    rating: 4.7,
    releaseYear: 2019,
    description: "Next-generation music production workstation with ZEN-Core synthesis and advanced sampling."
  },
  {
    id: "sequential-prophet-5",
    name: "Sequential Prophet-5",
    brand: "Sequential",
    image: "/images/sequential-prophet-5.jpg",
    price: 429900,
    rating: 4.9,
    releaseYear: 2020,
    description: "The return of a legend - the most iconic analog polysynth of all time."
  },
  {
    id: "moog-one-16",
    name: "Moog One 16-Voice",
    brand: "Moog",
    image: "/images/moog-one-16.jpg",
    price: 799900,
    rating: 4.9,
    releaseYear: 2018,
    description: "The ultimate Moog synthesizer - a tri-timbral, polyphonic, analog dream machine."
  },
  {
    id: "novation-summit",
    name: "Novation Summit",
    brand: "Novation",
    image: "/images/novation-summit.jpg",
    price: 319900,
    rating: 4.7,
    releaseYear: 2019,
    description: "A powerful hybrid synthesizer combining FPGA-based digital oscillators with analog filters and VCAs."
  },
  {
    id: "arturia-polybrute",
    name: "Arturia PolyBrute",
    brand: "Arturia",
    image: "/images/arturia-polybrute.jpg",
    price: 64900,
    rating: 4.8,
    releaseYear: 2020,
    description: "A groundbreaking polyphonic analog synthesizer with a unique morphing architecture."
  },
  {
    id: "behringer-pro-800",
    name: "Behringer Pro-800",
    brand: "Behringer",
    image: "/images/behringer-pro-800.png",
    price: 39900,
    rating: 4.6,
    releaseYear: 2023,
    description: "An authentic recreation of a classic 1980s analog polysynth at an accessible price."
  },
  {
    id: "nord-wave-2",
    name: "Nord Wave 2",
    brand: "Nord",
    image: "/images/nord-wave-2.jpg",
    price: 299900,
    rating: 4.7,
    releaseYear: 2020,
    description: "A versatile performance synthesizer combining virtual analog, samples, FM, and wavetable synthesis."
  },
  {
    id: "access-virus-ti2",
    name: "Access Virus TI2",
    brand: "Access",
    image: "/images/access-virus-ti2.jpg",
    price: 379900,
    rating: 4.8,
    releaseYear: 2009,
    description: "A powerful virtual analog synthesizer with extensive modulation capabilities and a unique 'Total Integration' system."
  },
  {
    id: "waldorf-quantum",
    name: "Waldorf Quantum",
    brand: "Waldorf",
    image: "/images/waldorf-quantum.jpg",
    price: 449900,
    rating: 4.9,
    releaseYear: 2018,
    description: "A hybrid synthesizer combining wavetable, granular, and traditional synthesis methods."
  },
  {
    id: "elektron-syntakt",
    name: "Elektron Syntakt",
    brand: "Elektron",
    image: "/images/elektron-syntakt.png",
    price: 99900,
    rating: 4.7,
    releaseYear: 2022,
    description: "A powerful drum machine and synthesizer with a wide range of digital and analog sound engines."
  },
    {
    id: "casio-cz-101",
    name: "Casio CZ-101",
    brand: "Casio",
    image: "/images/casio-cz-101.jpg",
    price: 40000,
    rating: 4.5,
    releaseYear: 1984,
    description: "A compact phase distortion synthesizer that defined the sound of the mid-1980s."
  },
];

export const instrumentFilters = {
  brands: Array.from(new Set(instruments.map(i => i.brand))).sort(),
  releaseYears: Array.from(new Set(instruments.map(i => i.releaseYear))).sort((a, b) => a - b),
  priceRange: [
    Math.min(...instruments.map(i => i.price)),
    Math.max(...instruments.map(i => i.price))
  ]
};

export const getInstrumentById = (id: string): InstrumentBasic | undefined => {
  return instruments.find(instrument => instrument.id === id);
};
