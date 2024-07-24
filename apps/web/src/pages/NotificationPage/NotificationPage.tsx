import { Box, Container, Divider, Typography } from '@mui/material';
import { GoBackButton } from '../../components/common/GoBackButton';

import styles from './styles.module.scss';
import NotificationsSideBar from '../../components/NorificationsSideBar';
import NotificationsEvents from '../../components/NotificationsEvents';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useEffect } from 'react';
import { getAllNotifications } from '../../store/notification/slice';

const NotificationPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllNotifications());
  }, []);

  return (
    <Container className={styles.container}>
      <Box className={styles.header}>
        <Typography className={styles.title}>Notifications</Typography>
        <GoBackButton />
      </Box>
      <Divider sx={{ opacity: 1, borderColor: 'black' }} />
      <Box className={styles.body}>
        <NotificationsSideBar />
        <NotificationsEvents />
      </Box>
    </Container>
  );
};

export default NotificationPage;
