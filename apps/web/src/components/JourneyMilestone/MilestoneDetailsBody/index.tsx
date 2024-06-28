import type { StackProps } from '@mui/material/Stack';
import Stack from '@mui/material/Stack';

import './styles.scss';

export const MilestoneDetailsBody: React.FC<StackProps> = ({ children, ...props }) => {
  return (
    <Stack className="milestone-details-body" component="span" {...props}>
      {children}
    </Stack>
  );
};
