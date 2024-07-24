import React from 'react';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { googleAuth, whoami } from '../../store/auth/slice';
import { useAppDispatch } from '../../types/reduxTypes';

import { GoogleButtonProps } from './GoogleButton.types';
import styles from './styles.module.scss';

export const GoogleButton: React.FC<GoogleButtonProps> = ({ formType, toggleModal }) => {
  const dispatch = useAppDispatch();

  const handleLoginSuccess = async (response: CredentialResponse) => {
    const res = await dispatch(googleAuth({ credential: response.credential }))
      .unwrap()
      .then(() => {
        toggleModal();
        dispatch(whoami());
      });
  };

  const handleLoginError = () => {
    toast.error('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId="99151334654-bof4m5hcn481j30a1v9tm811tsa3753m.apps.googleusercontent.com">
      <Box className={styles.googleWrapper}>
        <Typography component="h3">{formType === 'signIn' ? 'Sign In with Google' : 'Sign Up with Google'}</Typography>
        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
      </Box>
    </GoogleOAuthProvider>
  );
};
