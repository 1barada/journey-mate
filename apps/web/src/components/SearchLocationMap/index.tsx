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
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | undefined>(undefined);

  const onClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setSelectedPosition({ lat, lng });

      if (geocoder) {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const address = results[0].formatted_address;
            const [firstPart, ...restParts] = address.split(' ');

            onPlaceSelected({ lat, lng }, restParts.join(' '));
          } else {
            console.error('Geocoder failed due to: ' + status);
          }
        });
      } else {
        onPlaceSelected({ lat, lng }, '');
      }
    },
    [geocoder, onPlaceSelected]
  );
  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition(
          coordinate || {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        );
      });
    }

    setGeocoder(new google.maps.Geocoder());
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
      options={mapOptions}
      zoom={10}
      onClick={onClick}
    >
      {selectedPosition && <Marker position={selectedPosition} />}
    </GoogleMap>
  );
};
