import { useState } from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import './styles.scss';

import type { JourneyMilestoneToggleProps } from './types';

const emptyArray = [] satisfies JourneyMilestoneToggleProps['initialValue'];

export const JourneyMilestoneToggle: React.FC<JourneyMilestoneToggleProps> = ({
  children,
  onSelect,
  initialValue = emptyArray,
}) => {
  const [milestones, setMilestones] = useState(initialValue);

  const handleChange = (_: React.MouseEvent<HTMLElement>, newMilestones: string[]) => {
    setMilestones(newMilestones);
    onSelect?.(newMilestones);
  };

  return (
    <ToggleButtonGroup className="journey-milestone-toggle" value={milestones} onChange={handleChange}>
      {children}
    </ToggleButtonGroup>
  );
};
