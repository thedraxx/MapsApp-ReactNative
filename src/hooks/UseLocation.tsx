import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Location} from '../interface/App-Interfaces';

const UseLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);

  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setInitialPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
        setHasLocation(true);
      },
      error => console.log(error),
    );
  }, []);

  return {hasLocation, initialPosition};
};

export default UseLocation;
