import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

import { config } from '../../../config/app.config';

import { MapWrapperProps } from './MapWrapper.types';

export const MapWrapper: React.FC<MapWrapperProps> = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: config.get('googleMapsApiKey'),
  });

  return <>{isLoaded && children}</>;
};
