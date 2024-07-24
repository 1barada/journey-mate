import { FC } from 'react';
import { Box, Container, Typography } from '@mui/material';

import styles from './AboutPageInfo.module.scss';
import type { AboutPageInfoProps } from './types';
import { GoBackButton } from '../GoBackButton';
import { NavLink } from 'react-router-dom';

export const AboutPageInfo: FC<AboutPageInfoProps> = ({ info, buttons }) => {
  return (
    <Box component="section" className={styles.section}>
      <Container>
        <Box component="div" className={styles.infoWrapper}>
          <Typography component="h1" className={styles.title}>
            {info}
          </Typography>
          <Box>
            <GoBackButton />
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
