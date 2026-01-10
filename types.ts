
export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface MapSource {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  maps: MapSource;
}

export interface Restaurant {
  name: string;
  bioSummary: string;
  reviewSummary: string;
  rating: string;
  highlight: string;
}
