import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';

import { restorePassword, selectIsAuthLoading } from '../../../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../../../types/reduxTypes';
import { AuthFormInput } from '../../common/AuthFormInput';
import { TextInputRegisterTypes, TextInputTypes } from '../../common/AuthFormInput/types';
import sharedStyles from '../shared.module.scss';

import { RestorePasswordSchema } from './schemas';
import type { FormInputsTypes, RestorePasswordProps } from './types';

const RestorePasswordForm: React.FC<RestorePasswordProps> = ({ toggleModal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsTypes>({ resolver: zodResolver(RestorePasswordSchema) });

  const onSubmit: SubmitHandler<FormInputsTypes> = async (data) => {
    const searchParams = new URLSearchParams(location.search);
    const restoreToken = searchParams.get('restoreToken');

    if (!restoreToken) {
      return;
    }

    const response = await dispatch(restorePassword({ newPassword: data.password, restoreToken }));
    if (response.meta.requestStatus === 'fulfilled') {
      toggleModal();
      navigate('/');
    }
  };

  return (
    <Box className={sharedStyles.formContainer} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box className={sharedStyles.formHeadersContainer} component="div">
        <Typography className={sharedStyles.formHeader} component="h3">
          New Password
        </Typography>
      </Box>
      <Box className={sharedStyles.formContainerFlexColumnGap20} component="div">
        <Box className={sharedStyles.formContainerFlexColumnGap16} component="div">
          <AuthFormInput
            label="New password"
            labelProps={{ className: sharedStyles.formInputLabel }}
            inputProps={{ fullWidth: true, variant: 'outlined' }}
            errorProps={{ className: sharedStyles.formInputError }}
            type={TextInputTypes.Password}
            showPswBtn={true}
            inputRegister={register(TextInputRegisterTypes.Password)}
            validationErrorMessage={errors.password?.message}
          />
          <AuthFormInput
            label="Confirm password"
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
        <Box className={sharedStyles.formContainerFlexColumnGap16} component="div">
          <Button
            className={sharedStyles.formSubmitBtn}
            variant="contained"
            fullWidth
            disableElevation
            type="submit"
            disabled={isLoading}
          >
            <Typography className={sharedStyles.formSubmitBtnText}>
              {isLoading ? 'Loading...' : 'Set new password'}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { RestorePasswordForm };
