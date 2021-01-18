export interface CountryInterface {
    country_id: number;
    country: string;
    continent?: string;
    region?: string;
    iso?: string;
    iso3?: string;
    capital?: string;
    independence_year?: number;
    unsd_code?: string;
    phone_code?: string;
}
