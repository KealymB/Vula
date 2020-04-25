import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AsyncStorage} from 'react-native';


import Login from './screens/Login';
import Home from './screens/Home';
import Site from './screens/Site';

const Drawer = createDrawerNavigator(  {
  initialRouteName: "Home",
  unmountInactiveRoutes: true,
  headerMode: "none",
  contentComponent: props => <Site {...props} />
});

async function clearCookies() {
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    AsyncStorage.clear();
  }
}

//clearCookies();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login">
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="EBE Undergrad Orientation" component={Site} />
        <Drawer.Screen name="Test" component={Site} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
