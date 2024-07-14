import React, { useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { debounce } from 'lodash';

import { config } from '../../config/app.config';

import { SearchLocationInputProps } from './SearchLocationInput.types';

export const SearchLocationInput: React.FC<SearchLocationInputProps> = ({ onPlaceSelected }) => {
  const inputRef = useRef(null);

  const fetchCoordinates = debounce(async (inputValue) => {
    if (inputValue) {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
          params: {
            address: inputValue,
            key: config.get('googleMapsApiKey'),
          },
        });

        const results = response.data.results;
        if (results && results.length > 0) {
          const location = results[0].geometry.location;
          const coordinates = {
            lat: location.lat,
            lng: location.lng,
          };
          onPlaceSelected(coordinates, inputValue);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    }
  }, 2000);

  useEffect(() => {
    if (inputRef.current) {
      const input = (inputRef.current as HTMLElement).querySelector('input');
      if (input) {
        const handleInputChange = () => {
          fetchCoordinates(input.value);
        };

        input.addEventListener('input', handleInputChange);

        return () => {
          input.removeEventListener('input', handleInputChange);
        };
      }
    }
  }, [fetchCoordinates]);

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
