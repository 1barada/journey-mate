import { useSelector } from 'react-redux';
import CreateIcon from '@mui/icons-material/Create';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';

import defaultImg from '../../../public/img/defaultImg.webp';
import { useModal } from '../../hooks/useModal';
import { selectUser } from '../../store/Auth/AuthSlice';
import { CardDescription } from '../CardDescription';
import { Modal } from '../common/Modal';

import styles from './Profile.module.scss';

export const Profile = () => {
  const [isOpen, toggle] = useModal();

  const { age, avatar, description, email, name, sex } = useSelector(selectUser);

  return (
    <Box component="section" className={styles.section}>
      <Container>
        <Box component="div" className={styles.profileWrapper}>
          <Box component="div" className={styles.infoWrapper}>
            <Avatar src={avatar ? avatar : defaultImg} className={styles.avatar} />
            <Box component="div">
              <Typography component="h1" variant="h1" className={styles.title}>
                {name}
              </Typography>
              {sex && (
                <Typography component="p" className={styles.text}>
                  Sex: <span>{sex}</span>
                </Typography>
              )}
              {age && (
                <Typography component="p" className={styles.text}>
                  Age: <span>{age}</span>
                </Typography>
              )}
              <Typography component="p" className={styles.text}>
                Email: <span>{email}</span>
              </Typography>
            </Box>
          </Box>
          <Button className={styles.button}>
            <CreateIcon />
            Edit profile
          </Button>
        </Box>

        <CardDescription description={description} />

        {isOpen && (
          <Modal toggleModal={toggle}>
            <div></div>
          </Modal>
        )}
      </Container>
    </Box>
  );
};
