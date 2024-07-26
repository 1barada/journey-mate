interface Category {
  id: number;
  title: string;
  value: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

export interface Milestone {
  coords: Coordinates;
  dates: string[];
  title: string;
}

export interface JourneyDetails {
  id: number;
  userId: number;
  description: string;
  title: string;
  categories: Category[];
  milestones: Milestone[];
}
