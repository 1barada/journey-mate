import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Link, Typography } from '@mui/material';
import { z } from 'zod';

import { login, selectIsAuthLoading } from '../../store/Auth/AuthSlice';
import { useAppDispatch, useAppSelector } from '../../types/reduxTypes';
import { AuthFormTypes } from '../AuthForm/types';
import { AuthFormInput } from '../common/AuthFormInput';
import { TextInputTypes } from '../common/AuthFormInput/types';

import styles from './styles.module.scss';
import type { LoginProps } from './types';

const schema = z.object({
  email: z.string().email({ message: 'Email is required' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 symbols long' })
    .max(35, { message: 'Password must be less than 35 symbols' })
    .trim(),
});

export type FormInputsTypes = z.infer<typeof schema>;

const Login: React.FC<LoginProps> = ({ switchToRegisterForm, toggleModal }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputsTypes>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormInputsTypes> = async (data) => {
    const response = await dispatch(login(data));
    if (response.meta.requestStatus === 'fulfilled') {
      toggleModal();
    }
  };

  const isBtnDisabled = (): boolean => {
    if (isValid && !isLoading) {
      return false;
    }
    return true;
  };

  return (
    <Box className={styles.formContainer} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box className={styles.formHeadersContainer} component="div">
        <Typography className={styles.formHeader} component="h3">
          Log in
        </Typography>
        <Typography className={styles.formText} component="p">
          New to Design Space?{' '}
          <Link
            className={styles.formLinkText}
            component="button"
            type="button"
            underline="always"
            onClick={() => {
              switchToRegisterForm(AuthFormTypes.SignUp);
            }}
          >
            Sign up for free
          </Link>
        </Typography>
      </Box>
      <Box className={styles.formContainerFlexColumnGap20} component="div">
        <Box className={styles.formContainerFlexColumnGap16} component="div">
          <AuthFormInput
            label="Email address"
            labelProps={{ className: styles.formInputLabel }}
            inputProps={{ fullWidth: true, variant: 'outlined' }}
            errorProps={{ className: styles.formInputError }}
            type={TextInputTypes.Email}
            inputRegister={register(TextInputTypes.Email)}
            validationErrorMessage={errors.email?.message}
          />
          <AuthFormInput
            label="Password"
            labelProps={{ className: styles.formInputLabel }}
            inputProps={{
              fullWidth: true,
              variant: 'outlined',
            }}
            errorProps={{ className: styles.formInputError }}
            type={TextInputTypes.Password}
            showPswBtn={true}
            inputRegister={register(TextInputTypes.Password)}
            validationErrorMessage={errors.password?.message}
          />
        </Box>
        <Box className={styles.formContainerFlexColumnGap16} component="div">
          <Typography className={styles.formText}>
            <Link
              className={styles.formLinkText}
              underline="always"
              onClick={() => {
                console.log('Temporary event');
              }}
            >
              Forget password?
            </Link>
          </Typography>
          <Button
            className={styles.formSubmitBtn}
            variant="contained"
            fullWidth
            disableElevation
            type="submit"
            disabled={isBtnDisabled()}
          >
            <Typography className={styles.formSubmitBtnText}>Log in</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Login };
