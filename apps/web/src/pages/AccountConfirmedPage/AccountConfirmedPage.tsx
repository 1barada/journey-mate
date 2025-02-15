import CheckIcon from '@mui/icons-material/Check';
import { Box, Container, Typography } from '@mui/material';

import styles from './AccountConfirmedPage.module.scss';

const AccountConfirmedPage = () => {
  return (
    <Container className={styles.container}>
      <Box className={styles.checkIconContainer}>
        <CheckIcon className={styles.icon} />
      </Box>
      <Box className={styles.contentContainer}>
        <Typography className={styles.title}>Your email successfully confirmed!</Typography>
        <Typography className={styles.info}>
          You can now login using your email and password that you provided during registration.
        </Typography>
      </Box>
    </Container>
  );
};

export default AccountConfirmedPage;
