import type { TypographyProps } from '@mui/material/Typography';
import Typography from '@mui/material/Typography';

export const MilestoneName: React.FC<TypographyProps> = ({ children, ...props }) => {
  return (
    <Typography
      component="span"
      className="milestone-name"
      display="block"
      fontWeight="fontWeightBold"
      fontSize="20px"
      textAlign="left"
      {...props}
    >
      {children}
    </Typography>
  );
};
