import React, { useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { debounce } from 'lodash';

import { fetchCoordinates } from '../../actions/fetchCoordinates';

import { SearchLocationInputProps } from './SearchLocationInput.types';

export const SearchLocationInput: React.FC<SearchLocationInputProps> = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const input = (inputRef.current as HTMLElement).querySelector('input');

      if (!input) {
        return;
      }

      const handleInputChange = debounce(async () => {
        if (!input.value) return;
        const coordinates = await fetchCoordinates(input.value);
        if (!coordinates) {
          return;
        }
        onPlaceSelected(coordinates, input.value);
      }, 2000);

      input.addEventListener('input', handleInputChange);

      return () => {
        input.removeEventListener('input', handleInputChange);
      };
    }
  }, []);

  return (
    <div>
      <TextField
        ref={inputRef}
        variant="outlined"
        placeholder="Search location"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </div>
  );
};
