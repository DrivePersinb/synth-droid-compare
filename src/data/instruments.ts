
import { Brand, Instrument } from "./instrumentTypes";
import { 
  fetchAllInstruments, 
  fetchInstrumentById, 
  fetchInstrumentsByBrand,
  getInstrumentImagePath as getImagePath
} from "@/services/instrumentService";

// Empty initial array for instruments, will be populated from the database
export const instruments: Instrument[] = [];

// Get instrument image path function
export function getInstrumentImagePath(id: string): string {
  return getImagePath(id);
}

// Helper to get an instrument by ID
export async function getInstrumentById(id: string): Promise<Instrument | undefined> {
  try {
    return await fetchInstrumentById(id) || undefined;
  } catch (error) {
    console.error("Error getting instrument by ID:", error);
    return undefined;
  }
}

// Get instruments by brand
export async function getInstrumentsByBrand(brand: Brand): Promise<Instrument[]> {
  try {
    return await fetchInstrumentsByBrand(brand);
  } catch (error) {
    console.error("Error getting instruments by brand:", error);
    return [];
  }
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
