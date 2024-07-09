import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';

import './styles.scss';

export const MilestoneBody: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box className="milestone-body" {...props}>
      {children}
    </Box>
  );
};
