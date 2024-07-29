import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { changeProfileData, selectIsAuthLoading } from '../../../store/auth/slice';
import { useAppDispatch, useAppSelector } from '../../../types/reduxTypes';

import styles from './EditForm.module.scss';
import { editProfileSchema } from './schemas';
import type { EditFormProps } from './types';

export const EditForm: FC<EditFormProps> = ({ dateOfBirth, email, name, sex }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormProps>({
    defaultValues: {
      name,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(),
      email,
      sex,
    },
    resolver: zodResolver(editProfileSchema),
  });

  const isLoading = useAppSelector(selectIsAuthLoading);

  const dispatch = useAppDispatch();

  const onSubmit = async (data: EditFormProps) => {
    dispatch(changeProfileData(data));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h2" variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      <InputLabel className={styles.inputLabel}>
        Full name
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField {...field} id="outlined-name" fullWidth margin="normal" onChange={field.onChange} />
          )}
        />
        {errors.name?.message && <Typography className={styles.error}>{errors.name.message}</Typography>}
      </InputLabel>
      <InputLabel className={styles.inputLabel}>
        Date of birth
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => {
            return (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  {...field}
                  value={dayjs(field.value)}
                  onChange={(data) => {
                    field.onChange(data);
                  }}
                  format={'DD.MM.YYYY'}
                  inputRef={field.ref}
                />
              </LocalizationProvider>
            );
          }}
        />
        {errors.dateOfBirth?.message && <Typography className={styles.error}>{errors.dateOfBirth.message}</Typography>}
      </InputLabel>
      <InputLabel className={styles.inputLabel}>
        Email
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField {...field} id="outlined-email" onChange={field.onChange} fullWidth margin="normal" />
          )}
        />
        {errors.email?.message && <Typography className={styles.error}>{errors.email.message}</Typography>}
      </InputLabel>
      <FormControl className={styles.radioWrapper}>
        <FormLabel className={styles.radioLabel} component="legend">
          Sex
        </FormLabel>
        <Controller
          name="sex"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              className={styles.radioList}
              value={field.value}
              aria-label="sex radio group"
              name="sex"
              onChange={field.onChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          )}
        />
        {errors.sex?.message && <Typography className={styles.error}>{errors.sex.message}</Typography>}
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={styles.submitBtn}
        disabled={isLoading}
        aria-label="submit form button"
      >
        {isLoading ? <CircularProgress color="inherit" /> : 'Submit'}
      </Button>
    </Box>
  );
};
