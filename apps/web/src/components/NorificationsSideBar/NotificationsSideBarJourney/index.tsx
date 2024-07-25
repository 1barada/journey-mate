import { useDispatch, useSelector } from 'react-redux';
import { Card, CardActionArea, Typography } from '@mui/material';

import { selectSelectedNotification, setSelectedNotification } from '../../../store/notification/slice';
import { Notification } from '../../../store/notification/types';
import { AppDispatch } from '../../../store/store';

import styles from './styles.module.scss';

interface NotificationsSideBarJourneyProps {
  notification: Pick<Notification, 'id' | 'title' | 'totalEvents'>;
}

export function NotificationsSideBarJourney(props: NotificationsSideBarJourneyProps) {
  const { notification } = props;
  const { notification: selectedNotification } = useSelector(selectSelectedNotification);
  const alreadySelected: boolean = selectedNotification !== null && selectedNotification.id === notification.id;
  const dispatch = useDispatch<AppDispatch>();

  function handleSelect() {
    if (alreadySelected) return;

    dispatch(setSelectedNotification({ id: notification.id }));
  }

  return (
    <CardActionArea onClick={handleSelect} disableRipple title={notification.title}>
      <Card className={`${styles.journeyContainer} ${alreadySelected ? styles.picked : styles.notPicked}`}>
        <Typography className={styles.title}>{notification.title}</Typography>
        <Typography className={styles.total}>
          {notification.totalEvents < 1 ? '' : notification.totalEvents > 999 ? '+999' : `${notification.totalEvents}`}
        </Typography>
      </Card>
    </CardActionArea>
  );
}
