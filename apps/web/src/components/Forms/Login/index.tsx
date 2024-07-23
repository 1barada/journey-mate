import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Link, Typography } from '@mui/material';

import { loginUser, selectIsAuthLoading } from '../../../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../../../types/reduxTypes';
import { AuthFormTypes } from '../../AuthForm/types';
import { AuthFormInput } from '../../common/AuthFormInput';
import { TextInputRegisterTypes, TextInputTypes } from '../../common/AuthFormInput/types';
import { GoogleButton } from '../../GoogleButton';
import { FormTypes } from '../../GoogleButton/GoogleButton.types';
import sharedStyles from '../shared.module.scss';

import { loginSchema } from './schemas';
import type { FormInputsTypes, LoginProps } from './types';

const Login: React.FC<LoginProps> = ({ switchToRegisterForm, toggleModal }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsTypes>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<FormInputsTypes> = async (data) => {
    const response = await dispatch(loginUser(data));
    if (response.meta.requestStatus === 'fulfilled') {
      toggleModal();
    }
  };

  return (
    <Box className={sharedStyles.formContainer} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box className={sharedStyles.formHeadersContainer} component="div">
        <Typography className={sharedStyles.formHeader} component="h3">
          Log in
        </Typography>
        <Typography className={sharedStyles.formText} component="p">
          New to Design Space?{' '}
          <Link
            className={sharedStyles.formLinkText}
            component="button"
            type="button"
            underline="always"
            onClick={() => {
              if (!isLoading) {
                switchToRegisterForm(AuthFormTypes.SignUp);
              }
            }}
          >
            Sign up for free
          </Link>
        </Typography>
      </Box>
      <Box className={sharedStyles.formContainerFlexColumnGap20} component="div">
        <Box className={sharedStyles.formContainerFlexColumnGap16} component="div">
          <AuthFormInput
            label="Email address"
            labelProps={{ className: sharedStyles.formInputLabel }}
            inputProps={{ fullWidth: true, variant: 'outlined' }}
            errorProps={{ className: sharedStyles.formInputError }}
            type={TextInputTypes.Email}
            inputRegister={register(TextInputRegisterTypes.Email)}
            validationErrorMessage={errors.email?.message}
          />
          <AuthFormInput
            label="Password"
            labelProps={{ className: sharedStyles.formInputLabel }}
            inputProps={{
              fullWidth: true,
              variant: 'outlined',
            }}
            errorProps={{ className: sharedStyles.formInputError }}
            type={TextInputTypes.Password}
            showPswBtn={true}
            inputRegister={register(TextInputRegisterTypes.Password)}
            validationErrorMessage={errors.password?.message}
          />
        </Box>
        <Box className={sharedStyles.formContainerFlexColumnGap16} component="div">
          <Typography className={sharedStyles.formText}>
            <Link
              className={sharedStyles.formLinkText}
              underline="always"
              onClick={() => {
                if (!isLoading) {
                  console.log('Temporary event');
                }
              }}
            >
              Forget password?
            </Link>
          </Typography>
          <Button
            className={sharedStyles.formSubmitBtn}
            variant="contained"
            fullWidth
            disableElevation
            type="submit"
            disabled={isLoading}
          >
            <Typography className={sharedStyles.formSubmitBtnText}>{isLoading ? 'Loading...' : 'Log in'}</Typography>
          </Button>
        </Box>
        <GoogleButton formType={FormTypes.signIn} toggleModal={toggleModal} />
      </Box>
    </Box>
  );
};

export { Login };
