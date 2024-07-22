import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import './styles.scss';

export const AppLoader: React.FC = () => {
  return (
    <Box component="div" className="app-loader">
      <Typography>App is loading. Please, stand by...</Typography>
      <CircularProgress className="app-loader__progress" />
    </Box>
  );
};
