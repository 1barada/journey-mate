import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, InputAdornment, Link, Typography } from '@mui/material';

import type { LoginProps } from '../../types/types';
import { AuthFormInput } from '../common/AuthFormInput';

const Login: React.FC<LoginProps> = ({ temp }) => {
  const [buttonState, setButtonState] = useState('disabled');
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      maxWidth="480px"
      overflow="hidden"
    >
      <Box component="div" display="flex" flexDirection="column" alignItems="center" gap={2}>
        {/* TODO: fix not responsive behavior */}
        <Typography
          variant="modalHeader"
          component="h3"
          color="modal.header"
          width="480px"
          minWidth="200px"
          textAlign="center"
        >
          Log in
        </Typography>
        <Typography variant="modalText" component="p" color="modal.text.primary">
          New to Design Space?
          <Link
            component="button"
            type="button"
            color="modal.accent"
            underline="always"
            onClick={(e) => {
              e.preventDefault();
              console.log('Temporary event');
            }}
            variant="modalText"
          >
            Sign up for free
          </Link>
        </Typography>
      </Box>
      <Box component="div" display="flex" flexDirection="column" width="100%" gap={5}>
        <Box component="div" display="flex" flexDirection="column" gap={4}>
          {/* FIXME: create shared input labels class to remove SX props from input labels */}
          <AuthFormInput
            label="Email address"
            labelSx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
            inputProps={{ fullWidth: true, variant: 'outlined' }}
          />
          <AuthFormInput
            label="Password"
            labelSx={{ display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' }}
            inputProps={{
              fullWidth: true,
              variant: 'outlined',
              type: passwordVisibility ? 'text' : 'password',
            }}
            setPasswordVisibility={setPasswordVisibility}
            passwordVisibility={passwordVisibility}
          />
        </Box>
        <Box component="div" display="flex" flexDirection="column" gap={4}>
          <Link
            underline="always"
            color="modal.accent"
            width="fit-content"
            onClick={(e) => {
              e.preventDefault();
              console.log('Temporary event');
            }}
          >
            <Typography variant="modalText">Forget password?</Typography>
          </Link>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            disabled={buttonState === 'disabled' ? true : false}
            // TODO: discuss with team about shadow styles
            disableElevation
            sx={{ py: 3, borderRadius: '30px' }}
          >
            <Typography variant="modalBtn" color="background.default">
              Log in
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Login };
