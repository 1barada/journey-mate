import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';

import { AuthFormInput } from '../../common/AuthFormInput';
import { TextInputTypes } from '../../common/AuthFormInput/types';

import styles from './styles.module.scss';
import type { FormInputsTypes, RegisterProps } from './types';

const Register: React.FC<RegisterProps> = ({ temp }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsTypes>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<FormInputsTypes> = async (data) => {
    const response = await dispatch(login(data));
    if (response.meta.requestStatus === 'fulfilled') {
      toggleModal();
    }
  };

  return (
    <Box component="form" className={styles.formContainer} onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography className={styles.formHeader} component="h3">
        Sign up
      </Typography>
      <Box className={styles.formContainerFlexColumnGap20} component="div">
        <Box component="div" className={styles.formContainerFlexColumnGap16}>
          <AuthFormInput
            label="Email address"
            labelProps={{ className: styles.formInputLabel }}
            inputProps={{ fullWidth: true, variant: 'outlined' }}
            type={TextInputTypes.Email}
          />
          <AuthFormInput
            label="Password"
            labelProps={{ className: styles.formInputLabel }}
            inputProps={{
              fullWidth: true,
              variant: 'outlined',
            }}
            type={TextInputTypes.Password}
          />
          <AuthFormInput
            label="Password conformation"
            labelProps={{ className: styles.formInputLabel }}
            inputProps={{
              fullWidth: true,
              variant: 'outlined',
            }}
            type={TextInputTypes.Password}
          />
        </Box>
        <Box component="div" className={styles.formContainerFlexColumnGap16}>
          <Button
            variant="contained"
            fullWidth
            className={styles.formSubmitBtn}
            // disabled={}
            disableElevation
          >
            <Typography className={styles.formSubmitBtnText}>Sign Up</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Register };
