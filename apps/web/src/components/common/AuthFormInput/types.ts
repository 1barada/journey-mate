import { UseFormRegisterReturn } from 'react-hook-form';
import type { InputLabel, SxProps, TextField, Typography } from '@mui/material';

export interface AuthFormInputProps {
  label: string;
  labelProps?: React.ComponentPropsWithoutRef<typeof InputLabel>;
  inputProps?: React.ComponentPropsWithoutRef<typeof TextField>;
  errorProps?: React.ComponentPropsWithoutRef<typeof Typography>;
  labelSx?: SxProps;
  inputSx?: SxProps;
  type: TextInputTypes;
  showPswBtn?: boolean;
  inputRegister?: UseFormRegisterReturn<TextInputTypes.Email | TextInputTypes.Password | TextInputTypes.Text>;
  validationErrorMessage?: string | undefined;
}

export interface ShowHidePasswordBtnProps {
  setPasswordVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  passwordVisibility: boolean;
}

export enum TextInputTypes {
  Password = 'password',
  Email = 'email',
  Text = 'text',
}
