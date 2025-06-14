
export interface SpecificationCategory {
  name: string;
  specs: Record<string, any>;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface BuyLink {
  store: string;
  url: string;
}

export interface ProductDetails {
  specifications?: SpecificationCategory[];
  faq?: FAQ[];
  buyLinks?: BuyLink[];
}
