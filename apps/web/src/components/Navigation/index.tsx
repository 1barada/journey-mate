import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Container, IconButton, List, ListItem } from '@mui/material';

import { useModal } from '../../hooks/useModal';
import { routes } from '../../routes';
import { logoutUser, selectIsAuthenticated, selectIsAuthLoading } from '../../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../../types/reduxTypes';
import { AuthForm } from '../AuthForm';
import { AuthFormTypes } from '../AuthForm/types';

import styles from './Navigation.module.scss';

const Modal = lazy(() => import('../common/Modal').then((module) => ({ default: module.Modal })));

export const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectIsAuthLoading);
  const [isOpen, toggle] = useModal({ isLoading });
  const [modalType, setModalType] = useState<AuthFormTypes>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

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

  const onLogoutClick = () => {
    dispatch(logoutUser());
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
            <Box className={styles.appWrapper} component="div">
              <AppBar component="nav" className={styles.appBar}>
                <List className={styles.navList}>
                  {Object.values(routes)
                    .filter((link) => link !== '/auth' && link !== '/auth/confirm')
                    .map((link) => {
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
              <IconButton className={styles.logoutBtn} onClick={onLogoutClick}>
                <LogoutIcon /> Logout
              </IconButton>
            </Box>
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
                <Suspense>
                  <Modal toggleModal={toggle}>
                    <AuthForm form={modalType} toggleModal={toggle} />
                  </Modal>
                </Suspense>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};
