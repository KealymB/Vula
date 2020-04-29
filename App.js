import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './screens/Login';
import Site from './screens/Site';
import SideBar from './components/SideBar';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Site" component={Site} initialParams={title='Home'}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
