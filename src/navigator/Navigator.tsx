import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../Screens/MapScreen';
import PermissionScreen from '../Screens/PermissionScreen';
import {PermissionContext} from '../context/PermissionContext';
import LoadingScreen from '../Screens/LoadingScreen';

const Stack = createStackNavigator();

const MyStack = () => {
  const {permissions} = useContext(PermissionContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="Permission"
      screenOptions={{
        cardShadowEnabled: false,
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="Home" component={MapScreen} />
      ) : (
        <Stack.Screen name="Permission" component={PermissionScreen} />
      )}
    </Stack.Navigator>
  );
};

export default MyStack;
