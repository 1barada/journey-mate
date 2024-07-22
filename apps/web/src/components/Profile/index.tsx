import { lazy, Suspense, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Avatar, Box, Button, Container, Tab, Typography } from '@mui/material';
import clsx from 'clsx';

import defaultImg from '../../../public/img/defaultImg.webp';
import { useModal } from '../../hooks/useModal';
import { editDescription, selectUser } from '../../store/auth/slice';
import { User } from '../../store/Auth/types';
import { useAppDispatch, useAppSelector } from '../../types/reduxTypes';
import { CardDescription } from '../CardDescription';
import { EditAvatar } from '../Forms/EditAvatar';

import styles from './Profile.module.scss';

const Modal = lazy(() => import('../common/Modal').then((module) => ({ default: module.Modal })));
const EditForm = lazy(() => import('../Forms/EditForm').then((module) => ({ default: module.EditForm })));

export const Profile = () => {
  const [value, setValue] = useState('1');
  const [isOpen, toggle] = useModal({});
  const [isEdited, setIsEdited] = useState(false);
  const { dateOfBirth, avatar, description, email, name, sex } = useAppSelector(selectUser) ?? ({} as User);

  const dispatch = useAppDispatch();

  const doubleStyle = clsx(styles.button, styles.editBtn);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleEditDescription = (newDescription: string) => {
    dispatch(editDescription(newDescription));
  };

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
              {dateOfBirth && (
                <Typography component="p" className={styles.text}>
                  Age: <span>{dateOfBirth}</span>
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
        <CardDescription
          description={description}
          isEdited={isEdited}
          setIsEdited={setIsEdited}
          title="About myself"
          handleEditDescription={handleEditDescription}
        />
        <Suspense fallback="null">
          {isOpen && (
            <Modal toggleModal={toggle}>
              <TabContext value={value}>
                <Box>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Update Profile" value="1" />
                    <Tab label="Change Avatar" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <EditForm dateOfBirth={dateOfBirth} email={email} name={name} sex={sex} />
                </TabPanel>
                <TabPanel value="2">
                  <EditAvatar />
                </TabPanel>
              </TabContext>
            </Modal>
          )}
        </Suspense>
      </Container>
    </Box>
  );
};
