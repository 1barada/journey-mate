import CheckIcon from '@mui/icons-material/Check';
import type { ToggleButtonProps } from '@mui/material/ToggleButton';
import ToggleButton from '@mui/material/ToggleButton';

import './styles.scss';

export const MilestoneSelectButton: React.FC<ToggleButtonProps> = ({
  children,
  disabled = false,
  value,
  sx,
  ...restProps
}) => {
  return (
    <ToggleButton className="milestone-select-button" value={value} disabled={disabled} {...restProps}>
      {children}
      <CheckIcon className="check-icon" fontSize="large" color="success" />
    </ToggleButton>
  );
};
