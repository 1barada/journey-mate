import { useState } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';

import { AuthFormInput } from '../common/AuthFormInput';

import styles from './styles.module.scss';
import type { LoginProps } from './types';

const Login: React.FC<LoginProps> = ({ switchToRegisterForm }) => {
  const [buttonState, setButtonState] = useState('disabled');
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <Box className={styles.formContainer} component="form">
      <Box className={styles.formHeadersContainer} component="div">
        {/* TODO: fix noт-responsive behavior */}
        <Typography className={styles.formHeader} component="h3" width="480px">
          Log in
        </Typography>
        <Typography className={styles.formText} component="p">
          New to Design Space?{' '}
          <Link
            className={styles.formLinkText}
            component="button"
            type="button"
            underline="always"
            onClick={() => {
              switchToRegisterForm('sign up');
            }}
          >
            Sign up for free
          </Link>
        </Typography>
      </Box>
      <Box className={styles.formContainerFlexColumnGap20} component="div">
        <Box className={styles.formContainerFlexColumnGap16} component="div">
          <AuthFormInput
            label="Email address"
            labelProps={{ className: styles.formInputLabel }}
            inputProps={{ fullWidth: true, variant: 'outlined', type: 'email' }}
          />
          <AuthFormInput
            label="Password"
            labelProps={{ className: styles.formInputLabel }}
            inputProps={{
              fullWidth: true,
              variant: 'outlined',
              type: passwordVisibility ? 'text' : 'password',
            }}
            setPasswordVisibility={setPasswordVisibility}
            passwordVisibility={passwordVisibility}
          />
        </Box>
        <Box className={styles.formContainerFlexColumnGap16} component="div">
          <Typography className={styles.formText}>
            <Link
              className={styles.formLinkText}
              underline="always"
              onClick={(e) => {
                e.preventDefault();
                console.log('Temporary event');
              }}
            >
              Forget password?
            </Link>
          </Typography>
          <Button
            className={styles.formSubmitBtn}
            variant="contained"
            fullWidth
            disabled={buttonState === 'disabled' ? true : false}
            // TODO: discuss with team about shadow styles
            disableElevation
          >
            <Typography className={styles.formSubmitBtnText}>Log in</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Login };
