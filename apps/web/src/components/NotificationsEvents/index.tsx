import { Box, CircularProgress, Typography } from '@mui/material';

import styles from './styles.module.scss';
import { Notification } from '../../store/notification/types';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  getAllNotificationEvents,
  selectNotificationRequestState,
  selectSelectedNotification,
} from '../../store/notification/slice';
import { useEffect, useRef } from 'react';
import { NotificationsEvent } from './NotificationsEvent';

export default function NotificationsEvents() {
  const { notification: selectedNotification, events: selectedEvents } = useSelector(selectSelectedNotification);
  const { loading, error } = useSelector(selectNotificationRequestState);
  const dispatch = useDispatch<AppDispatch>();
  const prevState = useRef<Notification | null>(null);

  useEffect(() => {
    console.log(selectedNotification);
    if (selectedNotification === null) return;
    if (prevState.current && prevState.current.id === selectedNotification.id) return;
    console.log('passed');
    prevState.current = selectedNotification;

    const abort = dispatch(getAllNotificationEvents({ id: selectedNotification.id })).abort;

    return () => abort('selected another notification');
  }, [selectedNotification]);

  return (
    <Box className={styles.events}>
      {loading && selectedNotification ? (
        <CircularProgress className={styles.loading} />
      ) : error ? (
        <Typography className={styles.error}>{error}</Typography>
      ) : selectedNotification ? (
        selectedEvents.length === 0 ? (
          <Typography>There is no messages</Typography>
        ) : (
          selectedEvents.map((event) => (
            <NotificationsEvent event={event} journeyId={selectedNotification.journeyId} key={event.id} />
          ))
        )
      ) : (
        <Typography>Select journey notification on your side bar</Typography>
      )}
    </Box>
  );
}
