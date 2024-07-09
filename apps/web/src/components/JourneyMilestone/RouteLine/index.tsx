import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';

import './styles.scss';

export const RouteLine: React.FC<Omit<BoxProps, 'children'>> = (props) => {
  return <Box className="line" {...props} />;
};
