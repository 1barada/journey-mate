import axios from 'axios';
import { debounce } from 'lodash';

import { config } from '../config/app.config';

export const fetchCoordinates = debounce(async (inputValue, onPlaceSelected) => {
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
