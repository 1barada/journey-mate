import { useState } from 'react';
import { Box, Button, Container, InputLabel, TextField, Typography } from '@mui/material';

// TODO: move interface to shared types.ts file
interface RegisterProps {
  temp: string;
}
const Register: React.FC<RegisterProps> = ({ temp }) => {
  const [buttonState, setButtonState] = useState('disabled');
  return (
    // TODO: remove box heigh before PR
    <Container>
      <Box
        component="form"
        height="442px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="modalHeader" component="h3" color="modal.header">
          Sign up
        </Typography>
        <Box component="div" display="flex" flexDirection="column" width="100%" gap={5}>
          <Box component="div" display="flex" flexDirection="column" gap={4}>
            {/* FIXME: create shared input class to remove SX props from input labels */}
            <InputLabel
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              Email address
              <TextField fullWidth variant="outlined" />
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
              <TextField fullWidth variant="outlined" />
            </InputLabel>
            <InputLabel
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                position: 'relative',
              }}
            >
              Password conformation
              <TextField fullWidth variant="outlined" />
            </InputLabel>
          </Box>
          <Box component="div" display="flex" flexDirection="column" gap={4}>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              disabled={buttonState === 'disabled' ? true : false}
              // TODO: discuss with team about shadow styles
              disableElevation
              sx={{ py: 3, borderRadius: '30px' }}
            >
              <Typography variant="modalBtn" color="modal.text.default">
                Sing Up
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export { Register };
