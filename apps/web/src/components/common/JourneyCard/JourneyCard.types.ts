export interface JourneyCardProps {
  description: string;
  imageUrl: string;
  header: string;
  date: string; // Expecting date to be a string in UTC format
  personCount: number;
  journeyType: string;
  onClickHandler: () => void;
}
