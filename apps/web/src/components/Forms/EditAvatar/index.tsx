import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Avatar, Box, Button, FormControl, Input, TextField } from '@mui/material';

import { trpcClient } from '../../../services/trpc';

import styles from './EditAvatar.module.scss';
import { EditAvatarProps } from './types';

export const EditAvatar = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { handleSubmit, watch, setValue } = useForm<EditAvatarProps>({
    defaultValues: {
      file: null,
    },
  });
  const file = watch('file');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];

      setValue('file', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: EditAvatarProps) => {
    console.log(data.file);
    // // dispatch(editProfile({ name, age: Number(age), email, sex }));
    // await trpcClient.user.changeAvatar.mutate({ avatar: data.file });
    // await trpcClient.user.changeAvatar.mutate({});
    // await trpcClient.user.changeProfileData.mutate({ name, email, sex, age, avatar: data.file });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth margin="normal">
        {preview && <Avatar src={preview} className={styles.avatar} />}
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

      <Button type="submit" variant="contained" color="primary" className={styles.submitBtn}>
        Submit
      </Button>
    </Box>
  );
};
