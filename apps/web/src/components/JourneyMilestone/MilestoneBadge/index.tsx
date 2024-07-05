import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

import './styles.scss';

export const MilestoneBadge: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Typography component="span" className="badge" {...props}>
      {children}
    </Typography>
  );
};
