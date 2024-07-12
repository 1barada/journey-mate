import React, { useCallback, useEffect, useState } from 'react';
import { GoogleMap, OverlayView, Polyline } from '@react-google-maps/api';

import styles from './Map.module.scss';
import { MapProps } from './Map.types';

export const Map: React.FC<MapProps> = ({ width, height, coordinates }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const onLoad = useCallback((map: google.maps.Map) => {
    updateMap(map);
    setIsLoaded(true);
  }, []);

  const updateMap = (map: google.maps.Map | null) => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      coordinates.map((marker) => {
        bounds.extend({
          lat: marker.lat,
          lng: marker.lng,
        });
      });
      map.fitBounds(bounds);

      const zoomChangeBoundsListener = google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
        const currentZoom = map.getZoom() || 0;
        map.setZoom(Math.min(40, currentZoom));
      });
      setTimeout(() => google.maps.event.removeListener(zoomChangeBoundsListener), 2000);
    }
  };

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
      <Polyline path={coordinates} options={lineOptions} />
    </GoogleMap>
  );
};

interface CustomCircleProps {
  num: number;
}

const CustomCircle: React.FC<CustomCircleProps> = ({ num }) => <div className={styles.circle}>{num}</div>;
