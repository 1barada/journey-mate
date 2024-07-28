import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';

import { restorePasswordRequest, selectIsAuthLoading } from '../../../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../../../types/reduxTypes';
import { AuthFormInput } from '../../common/AuthFormInput';
import { TextInputRegisterTypes, TextInputTypes } from '../../common/AuthFormInput/types';
import sharedStyles from '../shared.module.scss';

import { restorePasswordRequestSchema } from './schemas';
import type { FormInputsTypes, RestorePasswordRequestFormProps } from './types';

const RestorePasswordRequestForm: React.FC<RestorePasswordRequestFormProps> = ({ toggleModal }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsAuthLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsTypes>({ resolver: zodResolver(restorePasswordRequestSchema) });

  const onSubmit: SubmitHandler<FormInputsTypes> = async (data) => {
    const response = await dispatch(restorePasswordRequest(data));
    if (response.meta.requestStatus === 'fulfilled') {
      toggleModal();
    }
  };

  return (
    <Box className={sharedStyles.formContainer} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box className={sharedStyles.formHeadersContainer} component="div">
        <Typography className={sharedStyles.formHeader} component="h3">
          Restore Password
        </Typography>
      </Box>
      <Box className={sharedStyles.formContainerFlexColumnGap20} component="div">
        <AuthFormInput
          label="Email address"
          labelProps={{ className: sharedStyles.formInputLabel }}
          inputProps={{ fullWidth: true, variant: 'outlined' }}
          errorProps={{ className: sharedStyles.formInputError }}
          type={TextInputTypes.Email}
          inputRegister={register(TextInputRegisterTypes.Email)}
          validationErrorMessage={errors.email?.message}
        />
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
              {isLoading ? 'Sending request email' : 'Send email'}
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { RestorePasswordRequestForm };
