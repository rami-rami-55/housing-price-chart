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