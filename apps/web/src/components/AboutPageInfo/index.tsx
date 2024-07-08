import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

import styles from './AboutPageInfo.module.scss';
import type { AboutPageInfoProps } from './types';

export const AboutPageInfo: FC<AboutPageInfoProps> = ({ info }) => {
  const location = useLocation();

  const goback = location?.state?.from ?? '/';

  return (
    <Box component="section" className={styles.section}>
      <Container>
        <Box component="div" className={styles.infoWrapper}>
          <Typography component="h1" className={styles.title}>
            {info}
          </Typography>
          <NavLink to={goback} className={styles.link}>
            Back
          </NavLink>
        </Box>
      </Container>
    </Box>
  );
};
