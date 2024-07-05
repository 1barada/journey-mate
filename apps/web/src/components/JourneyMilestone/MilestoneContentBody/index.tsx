import type { StackProps } from '@mui/material/Stack';
import Stack from '@mui/material/Stack';

import './styles.scss';

export const MilestoneContentBody: React.FC<StackProps> = ({ children, ...props }) => {
  return (
    <Stack className="milestone-content-body" component="span" {...props}>
      {children}
    </Stack>
  );
};
