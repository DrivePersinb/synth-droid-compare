
// Special page configurations - easily editable unique IDs
export const specialPageConfigs = {
  latest: {
    instruments: ['1000001', '1000002', '3000001'], // Most recent instruments
  },
  featured: {
    instruments: ['2000001', '3000002', '1000001'], // Featured instruments
  },
  popular: {
    instruments: ['2000001', '1000001', '3000002'], // Popular instruments
  }
};

export const getSpecialPageInstrumentIds = (pageType: string): string[] => {
  const config = specialPageConfigs[pageType.toLowerCase() as keyof typeof specialPageConfigs];
  return config ? config.instruments : [];
};
