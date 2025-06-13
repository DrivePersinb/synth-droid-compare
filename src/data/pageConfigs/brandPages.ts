
// Brand page configurations - easily editable unique IDs
export const brandPageConfigs = {
  roland: {
    instruments: ['1000001', '1000002'], // Roland Jupiter-X, Roland Fantom 8
  },
  yamaha: {
    instruments: ['2000001'], // Yamaha MONTAGE 8
  },
  korg: {
    instruments: ['3000001', '3000002'], // Korg minilogue xd, Korg Kronos 2
  }
};

export const getBrandInstrumentIds = (brand: string): string[] => {
  const config = brandPageConfigs[brand.toLowerCase() as keyof typeof brandPageConfigs];
  return config ? config.instruments : [];
};
