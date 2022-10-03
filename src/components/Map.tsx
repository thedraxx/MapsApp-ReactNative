/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useRef} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import UseLocation from '../hooks/UseLocation';
import LoadingScreen from '../Screens/LoadingScreen';
import Fab from './Fab';

interface Props {
  markers?: Marker[];
}

const Map = ({markers}: Props) => {
  const {
    hasLocation,
    initialPosition,
    GetCurrentLocation,
    FollowUserLocation,
    CurrentUserLocation,
  } = UseLocation();

  useEffect(() => {
    FollowUserLocation();
    return () => {
      // TODO cancelar el follow
    };
  }, []);

  useEffect(() => {
    const latitude = CurrentUserLocation.latitude;
    const longitude = CurrentUserLocation.longitude;
    mapViewRef.current?.animateCamera({
      center: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  }, [CurrentUserLocation]);

  const mapViewRef = useRef<MapView>();

  const centerPosition = async () => {
    const location = await GetCurrentLocation();
    mapViewRef.current?.animateCamera({
      center: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }
  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{flex: 1}}
        showsUserLocation
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {/* <Marker
          image={require('../assets/images/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={'Test Marker'}
          description={'This is a description of the marker'}
        /> */}
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
};

export default Map;
