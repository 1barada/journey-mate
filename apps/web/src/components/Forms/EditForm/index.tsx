import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { changeProfileData } from '../../../store/auth/slice';
import { useAppDispatch } from '../../../types/reduxTypes';

import styles from './EditForm.module.scss';
import type { EditFormProps } from './types';

export const EditForm: FC<EditFormProps> = ({ dateOfBirth, email, name, sex }) => {
  const { control, handleSubmit } = useForm<EditFormProps>({
    defaultValues: {
      name,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : new Date(),
      email,
      sex,
    },
  });

  const dispatch = useAppDispatch();

  const onSubmit = async (data: EditFormProps) => {
    dispatch(changeProfileData(data));
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography component="h2" variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-name"
            label="Full name"
            fullWidth
            margin="normal"
            onChange={field.onChange}
            variant="outlined"
          />
        )}
      />
      <Controller
        control={control}
        name="dateOfBirth"
        rules={{ required: true }}
        render={({ field }) => {
          console.log(field);
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label=""
                {...field}
                value={dayjs(field.value)}
                onChange={field.onChange}
                format={'DD.MM.YYYY'}
              />
            </LocalizationProvider>
          );
        }}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-email"
            onChange={field.onChange}
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        )}
      />

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
              value={sex}
              aria-label="sex"
              name="sex"
              onChange={field.onChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          )}
        />
      </FormControl>
      <Button type="submit" variant="contained" color="primary" className={styles.submitBtn}>
        Submit
      </Button>
    </Box>
  );
};
