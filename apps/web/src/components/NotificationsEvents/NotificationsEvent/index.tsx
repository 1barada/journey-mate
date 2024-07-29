import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import { AppDispatch } from '../../../../src/store/store';
import { acceptJoinRequest, declineJoinRequest } from '../../../store/notification/slice';
import { NotificationEvent, NotificationEventType } from '../../../store/notification/types';

import styles from './styles.module.scss';
import { useMemo } from 'react';

interface NotificationsEventProps {
  event: NotificationEvent;
  journeyId: number;
  notificationId: number;
}

export function NotificationsEvent(props: NotificationsEventProps) {
  const dispatch = useDispatch<AppDispatch>();

  const Message = useMemo(() => {
    switch (props.event.type) {
      case NotificationEventType.ChatMessage:
        return (
          <>
            New chat messages in{' '}
            <Link className={styles.link} to={`/journeys/${props.journeyId}`}>
              journey
            </Link>
          </>
        );
      case NotificationEventType.JoinRequest:
        if (!props.event.userId) throw new Error('NotificationsEvent: User id is null');
        return (
          <>
            User{' '}
            <Link className={styles.link} to={`/profile/${props.event.userId}`}>
              {props.event.userName}
            </Link>{' '}
            wants to join journey
          </>
        );
      default:
        throw new Error(`Unsuported NotificationEventType. Type: ${props.event.type}`);
    }
  }, [props.event]);

  function handleJoinRequestAccept() {
    dispatch(acceptJoinRequest({ notificationId: props.notificationId, eventId: props.event.id }));
  }

  function handleJoinRequestDecline() {
    dispatch(declineJoinRequest({ notificationId: props.notificationId, eventId: props.event.id }));
  }

  return (
    <Box className={styles.event}>
      <Box className={styles.info}>
        <Typography className={styles.createdAt}>{dateToDateString(new Date(props.event.createdAt))}</Typography>
        <Typography className={styles.message}>{Message}</Typography>
      </Box>
      {props.event.type === NotificationEventType.JoinRequest && (
        <Box className={styles.buttons}>
          <Button className={`${styles.base} ${styles.accept}`} onClick={handleJoinRequestAccept}>
            Accept
          </Button>
          <Button className={`${styles.base} ${styles.decline}`} onClick={handleJoinRequestDecline}>
            Decline
          </Button>
        </Box>
      )}
    </Box>
  );
}

function dateToDateString(date: Date): string {
  const day = date.getDate();
  const month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
