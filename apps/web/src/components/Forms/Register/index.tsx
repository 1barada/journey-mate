import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';

import { registerUser, selectIsAuthLoading } from '../../../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../../../types/reduxTypes';
import { AuthFormInput } from '../../common/AuthFormInput';
import { TextInputRegisterTypes, TextInputTypes } from '../../common/AuthFormInput/types';
import sharedStyles from '../shared.module.scss';

import { registerSchema } from './schemas';
import type { FormInputsTypes, RegisterProps } from './types';

const Register: React.FC<RegisterProps> = ({ toggleModal }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsTypes>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<FormInputsTypes> = async (data) => {
    const { email, password } = data;

    const response = await dispatch(registerUser({ email, password }));
    if (response.meta.requestStatus === 'fulfilled') {
      toggleModal();
    }
  };

  return (
    <Box component="form" className={sharedStyles.formContainer} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography className={sharedStyles.formHeader} component="h3">
        Sign up
      </Typography>
      <Box className={sharedStyles.formContainerFlexColumnGap20} component="div">
        <Box component="div" className={sharedStyles.formContainerFlexColumnGap16}>
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
            inputRegister={register(TextInputRegisterTypes.Password)}
            validationErrorMessage={errors.password?.message}
          />
          <AuthFormInput
            label="Password conformation"
            labelProps={{ className: sharedStyles.formInputLabel }}
            inputProps={{
              fullWidth: true,
              variant: 'outlined',
            }}
            errorProps={{ className: sharedStyles.formInputError }}
            type={TextInputTypes.Password}
            inputRegister={register(TextInputRegisterTypes.ConfirmPassword)}
            validationErrorMessage={errors.confirmPassword?.message}
          />
        </Box>
        <Box component="div" className={sharedStyles.formContainerFlexColumnGap16}>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            className={sharedStyles.formSubmitBtn}
            disabled={isLoading}
            disableElevation
          >
            <Typography className={sharedStyles.formSubmitBtnText}>{isLoading ? 'Loading...' : 'Sign up'}</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Register };
