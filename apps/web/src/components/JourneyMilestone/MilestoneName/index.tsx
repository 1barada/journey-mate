import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import type { MilestoneNameProps } from './types';

export const MilestoneName: React.FC<MilestoneNameProps> = ({ children, tooltipText, ...props }) => {
  return (
    <Tooltip title={tooltipText}>
      <Typography
        component="span"
        className="milestone-name line-clamp"
        fontWeight="fontWeightBold"
        fontSize="20px"
        textAlign="left"
        {...props}
      >
        {children}
      </Typography>
    </Tooltip>
  );
};
