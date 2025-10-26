export type ComparisonArea = {
  id: string;
  name: string;
  color: string;
  selected: boolean;
  propertyType?: string;
  propertyStatus?: string;
  structure?: string;
  layouts?: string[];
  startYear?: string;
  endYear?: string;
  durationInYears?: number;
};

export type AreaData = {
  priceData: number[];
  unitPriceData: number[];
};

export type ChartType = 'price' | 'unit_price';

export interface RealEstateQuery {
  prefecture: string;
  city?: string;
  station?: string;
  property_type?: string;
  layout?: string;
}

export interface PriceData {
  year: number;
  average_price: number;
  transaction_count: number;
}
