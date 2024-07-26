import React from 'react';
import { JourneyOrganizerInfoProps } from './JourneyOrganizerInfo.types';
import Avatar from '@mui/material/Avatar';
import defaultImg from '../../../public/img/defaultImg.webp';
import styles from './JourneyOrganizerInfo.module.scss';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useLocation } from 'react-router-dom';
const imagePath = 'https://res.cloudinary.com/dyttdvqkh/image/upload/v1721908459/';

export const JourneyOrganizerInfo: React.FC<JourneyOrganizerInfoProps> = ({ organaizer }) => {
  const location = useLocation();

  return (
    <Box className={styles.OrganizerInfoWrapper}>
      <Link state={{ from: location }} to={`/profile/${organaizer.id}`}>
        <Avatar
          src={organaizer.avatarUrl ? imagePath + organaizer.avatarUrl : defaultImg}
          className={styles.organaizerAvatar}
        />
      </Link>

      <Box className={styles.organaizerInfo}>
        <Typography component="h2" variant="h2" className={styles.organaizerName}>
          <span>{organaizer.name ? organaizer.name : 'Anonimus'}</span>
        </Typography>
        <Typography component="p" className={styles.organaizerText}>
          Організатор
        </Typography>
      </Box>
    </Box>
  );
};
