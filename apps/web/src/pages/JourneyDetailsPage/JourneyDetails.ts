interface Category {
  id: number;
  title: string;
  value: string;
}

export interface Milestone {
  coords: Coordinates;
  dates: string[];
  title: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

export interface JourneyDetails {
  id: number;
  userId: number;
  description: string;
  title: string;
  categories: Category[];
  milestones: Milestone[];
}
