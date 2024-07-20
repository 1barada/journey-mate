import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

import { editProfile } from '../../../store/auth/slice';

import styles from './EditForm.module.scss';
import type { EditFormProps } from './types';

export const EditForm: FC<EditFormProps> = ({ age, email, name, sex }) => {
  const { control, handleSubmit, watch, setValue } = useForm<EditFormProps>({
    defaultValues: {
      name,
      age,
      email,
      sex,
      file: null,
    },
  });

  const dispatch = useDispatch();
  const file = watch('file');

  const onSubmit = (data: EditFormProps) => {
    const { name, age, email, sex } = data;
    dispatch(editProfile({ name, age: Number(age), email, sex }));
    console.log({ file: data.file });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      setValue('file', target.files[0]);
    }
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
          <TextField {...field} id="outlined-name" label="Full name" fullWidth margin="normal" variant="outlined" />
        )}
      />
      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined-age"
            label="Age"
            fullWidth
            margin="normal"
            variant="outlined"
            type="text"
            value={field.value || ''}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField {...field} id="outlined-email" label="Email" fullWidth margin="normal" variant="outlined" />
        )}
      />
      <FormControl fullWidth margin="normal">
        <Button variant="contained" component="label">
          Choose Photo
          <Input
            type="file"
            inputProps={{ accept: 'image/*,application/pdf' }}
            onChange={handleFileChange}
            className={styles.inputUnDisplayed}
          />
        </Button>
        {file && (
          <TextField
            label="Selected file"
            value={file.name}
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        )}
      </FormControl>
      <FormControl className={styles.radioWrapper}>
        <FormLabel className={styles.radioLabel} component="legend">
          Sex
        </FormLabel>
        <Controller
          name="sex"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} className={styles.radioList} aria-label="sex" name="sex">
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
