import { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';

import styles from './AboutPageInfo.module.scss';
import type { AboutPageInfoProps } from './types';

export const AboutPageInfo: FC<AboutPageInfoProps> = ({ info, buttons }) => {
  const location = useLocation();

  const goback = location?.state?.from ?? '/';
  return (
    <Box component="section" className={styles.section}>
      <Container>
        <Box component="div" className={styles.infoWrapper}>
          <Typography component="h1" className={styles.title}>
            {info}
          </Typography>
          <Box>
            <NavLink to={goback} className={styles.link}>
              Back
            </NavLink>
            {buttons &&
              buttons.map((button) => (
                <NavLink key={button.text} to={button.link} className={styles.link}>
                  {button.text}
                </NavLink>
              ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
