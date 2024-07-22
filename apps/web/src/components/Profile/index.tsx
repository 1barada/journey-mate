import { lazy, Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateIcon from '@mui/icons-material/Create';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import clsx from 'clsx';

import defaultImg from '../../../public/img/defaultImg.webp';
import { useModal } from '../../hooks/useModal';
import { selectUser } from '../../store/auth/slice';
import type { User } from '../../store/auth/types';
import { CardDescription } from '../CardDescription';

import styles from './Profile.module.scss';

const Modal = lazy(() => import('../common/Modal').then((module) => ({ default: module.Modal })));
const EditForm = lazy(() => import('../Forms/EditForm').then((module) => ({ default: module.EditForm })));

export const Profile = () => {
  const [isOpen, toggle] = useModal();
  const [isEdited, setIsEdited] = useState(false);
  const { age, avatar, description, email, name, sex } = useSelector(selectUser) ?? ({} as User);

  const doubleStyle = clsx(styles.button, styles.editBtn);

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
          <Button className={styles.button} onClick={() => toggle()}>
            <CreateIcon />
            Edit profile
          </Button>
        </Box>

        <Button className={doubleStyle} onClick={() => setIsEdited(true)}>
          Edit Description
        </Button>
        <CardDescription description={description} isEdited={isEdited} setIsEdited={setIsEdited} title="About myself" />
        <Suspense fallback="null">
          {isOpen && (
            <Modal toggleModal={toggle}>
              <EditForm age={age} email={email} name={name} sex={sex} />
            </Modal>
          )}
        </Suspense>
      </Container>
    </Box>
  );
};
