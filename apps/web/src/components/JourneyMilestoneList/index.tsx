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
import { MilestoneDatesTuple } from '../JourneyMilestone/MilestoneDatesTuple';
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

        const { title, dates } = milestone;
        const [startDate, endDate] = dates;

        return (
          <li key={milestone.id}>
            <MilestoneBody>
              <MilestoneContentBody component="span">
                <MilestoneBadge>{badgeContent}</MilestoneBadge>

                <MilestoneDetailsBody>
                  <MilestoneName tooltipText={title}>{title}</MilestoneName>

                  <MilestoneDatesTuple itemsCount={dates.length}>
                    <MilestoneDatetime date={startDate} />
                    <MilestoneDatetime date={endDate} />
                  </MilestoneDatesTuple>
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
