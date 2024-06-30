import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';

import styles from './styles.module.scss';
import { ShowHideBtnProps } from './types';

export const ShowHideBtn: React.FC<ShowHideBtnProps> = ({ setPasswordVisibility, passwordVisibility }) => {
  return (
    <InputAdornment position="end" className={styles.showHideBtnContainer}>
      <IconButton
        onClick={() => setPasswordVisibility((prevState) => !prevState)}
        disableRipple
        className={styles.showHideBtnIconButton}
      >
        {passwordVisibility ? (
          <Box className={styles.showHideBtnBox}>
            <VisibilityOff />
            <Typography className={styles.showHideBtnText}>Hide</Typography>
          </Box>
        ) : (
          <Box className={styles.showHideBtnBox}>
            <Visibility />
            <Typography className={styles.showHideBtnText}>Show</Typography>
          </Box>
        )}
      </IconButton>
    </InputAdornment>
  );
};
