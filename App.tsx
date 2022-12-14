import 'react-native-gesture-handler';
import React from 'react';
import Navigator from './src/navigator/Navigator';
import {NavigationContainer} from '@react-navigation/native';
import {PermissionsProvider} from './src/context/PermissionContext';

const AppState = ({children}: any) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
