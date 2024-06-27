import Stack from '@mui/material/Stack';

import {
  MilestoneBadge,
  MilestoneBody,
  MilestoneDatetime,
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
        <Stack direction="row" component="span" alignItems="center" gap={1.5}>
          <MilestoneBadge>{badgeContent}</MilestoneBadge>

          <Stack component="span" paddingRight={1.5}>
            <MilestoneName tooltipText={milestone.location}>{milestone.location}</MilestoneName>
            <MilestoneDatetime date={milestone.date} />
          </Stack>
        </Stack>
      </MilestoneSelectButton>

      {shouldDrawRouteLine && <RouteLine />}
    </MilestoneBody>
  );
};
