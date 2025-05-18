
import { Brand, Instrument } from "./instrumentTypes";

// Sample data for our synthesizers from different brands available in India
export const instruments: Instrument[] = [
  // Roland synthesizers
  {
    id: "roland-juno-ds88",
    name: "JUNO-DS88",
    brand: "Roland",
    image: "/images/roland-juno-ds88.jpg",
    price: 129990,
    rating: 4.7,
    releaseYear: 2020,
    description: "A versatile 88-key synthesizer with professional sounds for stage and studio",
    specs: {
      keys: 88,
      keyType: "Ivory Feel-G Keyboard with Escapement",
      soundEngine: "SuperNATURAL",
      polyphony: 128,
      presets: 1200,
      sequencer: true,
      effects: "Reverb, Chorus, EQ, 78 Multi-Effects",
      outputs: "Main Output (L/MONO, R), Phones, Sub Output, USB",
      weight: "16 kg",
      dimensions: "1396 x 384 x 157 mm",
      powerConsumption: "9W",
      batteryOperation: "DC 9V",
      includedAccessories: "AC Adaptor, Owner's Manual"
    },
    compareCount: 284,
    popularityScore: 95
  },
  {
    id: "roland-fantom-08",
    name: "FANTOM-08",
    brand: "Roland",
    image: "/images/roland-fantom-08.jpg",
    price: 244990,
    rating: 4.8,
    releaseYear: 2022,
    description: "Professional workstation synthesizer with 88 keys and cutting-edge sound design",
    specs: {
      keys: 88,
      keyType: "PHA-50 Wood and Plastic Hybrid Keyboard",
      soundEngine: "ZEN-Core + V-Piano Technology",
      polyphony: 256,
      presets: 3500,
      sequencer: true,
      effects: "90+ types, 16 simultaneous",
      outputs: "Main Output (L/MONO, R), Sub Output 1-4, Phones, Digital (S/PDIF)",
      weight: "29 kg",
      dimensions: "1418 x 424 x 154 mm",
      touchscreen: "7-inch color touch display",
      storage: "16 GB internal, SD card slot",
      connectivity: "USB-A, USB-B, MIDI IN/OUT/THRU",
      audioInterface: "24-bit/96kHz",
      expansionSlots: 4
    },
    compareCount: 176,
    popularityScore: 92
  },
  {
    id: "roland-fa-07",
    name: "FA-07",
    brand: "Roland",
    image: "/images/roland-fa-07.jpg",
    price: 109990,
    rating: 4.6,
    releaseYear: 2019,
    description: "76-note music workstation with integrated sampler and sequencer",
    specs: {
      keys: 76,
      keyType: "Semi-weighted with velocity sensitivity",
      soundEngine: "SuperNATURAL",
      polyphony: 128,
      presets: 2000,
      sequencer: true,
      effects: "16 independent MFX engines, 6 types of reverb, master EQ",
      outputs: "Main Output (L/MONO, R), Phones, Sub Output",
      weight: "11.5 kg",
      dimensions: "1262 x 307 x 116 mm",
      samplingEngine: "16-pad sampler, WAV import",
      audioRecorder: "16-track, WAV export",
      connectivity: "USB 2.0, MIDI IN/OUT",
      sdCard: "SDHC supported (up to 32 GB)",
      displayType: "Color LCD 320 x 240 dots"
    },
    compareCount: 218,
    popularityScore: 89
  },

  // Casio synthesizers
  {
    id: "casio-ct-x5000",
    name: "CT-X5000",
    brand: "Casio",
    image: "/images/casio-ctx5000.jpg",
    price: 42990,
    rating: 4.5,
    releaseYear: 2020,
    description: "Advanced high-grade keyboard with AiX Sound Source",
    specs: {
      keys: 61,
      keyType: "Touch sensitive",
      soundEngine: "AiX Sound Source",
      polyphony: 64,
      presets: 800,
      sequencer: true,
      effects: "System Effects, Master EQ, DSP for each part",
      outputs: "Line outputs (L/MONO, R), Headphones, USB Audio",
      weight: "7.2 kg",
      dimensions: "948 x 384 x 116 mm",
      speakers: "15 cm x 2 + 3 cm x 2",
      displayType: "5.3-inch LCD (320 x 240 dots)",
      audioRecording: "17-track sequencer, SMF format",
      connectivity: "USB to Host/Device, MIDI IN/OUT",
      powerConsumption: "9W"
    },
    compareCount: 145,
    popularityScore: 79
  },
  {
    id: "casio-privia-px-s3100",
    name: "Privia PX-S3100",
    brand: "Casio",
    image: "/images/casio-px-s3100.jpg",
    price: 69990,
    rating: 4.7,
    releaseYear: 2022,
    description: "Ultra-slim digital piano with Smart Hybrid Hammer Action keyboard",
    specs: {
      keys: 88,
      keyType: "Smart Scaled Hammer Action Keyboard with simulated ebony and ivory key surfaces",
      soundEngine: "Multi-dimensional Morphing AiR Sound Source",
      polyphony: 192,
      presets: 700,
      sequencer: true,
      effects: "Reverb (17 types), Chorus (16 types), DSP (100 types)",
      outputs: "Headphones/Line Out, USB Audio",
      weight: "11.4 kg",
      dimensions: "1322 x 232 x 102 mm",
      speakers: "16 cm x 2",
      bluetoothAudio: true,
      audioRecording: "MIDI and Audio recording to USB flash drive",
      connectivity: "USB to Host, Bluetooth (Audio and MIDI)",
      batteryOperation: "AA batteries x 6 or AC adaptor"
    },
    compareCount: 201,
    popularityScore: 87
  },

  // Yamaha synthesizers
  {
    id: "yamaha-psrs975",
    name: "PSR-S975",
    brand: "Yamaha",
    image: "/images/yamaha-psrs975.jpg",
    price: 89990,
    rating: 4.8,
    releaseYear: 2021,
    description: "Premium arranger workstation keyboard with vocal harmony and DJ functions",
    specs: {
      keys: 61,
      keyType: "FSB (Full Size with initial touch response)",
      soundEngine: "AWM Stereo Sampling",
      polyphony: 128,
      presets: 1090,
      sequencer: true,
      effects: "Reverb (52 types), Chorus (106 types), DSP (295 types)",
      outputs: "Main Output (L/MONO, R), Sub Output, Headphones",
      weight: "11.7 kg",
      dimensions: "1002 x 437 x 148 mm",
      displayType: "TFT Color Wide LCD 800 x 480 dots",
      accompanimentStyles: 523,
      voiceControl: "Vocal Harmony, Synth Vocoder",
      expansion: "Expansion Voice/Style capability",
      audioRecording: "WAV (44.1kHz, 16-bit, stereo)",
      connectivity: "USB to Host/Device, MIDI IN/OUT, AUX IN"
    },
    compareCount: 188,
    popularityScore: 91
  },
  {
    id: "yamaha-modx8",
    name: "MODX8",
    brand: "Yamaha",
    image: "/images/yamaha-modx8.jpg",
    price: 159990,
    rating: 4.7,
    releaseYear: 2020,
    description: "88-key synthesizer with Motion Control Synthesis Engine and Super Knob",
    specs: {
      keys: 88,
      keyType: "GHS weighted action",
      soundEngine: "Motion Control Synthesis Engine (AWM2 + FM-X)",
      polyphony: "AWM2: 128, FM-X: 64",
      presets: 2000,
      sequencer: true,
      effects: "Reverb (12 types), Variation (76 types), Insert (76 types)",
      outputs: "Output L/MONO, R, Assignable output L, R, Headphones",
      weight: "13.8 kg",
      dimensions: "1333 x 404 x 160 mm",
      displayType: "7-inch color touch panel",
      waveForms: "5.67 GB (when converted to 16-bit linear format)",
      performanceMemory: "640 user performances + 256 preset performances",
      connectivity: "USB to Host/Device, MIDI IN/OUT/THRU",
      superKnob: "Motion Control parameter assignment",
      sceneMemory: "8 scenes per performance"
    },
    compareCount: 210,
    popularityScore: 93
  },

  // Korg synthesizers
  {
    id: "korg-pa5x",
    name: "Pa5X",
    brand: "Korg",
    image: "/images/korg-pa5x.jpg",
    price: 279990,
    rating: 4.9,
    releaseYear: 2023,
    description: "Professional arranger with enhanced sound engine and touchview display",
    specs: {
      keys: 61,
      keyType: "Semi-weighted with velocity sensitivity and aftertouch",
      soundEngine: "EDS-X (Enhanced Definition Synthesis-eXpanded)",
      polyphony: 160,
      presets: 2200,
      sequencer: true,
      effects: "148 effect types, 4 insert + 3 master effects",
      outputs: "Main Left/Right, 4 Assignable Outputs, Headphones",
      weight: "16.5 kg", 
      dimensions: "1030 x 378.3 x 132 mm",
      displayType: "10.1-inch capacitive color TouchView",
      accompanimentStyles: 600,
      userStyle: "600 locations, including User and Direct banks",
      songFormats: "MID, KAR, MP3, WAV (playback and record)",
      storage: "Internal 4GB, external USB",
      speakers: "2 x 33W amplification, bass-reflex system"
    },
    compareCount: 168,
    popularityScore: 96
  },
  {
    id: "korg-minilogue-xd",
    name: "Minilogue XD",
    brand: "Korg",
    image: "/images/korg-minilogue-xd.jpg",
    price: 64990,
    rating: 4.8,
    releaseYear: 2021,
    description: "4-voice analog synthesizer with digital multi-engine and effects",
    specs: {
      keys: 37,
      keyType: "Slim keyboard (velocity sensitive)",
      soundEngine: "Analog (2 VCO + MULTI engine per voice)",
      polyphony: 4,
      presets: 200,
      sequencer: true,
      effects: "Modulation effect, Delay/Reverb effect",
      outputs: "L/MONO, R, Headphones",
      weight: "2.8 kg",
      dimensions: "500 x 300 x 85 mm",
      synthesis: "2 VCOs, 1 MULTI engine, 1 VCF, 2 EGs, 1 LFO",
      oscilloscopeDisplay: true,
      filter: "4-pole motion-modelled analog filter",
      connectivity: "SYNC IN/OUT, CV IN, DAMPERIN, MIDI IN/OUT, USB B",
      multiEngine: "Noise, VPM, and User oscillators",
      stepSequencer: "16-step polyphonic"
    },
    compareCount: 265,
    popularityScore: 89
  },
  {
    id: "korg-wavestate",
    name: "Wavestate",
    brand: "Korg",
    image: "/images/korg-wavestate.jpg",
    price: 84990,
    rating: 4.7,
    releaseYear: 2022,
    description: "Advanced wave sequencing synthesizer with deep modulation capabilities",
    specs: {
      keys: 37,
      keyType: "Full-size keys (velocity sensitive)",
      soundEngine: "Wave Sequencing 2.0",
      polyphony: 64,
      presets: 1000,
      sequencer: true,
      effects: "13 simultaneous effect processors + EQ per layer",
      outputs: "L/MONO, R, Headphones",
      weight: "4.1 kg",
      dimensions: "565 x 338 x 93 mm",
      voices: "4 layers with Vector control",
      waveSequenceLanes: "Lane parameters include Timing, Pitch, Sample, Shape",
      modSources: "14 envelope generators, 10 LFOs, 4 key tracking generators",
      randomization: "Per-step probability, randomization",
      storage: "1000+ Performance locations, 1000+ Wave Sequences",
      connectivity: "MIDI IN/OUT, USB A, USB B"
    },
    compareCount: 179,
    popularityScore: 88
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
    weight: "15 kg"
  },
  compareCount: 0,
  popularityScore: 50
};

export const brands: Brand[] = ["Roland", "Casio", "Yamaha", "Korg"];
