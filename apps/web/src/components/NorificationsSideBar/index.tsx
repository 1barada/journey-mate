import { useSelector } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';

import { selectAllNotifications, selectNotificationRequestState } from '../../store/notification/slice';

import { NotificationsSideBarJourney } from './NotificationsSideBarJourney';
import styles from './styles.module.scss';

export default function NotificationsSideBar() {
  const notifications = useSelector(selectAllNotifications);
  const { loading, error } = useSelector(selectNotificationRequestState);

  return (
    <Box className={styles.sideBar}>
      {loading && notifications.length === 0 ? (
        <CircularProgress className={styles.loading} />
      ) : error ? (
        <Typography className={styles.error}>{error}</Typography>
      ) : notifications.length === 0 ? (
        <Typography>There is no journey notifications</Typography>
      ) : (
        notifications.map((notification) => (
          <NotificationsSideBarJourney notification={notification} key={notification.id} />
        ))
      )}
    </Box>
  );
}
