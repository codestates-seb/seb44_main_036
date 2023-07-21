declare namespace kakao.maps.services {
  export interface GeocoderResult {
    road_address?: {
      address_name: string;
    };
    address?: {
      address_name: string;
    };
    x: number;
    y: number;
  }
}
