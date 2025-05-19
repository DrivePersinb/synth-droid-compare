
import { Instrument, Brand } from "./instrumentTypes";

// Template for adding new musical instruments to the database
export const createNewInstrument = (
  id: string,
  name: string,
  brand: Brand,
  price: number,
  description: string,
  specs: Record<string, any>
): Instrument => {
  return {
    id,
    name,
    brand,
    image: `/images/${id}.jpg`, // Update this path to your image location
    price,
    rating: 4.5, // Default rating, update as needed
    releaseYear: new Date().getFullYear(), // Default to current year, update as needed
    description,
    specs: {
      // Default specs, override with provided specs
      keys: 61,
      keyType: "Semi-weighted",
      soundEngine: "Sample-based",
      polyphony: 128,
      presets: 500,
      sequencer: true,
      effects: 30,
      outputs: 2,
      weight: "15 lbs",
      ...specs
    },
    compareCount: 0,
    popularityScore: 50
  };
};

// Example usage:
/*
const myNewSynth = createNewInstrument(
  "korg-opsix",
  "opsix",
  "Korg",
  799,
  "Advanced FM synthesizer with extensive modulation capabilities",
  {
    keys: 37,
    keyType: "Full-size",
    soundEngine: "Altered FM",
    polyphony: 32,
    presets: 350,
    sequencer: true,
    effects: 30,
    outputs: 4,
    weight: "7.5 lbs"
  }
);

// After creating the instrument, you would add it to the instruments array in instruments.ts:
// instruments.push(myNewSynth);
*/
