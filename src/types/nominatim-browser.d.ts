declare module 'nominatim-browser' {
  interface NominatimAddress {
    city?: string;
    state?: string;
    country?: string;
    [key: string]: string | undefined;
  }

  interface NominatimResult {
    lat: string;
    lon: string;
    display_name?: string;
    address?: NominatimAddress;
  }

  interface SearchOptions {
    q: string;
    limit?: number;
    [key: string]: string | number | boolean | undefined;
  }

  interface ReverseOptions {
    lat: number;
    lon: number;
    addressdetails?: boolean;
    [key: string]: string | number | boolean | undefined;
  }

  const Nominatim: {
    search: (options: SearchOptions) => Promise<NominatimResult[]>;
    reverse: (options: ReverseOptions) => Promise<NominatimResult>;
  };

  export default Nominatim;
}
