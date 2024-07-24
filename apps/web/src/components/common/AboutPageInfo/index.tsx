import { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';

import styles from './AboutPageInfo.module.scss';
import type { AboutPageInfoProps } from './types';
import { GoBackButton } from '../GoBackButton';

export const AboutPageInfo: FC<AboutPageInfoProps> = ({ info }) => {
  return (
    <Box component="section" className={styles.section}>
      <Container>
        <Box component="div" className={styles.infoWrapper}>
          <Typography component="h1" className={styles.title}>
            {info}
          </Typography>
          <GoBackButton />
        </Box>
      </Container>
    </Box>
  );
};
