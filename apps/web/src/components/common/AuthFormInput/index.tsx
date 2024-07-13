import { useState } from 'react';
import { InputLabel, TextField, Typography } from '@mui/material';

import { ShowHidePasswordBtn } from './ShowHidePasswordBtn';
import { AuthFormInputProps, TextInputTypes } from './types';

export const AuthFormInput: React.FC<AuthFormInputProps> = ({
  label,
  labelProps,
  labelSx,
  inputProps,
  inputSx,
  errorProps,
  type,
  showPswBtn,
  inputRegister,
  validationErrorMessage,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const inputType = type === TextInputTypes.Password && passwordVisibility ? 'text' : type;

  return (
    <InputLabel sx={{ ...labelSx }} {...labelProps}>
      {label}
      <TextField
        sx={{ ...inputSx }}
        InputProps={{
          endAdornment:
            type === TextInputTypes.Password && showPswBtn ? (
              <ShowHidePasswordBtn
                passwordVisibility={passwordVisibility}
                setPasswordVisibility={setPasswordVisibility}
              />
            ) : null,
        }}
        type={inputType}
        {...inputProps}
        {...inputRegister}
      />
      {validationErrorMessage && <Typography {...errorProps}>{validationErrorMessage}</Typography>}
    </InputLabel>
  );
};
