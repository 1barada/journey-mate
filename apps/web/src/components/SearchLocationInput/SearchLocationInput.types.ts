export interface SearchLocationInputProps {
  onPlaceSelected: (coordinates: { lat: number; lng: number }, inputValue: string) => void;
}
