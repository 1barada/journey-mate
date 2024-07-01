import type { InputLabel, SxProps, TextField } from '@mui/material';

export interface AuthFormInputProps {
  label: string;
  labelProps?: React.ComponentPropsWithoutRef<typeof InputLabel>;
  inputProps?: React.ComponentPropsWithoutRef<typeof TextField>;
  labelSx?: SxProps;
  inputSx?: SxProps;
  type: 'password' | 'email' | 'text';
  showPswBtn?: boolean;
}

export interface ShowHidePasswordBtnProps {
  setPasswordVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  passwordVisibility: boolean;
}
