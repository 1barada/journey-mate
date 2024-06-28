import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';

// TODO: move interface to shared types.ts file before PR
interface LoginProps {
  temp: string;
}

const Login: React.FC<LoginProps> = ({ temp }) => {
  const [buttonState, setButtonState] = useState('disabled');
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  return (
    // TODO: remove box width before PR
    <Container>
      <Box component="form" height="442px" display="flex" flexDirection="column" justifyContent="space-between">
        <Box component="div" display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Typography variant="modalHeader" component="h3" color="modal.header">
            Log in
          </Typography>
          <Typography variant="modalText" component="p" color="modal.text.primary">
            New to Design Space? {/* TODO: remove click event */}
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
            <InputLabel
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              Email address
              <TextField fullWidth variant="outlined"></TextField>
            </InputLabel>
            <InputLabel
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                position: 'relative',
              }}
            >
              Password
              <TextField
                fullWidth
                variant="outlined"
                type={passwordVisibility ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setPasswordVisibility((prevState) => !prevState)}
                        onMouseDown={(e) => e.preventDefault()}
                        disableRipple
                        sx={{
                          position: 'absolute',
                          top: -35,
                          right: 0,
                          '&:hover': { backgroundColor: 'transparent' },
                        }}
                      >
                        {passwordVisibility ? (
                          <Box display="flex" gap={2} color="modal.accentTransparentHover">
                            <VisibilityOff />
                            <Typography variant="modalText">Hide</Typography>
                          </Box>
                        ) : (
                          <Box display="flex" gap={2} color="modal.accentTransparentHover">
                            <Visibility />
                            <Typography variant="modalText">Show</Typography>
                          </Box>
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </InputLabel>
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
    </Container>
  );
};

export { Login };
