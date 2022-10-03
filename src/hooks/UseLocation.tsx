/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useRef, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Location} from '../interface/App-Interfaces';

const UseLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);

  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const [CurrentUserLocation, setCurrentUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const [routeLines, setRouteLines] = useState<Location[]>([]);

  const watchId = useRef<number>();

  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    GetCurrentLocation().then(location => {
      if (!isMounted.current) {
        return;
      }
      setInitialPosition(location);
      setCurrentUserLocation(location);
      setHasLocation(true);
      setRouteLines(routes => [...routes, location]);
    });
  }, []);

  const GetCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        info => {
          resolve({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          });
        },
        error => reject({error}),
      );
    });
  };

  const FollowUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      info => {
        if (!isMounted.current) {
          return;
        }

        const location: Location = {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        };
        setCurrentUserLocation(location);
        setRouteLines(routes => [...routes, location]);
      },
      error => {
        console.log(error), {enableHighAccuracy: true, distanceFilter: 10};
      },
    );
  };

  const StopFollowUserLocation = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };
  return {
    hasLocation,
    initialPosition,
    GetCurrentLocation,
    FollowUserLocation,
    CurrentUserLocation,
    StopFollowUserLocation,
    routeLines,
  };
};

export default UseLocation;
