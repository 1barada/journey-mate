import { useState } from 'react';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';

import styles from './styles.module.scss';
import type { RegisterProps } from './types';

const Register: React.FC<RegisterProps> = ({ temp }) => {
  const [buttonState, setButtonState] = useState('disabled');
  return (
    <Box component="form" className={styles.formContainer}>
      {/* TODO: fix noт-responsive behavior */}
      <Typography className={styles.formHeader} component="h3" width="480px">
        Sign up
      </Typography>
      <Box className={styles.formContainerFlexColumnGap20} component="div">
        <Box component="div" className={styles.formContainerFlexColumnGap16}>
          {/* FIXME: create shared input labels class to remove SX props from input labels */}
          <InputLabel className={styles.formInputLabel}>
            Email address
            <TextField fullWidth variant="outlined" type="email" />
          </InputLabel>
          <InputLabel className={styles.formInputLabel}>
            Password
            <TextField fullWidth variant="outlined" type="password" />
          </InputLabel>
          <InputLabel className={styles.formInputLabel}>
            Password conformation
            <TextField fullWidth variant="outlined" type="password" />
          </InputLabel>
        </Box>
        <Box component="div" className={styles.formContainerFlexColumnGap16}>
          <Button
            variant="contained"
            fullWidth
            className={styles.formSubmitBtn}
            disabled={buttonState === 'disabled' ? true : false}
            // TODO: discuss with team about shadow styles
            disableElevation
          >
            <Typography className={styles.formSubmitBtnText}>Sign Up</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Register };
