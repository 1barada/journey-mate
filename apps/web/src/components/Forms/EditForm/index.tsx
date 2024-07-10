import { ChangeEvent, FC, FormEvent, useState } from 'react';
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

import { editProfile } from '../../../store/Auth/AuthSlice';

import styles from './EditForm.module.scss';
import type { EditFormProps } from './types';

export const EditForm: FC<EditFormProps> = ({ age, mail, fullname, gender }) => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>(fullname);
  const [years, setAge] = useState<number | null>(age);
  const [email, setEmail] = useState(mail);

  const [sex, setSex] = useState<string | null>(gender);

  const dispatch = useDispatch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'age':
        setAge(Number(value));
        break;
      case 'email':
        setEmail(value);
        break;

      case 'sex':
        setSex(value);
        break;
      default:
        break;
    }
  };

  const handleSumbit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(editProfile({ name, age: years, email, sex }));
    console.log({ file });
  };

  return (
    <Box component="form" onSubmit={handleSumbit}>
      <Typography component="h2" variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      <TextField
        onChange={handleInputChange}
        id="outlined-name"
        name="name"
        label="Full name"
        value={name}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        onChange={handleInputChange}
        id="outlined-age"
        name="age"
        label="Age"
        value={years ?? ''}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        onChange={handleInputChange}
        id="outlined-email"
        name="email"
        label="Email"
        value={email}
        fullWidth
        margin="normal"
        variant="outlined"
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
        <RadioGroup
          className={styles.radioList}
          aria-label="sex"
          name="sex"
          onChange={handleInputChange}
          value={sex ?? ''}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" className={styles.submitBtn}>
        Submit
      </Button>
    </Box>
  );
};
