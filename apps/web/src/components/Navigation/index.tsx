import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, Container, List, ListItem } from '@mui/material';

import { routes } from '../../routes';
import { selectIsAuthenticated } from '../../store/auth/authSlice';

import styles from './Navigation.module.scss';

export const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

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
          <List className={styles.authListBtn}>
            <ListItem>
              <Button>Login</Button>
            </ListItem>
            <ListItem>
              <Button variant="text">Register</Button>
            </ListItem>
          </List>
        )}
      </Container>
    </Box>
  );
};
