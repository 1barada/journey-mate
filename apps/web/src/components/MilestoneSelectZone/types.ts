import { JourneyMilestoneListItemProps } from '../JourneyMilestone/types';

export interface MilestoneSelectZoneItemProps extends JourneyMilestoneListItemProps {
  className?: string;
  onDelete?: (id: string) => void;
}

export interface MilestoneSelectZoneProps {
  className?: string;
  placeholder?: string;
  value?: any[];
  onChange: (value: any[]) => void;
  onDelete?: (value: any) => void;
  onEdit?: (value: any) => void;
  onMove?: (value: any) => void;
}
