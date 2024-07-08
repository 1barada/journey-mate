import React, { ChangeEvent, FormEvent, useState } from 'react';
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

export const EditForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [sex, setSex] = useState<string | null>('');

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
      case 'description':
        setDescription(value);
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

    console.log({ file, name, age, email, description, sex });
  };

  return (
    <Box component="form" onSubmit={handleSumbit}>
      <Typography component="h2">Edit Profile</Typography>
      <TextField onChange={handleInputChange} id="outlined-multiline-flexible" name="name" label="Full name" />
      <TextField onChange={handleInputChange} id="outlined-multiline-flexible" name="age" label="Age" />
      <TextField onChange={handleInputChange} id="outlined-multiline-flexible" name="email" label="Email" />
      <TextField onChange={handleInputChange} id="outlined-multiline-flexible" name="description" label="Description" />
      {/* <TextField id="outlined-multiline-flexible" label="Change photo" type="file" /> */}
      <div>
        <input
          accept="image/*,application/pdf"
          id="file-input"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="file-input">
          <Button variant="contained" color="primary" component="span">
            Choose Photo
          </Button>
        </label>
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
      </div>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Sex</FormLabel>
        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="sex" onChange={handleInputChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      </FormControl>

      <Button type="submit"> Submit</Button>
    </Box>
  );
};
