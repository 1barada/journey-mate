import { FC } from 'react';
import { Avatar, Box, Container, Typography } from '@mui/material';

import defaultImg from '../../../public/img/defaultImg.webp';
import { CardDescription } from '../CardDescription';

import { UserProps } from './types';
import styles from './User.module.scss';

const imagePath = 'https://res.cloudinary.com/dyttdvqkh/image/upload/v1721908459/';

export const User: FC<UserProps> = ({ age, avatarUrl, description, email, name, sex }) => {
  return (
    <Box component="section">
      <Container>
        <Box component="div" className={styles.profileWrapper}>
          <Box component="div" className={styles.infoWrapper}>
            <Avatar src={avatarUrl ? imagePath + avatarUrl : defaultImg} className={styles.avatar} />
            <Box component="div">
              <Typography component="h1" variant="h1" className={styles.title}>
                Name: <span>{name ? name : 'Anonimus'}</span>
              </Typography>

              <Typography component="p" className={styles.text}>
                Sex: <span>{sex ? sex : 'not specified'}</span>
              </Typography>

              <Typography component="p" className={styles.text}>
                Age: <span>{age ? age : 'Not specified'}</span>
              </Typography>

              <Typography component="p" className={styles.text}>
                Email: <span>{email}</span>
              </Typography>
            </Box>
          </Box>
        </Box>

        <CardDescription description={description || ''} title={`About ${name}`} />
      </Container>
    </Box>
  );
};
