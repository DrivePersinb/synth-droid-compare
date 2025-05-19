
import { Brand, Instrument } from "./instrumentTypes";

// Sample data for our synthesizers from different brands
export const instruments: Instrument[] = [
  // Roland synthesizers
  {
    id: "roland-fantom-8",
    name: "Fantom 8",
    brand: "Roland",
    image: "/images/roland-fantom-8.jpg",
    price: 3999,
    rating: 4.8,
    releaseYear: 2019,
    description: "Roland's flagship workstation synthesizer with 88 keys",
    specs: {
      keys: 88,
      keyType: "Semi-weighted",
      soundEngine: "ZEN-Core",
      polyphony: 256,
      presets: 3500,
      sequencer: true,
      effects: 90,
      outputs: 6,
      weight: "29 lbs"
    },
    compareCount: 284,
    popularityScore: 95
  },
  {
    id: "roland-jupiter-x",
    name: "Jupiter-X",
    brand: "Roland",
    image: "/images/roland-jupiter-x.jpg",
    price: 2499,
    rating: 4.7,
    releaseYear: 2019,
    description: "Modern version of the legendary Jupiter-8 synthesizer",
    specs: {
      keys: 61,
      keyType: "Semi-weighted",
      soundEngine: "ZEN-Core",
      polyphony: 256,
      presets: 4000,
      sequencer: true,
      effects: 90,
      outputs: 4,
      weight: "21 lbs"
    },
    compareCount: 312,
    popularityScore: 93
  },
  {
    id: "roland-jd-xi",
    name: "JD-Xi",
    brand: "Roland",
    image: "/images/roland-jd-xi.jpg",
    price: 499,
    rating: 4.5,
    releaseYear: 2015,
    description: "Compact hybrid synth with analog and digital sound engines",
    specs: {
      keys: 37,
      keyType: "Mini keys",
      soundEngine: "Analog/Digital Hybrid",
      polyphony: 128,
      presets: 400,
      sequencer: true,
      effects: 30,
      outputs: 2,
      weight: "5.3 lbs"
    },
    compareCount: 421,
    popularityScore: 88
  },

  // Casio synthesizers
  {
    id: "casio-ct-x5000",
    name: "CT-X5000",
    brand: "Casio",
    image: "/images/casio-ctx5000.jpg",
    price: 799,
    rating: 4.3,
    releaseYear: 2018,
    description: "Advanced keyboard with AiX sound source",
    specs: {
      keys: 61,
      keyType: "Touch sensitive",
      soundEngine: "AiX",
      polyphony: 64,
      presets: 800,
      sequencer: true,
      effects: 100,
      outputs: 4,
      weight: "15.7 lbs"
    },
    compareCount: 198,
    popularityScore: 79
  },
  {
    id: "casio-px-s3000",
    name: "Privia PX-S3000",
    brand: "Casio",
    image: "/images/casio-px-s3000.jpg",
    price: 849,
    rating: 4.6,
    releaseYear: 2019,
    description: "Ultra-slim digital piano with synthesizer capabilities",
    specs: {
      keys: 88,
      keyType: "Smart Scaled Hammer Action",
      soundEngine: "Multi-dimensional Morphing AiR",
      polyphony: 192,
      presets: 700,
      sequencer: true,
      effects: 100,
      outputs: 2,
      weight: "24.7 lbs"
    },
    compareCount: 245,
    popularityScore: 82
  },

  // Yamaha synthesizers
  {
    id: "yamaha-montage-8",
    name: "Montage 8",
    brand: "Yamaha",
    image: "/images/yamaha-montage-8.jpg",
    price: 3999,
    rating: 4.8,
    releaseYear: 2016,
    description: "Flagship synthesizer with Motion Control Synthesis Engine",
    specs: {
      keys: 88,
      keyType: "Balanced Hammer Action",
      soundEngine: "Motion Control Synthesis",
      polyphony: 128,
      presets: 5000,
      sequencer: true,
      effects: 76,
      outputs: 8,
      weight: "62.8 lbs"
    },
    compareCount: 301,
    popularityScore: 94
  },
  {
    id: "yamaha-reface-dx",
    name: "Reface DX",
    brand: "Yamaha",
    image: "/images/yamaha-reface-dx.jpg",
    price: 299,
    rating: 4.4,
    releaseYear: 2015,
    description: "Portable FM synthesizer inspired by the DX7",
    specs: {
      keys: 37,
      keyType: "Mini keys",
      soundEngine: "FM",
      polyphony: 8,
      presets: 32,
      sequencer: false,
      effects: 5,
      outputs: 2,
      weight: "3.7 lbs"
    },
    compareCount: 384,
    popularityScore: 85
  },

  // Korg synthesizers
  {
    id: "korg-kronos-2",
    name: "Kronos 2",
    brand: "Korg",
    image: "/images/korg-kronos-2.jpg",
    price: 3699,
    rating: 4.9,
    releaseYear: 2015,
    description: "Workstation with 9 different sound engines",
    specs: {
      keys: 88,
      keyType: "RH3 Hammer Action",
      soundEngine: "9 sound engines",
      polyphony: 200,
      presets: 4000,
      sequencer: true,
      effects: 197,
      outputs: 8,
      weight: "51 lbs"
    },
    compareCount: 275,
    popularityScore: 96
  },
  {
    id: "korg-minilogue-xd",
    name: "Minilogue XD",
    brand: "Korg",
    image: "/images/korg-minilogue-xd.jpg",
    price: 649,
    rating: 4.7,
    releaseYear: 2019,
    description: "4-voice analog synthesizer with digital multi-engine",
    specs: {
      keys: 37,
      keyType: "Slim keys",
      soundEngine: "Analog/Digital Hybrid",
      polyphony: 4,
      presets: 200,
      sequencer: true,
      effects: 3,
      outputs: 3,
      weight: "7.3 lbs"
    },
    compareCount: 407,
    popularityScore: 92
  },
  {
    id: "korg-wavestate",
    name: "Wavestate",
    brand: "Korg",
    image: "/images/korg-wavestate.jpg",
    price: 799,
    rating: 4.6,
    releaseYear: 2020,
    description: "Advanced wave sequencing synthesizer",
    specs: {
      keys: 37,
      keyType: "Full-size keys",
      soundEngine: "Wave Sequencing 2.0",
      polyphony: 64,
      presets: 1000,
      sequencer: true,
      effects: 13,
      outputs: 2,
      weight: "11.2 lbs"
    },
    compareCount: 221,
    popularityScore: 89
  }
];

// Sample images function - in production, you'd have real images
export function getInstrumentImagePath(id: string): string {
  return `/placeholder.svg`;
}

// Helper to get an instrument by ID
export function getInstrumentById(id: string): Instrument | undefined {
  return instruments.find(instrument => instrument.id === id);
}

// Get instruments by brand
export function getInstrumentsByBrand(brand: Brand): Instrument[] {
  return instruments.filter(instrument => instrument.brand === brand);
}

// Template for adding new instruments
export const instrumentTemplate: Partial<Instrument> = {
  brand: "Roland", // Change to desired brand
  image: "/placeholder.svg",
  rating: 4.5,
  releaseYear: 2023,
  specs: {
    keys: 61,
    keyType: "Semi-weighted",
    soundEngine: "Sample-based",
    polyphony: 128,
    presets: 500,
    sequencer: true,
    effects: 30,
    outputs: 2,
    weight: "15 lbs"
  },
  compareCount: 0,
  popularityScore: 50
};

export const brands: Brand[] = ["Roland", "Casio", "Yamaha", "Korg"];
