import { memo } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Link, Typography } from '@mui/material';

import { routes } from '../../routes';

import styles from './styles.module.scss';
import { Message } from './types';

interface MessageComponentProps {
  selfMessage?: boolean;
  message: Message;
}

const MessageComponent = ({ message, selfMessage = false }: MessageComponentProps) => {
  const avatarAlt = message.sender.name || 'avatar';

  return (
    <Box
      className={`${styles.baseMessageContainer} ${
        selfMessage ? styles.selfMessageContainer : styles.notSelfMessageContainer
      }`}
    >
      {!selfMessage && (
        <Link
          className={styles.avatar}
          href={`${routes.PROFILE}?${new URLSearchParams({ id: message.sender.id.toString() })}`}
        >
          {message.sender.avatarUrl ? (
            <img className={styles.image} src={message.sender.avatarUrl} alt={avatarAlt} />
          ) : (
            <AccountCircleIcon className={styles.emptyIcon} titleAccess={avatarAlt} fontSize="medium" />
          )}
        </Link>
      )}
      <Box className={`${styles.message} ${styles.basicMessageBubble}`}>
        <Box className={styles.header}>
          <Typography className={styles.sender}>{selfMessage ? 'You' : message.sender.name}</Typography>
          <Typography className={styles.date}>{dateToMessageTime(message.createdAt)}</Typography>
        </Box>
        <Typography className={styles.content}>{message.content}</Typography>
      </Box>
    </Box>
  );
};

function dateToMessageTime(utcDate: Date): string {
  const date = new Date(utcDate.getTime() + new Date().getTimezoneOffset());
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  const day = date.getDate();
  const month = date.getMonth() > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const year = date.getFullYear();
  return `${hours}:${minutes} ${day}-${month}-${year}`;
}

export default memo(MessageComponent);
