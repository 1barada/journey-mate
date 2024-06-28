import {
  MilestoneBadge,
  MilestoneBody,
  MilestoneContentBody,
  MilestoneDatetime,
  MilestoneDetailsBody,
  MilestoneName,
  MilestoneSelectButton,
  RouteLine,
} from '../JourneyMilestone/';
import type { JourneyMilestoneListItemProps } from '../JourneyMilestone/types';

export const JourneyMilestoneToggleItem: React.FC<JourneyMilestoneListItemProps> = ({
  milestone,
  index,
  itemsCount,
}) => {
  const shouldDrawRouteLine = index < itemsCount - 1;
  const badgeContent = index + 1;

  return (
    <MilestoneBody key={index}>
      <MilestoneSelectButton value={milestone.location}>
        <MilestoneContentBody>
          <MilestoneBadge>{badgeContent}</MilestoneBadge>

          <MilestoneDetailsBody>
            <MilestoneName tooltipText={milestone.location}>{milestone.location}</MilestoneName>
            <MilestoneDatetime date={milestone.date} />
          </MilestoneDetailsBody>
        </MilestoneContentBody>
      </MilestoneSelectButton>

      {shouldDrawRouteLine && <RouteLine />}
    </MilestoneBody>
  );
};
