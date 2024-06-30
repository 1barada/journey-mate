import { InputLabel, TextField } from '@mui/material';

import { ShowHideBtn } from './ShowHideBtn';
import { AuthFormInputProps } from './types';

export const AuthFormInput: React.FC<AuthFormInputProps> = ({
  label,
  labelProps,
  labelSx,
  inputProps,
  inputSx,
  setPasswordVisibility,
  passwordVisibility,
}) => {
  return (
    <InputLabel sx={{ ...labelSx }} {...labelProps}>
      {label}
      <TextField
        sx={{ ...inputSx }}
        InputProps={{
          endAdornment:
            passwordVisibility !== undefined && setPasswordVisibility !== undefined ? (
              <ShowHideBtn passwordVisibility={passwordVisibility} setPasswordVisibility={setPasswordVisibility} />
            ) : null,
        }}
        {...inputProps}
      />
    </InputLabel>
  );
};
