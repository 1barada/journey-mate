import type { Milestone } from '../../store/journey/types';

export type RouteMilestone = string;

export type MilestoneItem = Milestone;

export interface JourneyMilestoneListItemProps {
  milestone: MilestoneItem;
  index: number;
  itemsCount: number;
}

export interface JourneyMilestonesProps {
  milestones: Array<MilestoneItem>;
  renderItem?: (props: JourneyMilestoneListItemProps) => React.ReactNode;
}
