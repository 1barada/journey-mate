import { NotificationEvent, NotificationEventType } from '../../../store/notification/types';
import styles from './styles.module.scss';
import { Box, Typography, Button } from '@mui/material';
import { acceptJoinRequest, declineJoinRequest } from '../../../store/notification/slice';
import { AppDispatch } from 'apps/web/src/store/store';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

interface NotificationsEventProps {
  event: NotificationEvent;
  journeyId: number;
}

export function NotificationsEvent(props: NotificationsEventProps) {
  const dispatch = useDispatch<AppDispatch>();

  const messages: { [key in NotificationEventType]: JSX.Element } = {
    chatMessage: (
      <>
        New chat messages in{' '}
        <Link className={styles.link} to={`/journey?${new URLSearchParams({ id: props.journeyId.toString() })}`}>
          journey
        </Link>
      </>
    ),
    joinRequest: (
      <>
        User{' '}
        <Link className={styles.link} to={`/profile?${new URLSearchParams({ id: props.event.userId.toString() })}`}>
          {props.event.userName}
        </Link>{' '}
        wants to join journey
      </>
    ),
  };

  const Message = messages[props.event.type];

  function handleJoinRequestAccept() {
    dispatch(acceptJoinRequest());
  }

  function handleJoinRequestDecline() {
    dispatch(declineJoinRequest());
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
