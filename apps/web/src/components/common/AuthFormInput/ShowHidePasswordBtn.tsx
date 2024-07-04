import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';

import styles from './styles.module.scss';
import { ShowHidePasswordBtnProps } from './types';

export const ShowHidePasswordBtn: React.FC<ShowHidePasswordBtnProps> = ({
  setPasswordVisibility,
  passwordVisibility,
}) => {
  return (
    <InputAdornment position="end" className={styles.showHideBtnContainer}>
      <IconButton
        onClick={() => setPasswordVisibility((prevState) => !prevState)}
        disableRipple
        className={styles.showHideBtnIconButton}
      >
        <Box className={styles.showHideBtnBox}>
          {passwordVisibility ? (
            <>
              <VisibilityOff />
              <Typography className={styles.showHideBtnText}>Hide</Typography>
            </>
          ) : (
            <>
              <Visibility />
              <Typography className={styles.showHideBtnText}>Show</Typography>
            </>
          )}
        </Box>
      </IconButton>
    </InputAdornment>
  );
};
