export interface JourneyCardProps {
  description: string;
  header: string;
  startDate: string; // Expecting date to be a string in UTC format
  endDate: string; // Expecting date to be a string in UTC format
  personCount: number;
  journeyType: string;
  onClickHandler: () => void;
  coordinates: { lat: number; lng: number }[];
  id: number;
}

export enum Status {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
}
