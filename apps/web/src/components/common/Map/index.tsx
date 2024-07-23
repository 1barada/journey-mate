import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, OverlayView, Polyline } from '@react-google-maps/api';
import { update } from 'lodash';

import styles from './Map.module.scss';
import { MapProps } from './Map.types';

export const Map: React.FC<MapProps> = ({ width, height, coordinates }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);

    const idleListener = google.maps.event.addListener(map, 'idle', () => {
      setIsLoaded(true);
      google.maps.event.removeListener(idleListener);
    });
  }, []);

  useEffect(() => {
    if (isLoaded && map && coordinates.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      coordinates.forEach((coord) => {
        bounds.extend(new google.maps.LatLng(coord.lat, coord.lng));
      });

      map.fitBounds(bounds);
      map.fitBounds(bounds, { top: 10, right: 10, bottom: 10, left: 10 });
    }
  }, [map, coordinates, isLoaded]);

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: false,
    scrollWheel: false,
    disableDoubleClickZoom: true,
    gestureHandling: 'none',
  };

  const lineOptions = {
    strokeColor: 'red',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: width, height: height }}
      center={coordinates[0]}
      zoom={1}
      options={mapOptions}
      onLoad={onLoad}
    >
      {isLoaded &&
        coordinates.map((coordinate, index) => (
          <OverlayView key={index} position={coordinate} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <CustomCircle num={index + 1} />
          </OverlayView>
        ))}
      {isLoaded && <Polyline path={coordinates} options={lineOptions} />}
    </GoogleMap>
  );
};

interface CustomCircleProps {
  num: number;
}

const CustomCircle: React.FC<CustomCircleProps> = ({ num }) => <div className={styles.circle}>{num}</div>;
