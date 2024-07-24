import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Typography } from '@mui/material';

import {
  getAllNotificationEvents,
  selectNotificationRequestState,
  selectSelectedNotification,
} from '../../store/notification/slice';
import { Notification } from '../../store/notification/types';
import { AppDispatch } from '../../store/store';

import { NotificationsEvent } from './NotificationsEvent';
import styles from './styles.module.scss';

export default function NotificationsEvents() {
  const { notification: selectedNotification, events: selectedEvents } = useSelector(selectSelectedNotification);
  const { loading, error } = useSelector(selectNotificationRequestState);
  const dispatch = useDispatch<AppDispatch>();
  const prevState = useRef<Notification | null>(null);

  useEffect(() => {
    if (selectedNotification === null) return;
    if (prevState.current && prevState.current.id === selectedNotification.id) return;

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
            <NotificationsEvent
              event={event}
              journeyId={selectedNotification.journeyId}
              key={event.id}
              notificationId={selectedNotification.id}
            />
          ))
        )
      ) : (
        <Typography>Select journey notification on your side bar</Typography>
      )}
    </Box>
  );
}
