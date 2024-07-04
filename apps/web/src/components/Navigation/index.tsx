import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, Container, List, ListItem } from '@mui/material';

import { useModal } from '../../hooks/useModal';
import { routes } from '../../routes';
import { selectIsAuthenticated } from '../../store/auth/authSlice';
import { AuthForm } from '../AuthForm';
import { AuthFormTypes } from '../AuthForm/types';
import { Modal } from '../common/Modal';

import styles from './Navigation.module.scss';

export const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isOpen, toggle] = useModal();
  const [modalType, setModalType] = useState<AuthFormTypes>();

  const setUpModalType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const modalType = e.currentTarget.textContent?.toLocaleLowerCase();

    if (modalType === AuthFormTypes.Login) {
      setModalType(AuthFormTypes.SignIn);
      toggle();
    }

    if (modalType === AuthFormTypes.Register) {
      setModalType(AuthFormTypes.SignUp);
      toggle();
    }
  };

  return (
    <Box component="header" className={styles.headerWrapper}>
      <Container className={styles.headerContainer}>
        <NavLink className={styles.logo} to="/">
          Journey Mate
        </NavLink>

        {isAuthenticated ? (
          <AppBar component="nav" className={styles.appBar}>
            <List className={styles.navList}>
              {Object.values(routes).map((link) => {
                return (
                  <ListItem key={link}>
                    <NavLink
                      to={link}
                      aria-label={`link to ${link}`}
                      className={({ isActive }) => (isActive ? styles.active : styles.link)}
                    >
                      {link.slice(1).replace(/-/g, ' ')}
                    </NavLink>
                  </ListItem>
                );
              })}
            </List>
          </AppBar>
        ) : (
          <>
            <List className={styles.authListBtn}>
              <ListItem>
                <Button onClick={setUpModalType}>Login</Button>
              </ListItem>
              <ListItem>
                <Button variant="text" onClick={setUpModalType}>
                  Register
                </Button>
              </ListItem>
            </List>
            {isOpen && modalType && (
              <Modal toggleModal={toggle}>
                <AuthForm form={modalType} />
              </Modal>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};
