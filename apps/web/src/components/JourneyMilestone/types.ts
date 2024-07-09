export type RouteMilestone = string;

export interface MilestoneItem {
  location: string;
  date: Date | string | number;
}

export interface JourneyMilestoneListItemProps {
  milestone: MilestoneItem;
  index: number;
  itemsCount: number;
}

export interface JourneyMilestonesProps {
  milestones: Array<MilestoneItem>;
  renderItem?: (props: JourneyMilestoneListItemProps) => React.ReactNode;
}
