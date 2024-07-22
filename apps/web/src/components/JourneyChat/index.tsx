import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, CircularProgress, Input, Typography } from '@mui/material';
import { z } from 'zod';

import { trpcClient } from '../../services/trpc';
import { selectIsAuthenticated, selectUser } from '../../store/auth/slice';

import MessageComponent from './MessageComponent';
import styles from './styles.module.scss';
import { Message } from './types';

interface JourneyChatProps {
  chatId: number;
}

function JourneyChat(props: JourneyChatProps) {
  const { current: maxMessageLength } = useRef(400);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageInput, setNewMessageInput] = useState<string>('');
  const [initialized, setInitialized] = useState<boolean>(false);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    const getMessagesSubscription = trpcClient.chat.getMessages.subscribe(
      { chatId: props.chatId, take: 100, skip: 0 },
      {
        onStarted: () => {
          setMessages([]);
          setInitialized(false);
        },
        onData: (value) => {
          const receivedMessages = value.map((value) => ({
            ...value,
            updatedAt: new Date(value.updatedAt),
            createdAt: new Date(value.createdAt),
          }));

          setInitialized(true);
          setMessages((prev) => [...receivedMessages, ...prev]);
        },
        onError: (error) => console.error('Journey chat: ', error),
        onStopped: () => {
          setMessages([]);
          setInitialized(false);
        },
      }
    );

    return () => {
      getMessagesSubscription.unsubscribe();
      setMessages([]);
    };
  }, []);

  async function sendMessage() {
    const MessageInputSchema = z.string().min(1).trim().max(maxMessageLength);
    setNewMessageInput('');

    await trpcClient.chat.sendMessage.mutate({
      chatId: props.chatId,
      content: MessageInputSchema.parse(newMessageInput),
    });
  }

  function handleMessageInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setNewMessageInput(e.target.value.substring(0, maxMessageLength));
  }

  function handlePressingEnter(e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (e.key !== 'Enter') return;

    sendMessage();
  }

  return (
    <Box className={styles.chat}>
      <Box className={styles.list}>
        <Box className={styles.listContainer}>
          {initialized ? (
            messages.map((message) => (
              <MessageComponent message={message} key={message.id} selfMessage={user?.id === message.sender.id} />
            ))
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
      <Box className={styles.inputContainer}>
        {isAuthenticated ? (
          <>
            <Input
              name="message"
              className={`${styles.input} ${styles.tooBig}`}
              onChange={handleMessageInput}
              value={newMessageInput}
              placeholder={user?.name ? 'Type your message here' : 'You need to create yourself a name on profile page'}
              onKeyUp={handlePressingEnter}
              disableUnderline
              multiline={true}
              minRows={1}
              maxRows={8}
              disabled={!user?.name}
            />
            <Button
              className={styles.button}
              onClick={sendMessage}
              disabled={
                !initialized || newMessageInput.length === 0 || newMessageInput.length > maxMessageLength || !user?.name
              }
              title={
                newMessageInput.length > maxMessageLength
                  ? 'Message length must be less or equal 400 characters'
                  : 'Send message'
              }
            >
              send
            </Button>
          </>
        ) : (
          <Typography className={styles.input}>To send a message you need to log in</Typography>
        )}
      </Box>
    </Box>
  );
}

export default memo(JourneyChat);
