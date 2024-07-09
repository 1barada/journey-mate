import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import './styles.scss';

import type { JourneyMilestoneToggleProps } from './types';

const emptyArray = [] satisfies JourneyMilestoneToggleProps['value'];

export const JourneyMilestoneToggle: React.FC<JourneyMilestoneToggleProps> = ({
  children,
  onSelect,
  value = emptyArray,
  disabled = false,
}) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newMilestones: string[]) => {
    onSelect?.(newMilestones);
  };

  return (
    <ToggleButtonGroup className="journey-milestone-toggle" value={value} onChange={handleChange} disabled={disabled}>
      {children}
    </ToggleButtonGroup>
  );
};
