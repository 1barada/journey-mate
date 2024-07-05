import type { RouteMilestone } from '../JourneyMilestone/types';

export interface JourneyMilestoneToggleProps extends React.PropsWithChildren {
  onSelect?: (milestones: Array<RouteMilestone>) => void;
  initialValue?: Array<RouteMilestone>;
}
