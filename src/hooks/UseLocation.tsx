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

  const watchId = useRef<number>();

  useEffect(() => {
    GetCurrentLocation().then(location => {
      setInitialPosition(location);
      setCurrentUserLocation(location);
      setHasLocation(true);
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
        setCurrentUserLocation({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
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
  };
};

export default UseLocation;
