import type { Milestone } from '../../store/journey/types';
import type { JourneyMilestoneListItemProps } from '../JourneyMilestone/types';
import type { SortableBaseItem } from '../SortableList/types';

export interface MilestoneSelectZoneItemProps extends JourneyMilestoneListItemProps {
  className?: string;
  onDelete?: (id: string) => void;
}

export type SortableMilestone = Milestone & SortableBaseItem;
export interface MilestoneSelectZoneProps {
  className?: string;
  placeholder?: string;
  value?: SortableMilestone[];
  onChange: (value: SortableMilestone[]) => void;
  onDelete?: (value: SortableMilestone) => void;
  onEdit?: (value: SortableMilestone) => void;
  onSwap: (value: SortableMilestone[]) => void;
}
