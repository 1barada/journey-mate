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
import { MilestoneDatesTuple } from '../JourneyMilestone/MilestoneDatesTuple';
import type { JourneyMilestoneListItemProps } from '../JourneyMilestone/types';

export const JourneyMilestoneToggleItem: React.FC<JourneyMilestoneListItemProps> = ({
  milestone,
  index,
  itemsCount,
}) => {
  const shouldDrawRouteLine = index < itemsCount - 1;
  const badgeContent = index + 1;
  const { title, dates } = milestone;
  const [startDate, endDate] = dates;

  return (
    <MilestoneBody key={milestone.id}>
      <MilestoneSelectButton value={title}>
        <MilestoneContentBody>
          <MilestoneBadge>{badgeContent}</MilestoneBadge>

          <MilestoneDetailsBody>
            <MilestoneName tooltipText={title}>{title}</MilestoneName>

            <MilestoneDatesTuple itemsCount={dates.length}>
              <MilestoneDatetime date={startDate} />
              <MilestoneDatetime date={endDate} />
            </MilestoneDatesTuple>
          </MilestoneDetailsBody>
        </MilestoneContentBody>
      </MilestoneSelectButton>

      {shouldDrawRouteLine && <RouteLine />}
    </MilestoneBody>
  );
};
