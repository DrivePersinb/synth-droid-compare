
// Centralized registry for lazy loading instrument details
export const instrumentDetailsRegistry = {
  '1000001': () => import('./instruments/1000001').then(m => m.instrument1000001),
  '1000002': () => import('./instruments/1000002').then(m => m.instrument1000002),
  '2000001': () => import('./instruments/2000001').then(m => m.instrument2000001),
  '3000001': () => import('./instruments/3000001').then(m => m.instrument3000001),
  '3000002': () => import('./instruments/3000002').then(m => m.instrument3000002),
} as const;

export type InstrumentId = keyof typeof instrumentDetailsRegistry;

export const hasInstrumentDetails = (id: string): id is InstrumentId => {
  return id in instrumentDetailsRegistry;
};
