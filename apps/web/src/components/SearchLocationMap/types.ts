export interface SearchLocationMapProps {
  coordinate?: Position;
  onPlaceSelected: (coordinates: Position, address: string) => void;
  width: string;
  height: string;
}

export type Position = {
  lat: number;
  lng: number;
};
