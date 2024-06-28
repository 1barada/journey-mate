import List from '@mui/material/List';

import './styles.scss';

import {
  MilestoneBadge,
  MilestoneBody,
  MilestoneContentBody,
  MilestoneDatetime,
  MilestoneDetailsBody,
  MilestoneName,
  RouteLine,
} from '../JourneyMilestone/';
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
              <MilestoneContentBody component="span">
                <MilestoneBadge>{badgeContent}</MilestoneBadge>

                <MilestoneDetailsBody>
                  <MilestoneName tooltipText={milestone.location}>{milestone.location}</MilestoneName>
                  <MilestoneDatetime date={milestone.date} />
                </MilestoneDetailsBody>
              </MilestoneContentBody>

              {shouldDrawRouteLine && <RouteLine />}
            </MilestoneBody>
          </li>
        );
      })}
    </List>
  );
};
