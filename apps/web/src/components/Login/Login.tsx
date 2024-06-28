// import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';

// TODO: move interface to shared types.ts file
interface LoginProps {
  temp: string;
}

const Login: React.FC<LoginProps> = ({ temp }) => {
  return (
    // TODO: remove box before PR
    <Container>
      <Box component="div" height="442px" width="480px" bgcolor="white" border="2px solid green">
        <Stack
          spacing={{ sm: 2, md: 3, lg: 5, xl: 5 }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          component="form"
        >
          <Typography variant="h3">Log in</Typography>
          <Typography variant="caption" color="text.secondary">
            New to Design Space? {/* TODO: remove click event */}
            <Link
              component="button"
              color="text.primary"
              underline="always"
              onClick={(e) => {
                e.preventDefault();
                console.log('Temporary event');
              }}
            >
              <Typography variant="button" color="text.primary">
                Sign up for free
              </Typography>
            </Link>
          </Typography>
          <Box component="div"></Box>
          <Box component="div"></Box>
          <Button variant="contained" fullWidth color="primary" disableElevation sx={{ py: 3, borderRadius: '30px' }}>
            <Typography variant="button">Sign up</Typography>
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export { Login };
