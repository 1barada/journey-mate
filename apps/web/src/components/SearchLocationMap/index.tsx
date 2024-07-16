import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

import { Position, SearchLocationMapProps } from './types';

export const SearchLocationMap: React.FC<SearchLocationMapProps> = ({ coordinate, onPlaceSelected, width, height }) => {
  const [currentPosition, setCurrentPosition] = useState<Position>(
    coordinate || {
      lat: 50.45466,
      lng: 30.5238,
    }
  );
  const [selectedPosition, setSelectedPosition] = useState<Position | undefined>(undefined);
  const onClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setSelectedPosition({ lat, lng });
      onPlaceSelected({ lat, lng });
    },
    [onPlaceSelected]
  );

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (coordinate) {
      setSelectedPosition({ lat: coordinate.lat, lng: coordinate.lng });
      setCurrentPosition({ lat: coordinate.lat, lng: coordinate.lng });
    }
  }, [coordinate]);

  return (
    <GoogleMap
      mapContainerStyle={{ width: width, height: height }}
      center={currentPosition}
      zoom={10}
      onClick={onClick}
    >
      {selectedPosition && <Marker position={selectedPosition} />}
    </GoogleMap>
  );
};
