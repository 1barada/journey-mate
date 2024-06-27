import List from '@mui/material/List';
import Stack from '@mui/material/Stack';

import './styles.scss';

import { MilestoneBadge, MilestoneBody, MilestoneDatetime, MilestoneName, RouteLine } from '../JourneyMilestone/';
import type { JourneyMilestonesProps } from '../JourneyMilestone/types';

export const JourneyMilestoneList: React.FC<JourneyMilestonesProps> = ({ milestones, renderItem }) => {
  const itemsCount = milestones.length;

  return (
    <List className="journey-milestone-list">
      {milestones.map((milestone, index) => {
        const shouldDrawRouteLine = index < itemsCount - 1;
        const badgeContent = index + 1;

        if (renderItem) {
          return renderItem({ milestone, index, itemsCount });
        }

        return (
          <li key={index}>
            <MilestoneBody key={index}>
              <Stack direction="row" component="span" alignItems="center" gap={1.5}>
                <MilestoneBadge>{badgeContent}</MilestoneBadge>

                <Stack component="span" paddingRight={1.5}>
                  <MilestoneName tooltipText={milestone.location}>{milestone.location}</MilestoneName>
                  <MilestoneDatetime date={milestone.date} />
                </Stack>
              </Stack>

              {shouldDrawRouteLine && <RouteLine />}
            </MilestoneBody>
          </li>
        );
      })}
    </List>
  );
};
