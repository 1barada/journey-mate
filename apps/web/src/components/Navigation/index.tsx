import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, Container, List, ListItem } from '@mui/material';

import { routes } from '../../routes';
import { selectIsAuthenticated } from '../../store/Auth/AuthSlice';

import styles from './Navigation.module.scss';

export const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <Box component="header" className={styles.headerWrapper}>
      <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <NavLink className={styles.logo} to="/">
          Journey Mate
        </NavLink>

        {isAuthenticated ? (
          <AppBar position="relative" component="nav" sx={{ boxShadow: 'none', display: 'block', width: 'auto' }}>
            <List sx={{ display: 'flex', justifyContent: 'space-evenly', gap: '28px' }}>
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
          <List sx={{ display: 'flex', gap: '8px' }}>
            <ListItem>
              <Button variant="text" sx={{ color: 'black' }}>
                Login
              </Button>
            </ListItem>
            <ListItem>
              <Button variant="text" sx={{ color: 'black' }}>
                Register
              </Button>
            </ListItem>
          </List>
        )}
      </Container>
    </Box>
  );
};
