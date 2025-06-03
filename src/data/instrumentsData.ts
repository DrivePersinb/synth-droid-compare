
export interface InstrumentBasic {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  releaseYear: number;
  popularityScore: number;
}

export const instrumentsData: InstrumentBasic[] = [
  {
    id: "roland-jupiter-x",
    name: "Jupiter-X",
    brand: "Roland",
    price: 149999,
    image: "/images/roland-jupiter-x.jpg",
    description: "Advanced synthesizer with multiple sound engines and cutting-edge technology.",
    rating: 4.8,
    releaseYear: 2019,
    popularityScore: 95
  },
  {
    id: "yamaha-montage-8",
    name: "MONTAGE 8",
    brand: "Yamaha",
    price: 399999,
    image: "/images/yamaha-montage-8.jpg",
    description: "Professional 88-key flagship synthesizer with Motion Control.",
    rating: 4.9,
    releaseYear: 2016,
    popularityScore: 98
  },
  {
    id: "korg-minilogue-xd",
    name: "Minilogue XD",
    brand: "Korg",
    price: 59999,
    image: "/images/korg-minilogue-xd.jpg",
    description: "4-voice analog synthesizer with digital multi-engine.",
    rating: 4.7,
    releaseYear: 2019,
    popularityScore: 88
  },
  {
    id: "moog-subsequent-37",
    name: "Subsequent 37",
    brand: "Moog",
    price: 159999,
    image: "/images/moog-subsequent-37.jpg",
    description: "Analog synthesizer with classic Moog sound and modern features.",
    rating: 4.8,
    releaseYear: 2017,
    popularityScore: 92
  },
  {
    id: "novation-summit",
    name: "Summit",
    brand: "Novation",
    price: 249999,
    image: "/images/novation-summit.jpg",
    description: "16-voice bi-timbral analog synthesizer with digital effects.",
    rating: 4.6,
    releaseYear: 2018,
    popularityScore: 85
  },
  {
    id: "roland-sh-101",
    name: "SH-101",
    brand: "Roland",
    price: 89999,
    image: "/images/roland-sh-101.jpg",
    description: "Classic monophonic analog synthesizer reimagined.",
    rating: 4.5,
    releaseYear: 2019,
    popularityScore: 82
  },
  {
    id: "sequential-prophet-5",
    name: "Prophet-5",
    brand: "Sequential",
    price: 349999,
    image: "/images/sequential-prophet-5.jpg",
    description: "Legendary 5-voice analog synthesizer returns.",
    rating: 4.9,
    releaseYear: 2020,
    popularityScore: 96
  },
  {
    id: "arturia-matrixbrute",
    name: "MatrixBrute",
    brand: "Arturia",
    price: 199999,
    image: "/images/arturia-matrixbrute.jpg",
    description: "Massive analog synthesizer with modular matrix.",
    rating: 4.7,
    releaseYear: 2016,
    popularityScore: 89
  },
  {
    id: "roland-jd-xi",
    name: "JD-Xi",
    brand: "Roland",
    price: 49999,
    image: "/images/roland-jd-xi.jpg",
    description: "Analog/digital crossover synthesizer.",
    rating: 4.3,
    releaseYear: 2015,
    popularityScore: 78
  },
  {
    id: "korg-prologue-16",
    name: "Prologue 16",
    brand: "Korg",
    price: 179999,
    image: "/images/korg-prologue-16.jpg",
    description: "16-voice analog synthesizer with digital oscillator.",
    rating: 4.6,
    releaseYear: 2017,
    popularityScore: 86
  },
  {
    id: "yamaha-reface-cp",
    name: "Reface CP",
    brand: "Yamaha",
    price: 34999,
    image: "/images/yamaha-reface-cp.jpg",
    description: "Vintage electric piano collection in portable format.",
    rating: 4.4,
    releaseYear: 2015,
    popularityScore: 75
  },
  {
    id: "moog-model-d",
    name: "Model D",
    brand: "Moog",
    price: 369999,
    image: "/images/moog-model-d.jpg",
    description: "Legendary monophonic analog synthesizer reissue.",
    rating: 4.8,
    releaseYear: 2016,
    popularityScore: 94
  },
  {
    id: "behringer-deepmind-12",
    name: "DeepMind 12",
    brand: "Behringer",
    price: 69999,
    image: "/images/behringer-deepmind-12.jpg",
    description: "12-voice analog synthesizer with digital effects.",
    rating: 4.2,
    releaseYear: 2017,
    popularityScore: 72
  },
  {
    id: "dave-smith-ob-6",
    name: "OB-6",
    brand: "Sequential",
    price: 279999,
    image: "/images/dave-smith-ob-6.jpg",
    description: "6-voice analog synthesizer collaboration with Tom Oberheim.",
    rating: 4.7,
    releaseYear: 2016,
    popularityScore: 90
  },
  {
    id: "korg-ms-20-mini",
    name: "MS-20 Mini",
    brand: "Korg",
    price: 59999,
    image: "/images/korg-ms-20-mini.jpg",
    description: "Compact version of the legendary MS-20 synthesizer.",
    rating: 4.5,
    releaseYear: 2013,
    popularityScore: 83
  },
  {
    id: "roland-system-8",
    name: "System-8",
    brand: "Roland",
    price: 149999,
    image: "/images/roland-system-8.jpg",
    description: "8-voice digital synthesizer with ACB technology.",
    rating: 4.4,
    releaseYear: 2016,
    popularityScore: 79
  },
  {
    id: "nord-lead-a1",
    name: "Lead A1",
    brand: "Nord",
    price: 89999,
    image: "/images/nord-lead-a1.jpg",
    description: "4-part multitimbral analog modeling synthesizer.",
    rating: 4.6,
    releaseYear: 2014,
    popularityScore: 84
  },
  {
    id: "access-virus-ti2",
    name: "Virus TI2",
    brand: "Access",
    price: 199999,
    image: "/images/access-virus-ti2.jpg",
    description: "Digital synthesizer with Total Integration technology.",
    rating: 4.7,
    releaseYear: 2009,
    popularityScore: 87
  },
  {
    id: "waldorf-blofeld",
    name: "Blofeld",
    brand: "Waldorf",
    price: 49999,
    image: "/images/waldorf-blofeld.jpg",
    description: "Compact wavetable synthesizer with classic Waldorf sound.",
    rating: 4.3,
    releaseYear: 2007,
    popularityScore: 76
  },
  {
    id: "elektron-analog-four",
    name: "Analog Four",
    brand: "Elektron",
    price: 134999,
    image: "/images/elektron-analog-four.jpg",
    description: "4-voice analog synthesizer with built-in sequencer.",
    rating: 4.5,
    releaseYear: 2013,
    popularityScore: 81
  }
];

export const getBrands = (): string[] => {
  const brands = [...new Set(instrumentsData.map(instrument => instrument.brand))];
  return brands.sort();
};

export const getInstrumentById = (id: string): InstrumentBasic | undefined => {
  return instrumentsData.find(instrument => instrument.id === id);
};
