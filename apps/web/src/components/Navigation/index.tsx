import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, IconButton, List, ListItem } from '@mui/material';

import { useModal } from '../../hooks/useModal';
import { routes } from '../../routes';
import { selectIsAuthenticated } from '../../store/Auth/AuthSlice';
import { AuthForm } from '../AuthForm';
import { AuthFormTypes } from '../AuthForm/types';
import { Modal } from '../common/Modal';

import styles from './Navigation.module.scss';

export const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isOpen, toggle] = useModal();
  const [modalType, setModalType] = useState<AuthFormTypes>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const location = useLocation();

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

  const onClickHandler = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(min-width: 768px)');

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsMobileMenuOpen(false);
      }
    };

    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, [setIsMobileMenuOpen]);

  const handleCloseMenuCose = () => {
    if (window.innerWidth <= 767) {
      setIsMobileMenuOpen(false);
    }
  };

  const openMobile = isMobileMenuOpen && styles.open;

  return (
    <Box component="header" className={styles.headerWrapper}>
      <Container className={styles.headerContainer}>
        <NavLink className={styles.logo} to="/">
          Journey Mate
        </NavLink>
        <IconButton
          onClick={onClickHandler}
          className={styles.openBtn}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Box component="div" className={`${styles.navWrapper} ${openMobile}`}>
          <IconButton
            onClick={onClickHandler}
            size="large"
            edge="start"
            color="inherit"
            aria-label="close-menu"
            className={styles.closeBtn}
          >
            <CloseIcon />
          </IconButton>
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
                        onClick={handleCloseMenuCose}
                        state={{ from: location }}
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
        </Box>
      </Container>
    </Box>
  );
};
