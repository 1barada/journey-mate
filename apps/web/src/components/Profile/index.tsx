import CreateIcon from '@mui/icons-material/Create';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import defaultFemale from '../../../public/img/defaultFemale.webp';
import defaultMale from '../../../public/img/defaultMale.webp';
import { CardDescription } from '../CardDescription';

import styles from './Profile.module.scss';

export const Profile = () => {
  return (
    <Box component="section" className={styles.section}>
      <Container>
        <Box component="div" className={styles.profileWrapper}>
          <Box component="div" className={styles.infoWrapper}>
            <Avatar src={defaultFemale} sx={{ width: 283, height: 283, overflow: 'visible', mb: 24 }} />
            <Box component="div">
              <Typography component="h1" variant="h1" className={styles.title}>
                Andrii Kuluiev
              </Typography>
              <Typography component="p" className={styles.text}>
                Sex: <span>Male</span>
              </Typography>
              <Typography component="p" className={styles.text}>
                Age: <span>27</span>
              </Typography>
              <Typography component="p" className={styles.text}>
                Email: <span>aaaaaaaa@gmail.com</span>
              </Typography>
            </Box>
          </Box>
          <Button className={styles.button}>
            <CreateIcon />
            Edit profile
          </Button>
        </Box>

        <CardDescription description="dsadsa" />
      </Container>
    </Box>
  );
};
