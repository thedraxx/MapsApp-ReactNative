import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

interface Props {
  markers?: Marker[];
}

const Map = ({markers}: Props) => {
  return (
    <>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
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
    </>
  );
};

export default Map;
