import axios from 'axios';

import { config } from '../config/app.config';

export const fetchCoordinates = async (inputValue: string) => {
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

      return coordinates;
    }

    throw new Error('No results found');
  } catch (error) {
    console.error('Error fetching coordinates:', error);
  }
};
