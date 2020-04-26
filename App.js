import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Login from './screens/Login';
import Site from './screens/Site';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

var arr=["one", "two", "three", "four"]; //need to replace with site tools
var elements=[];

function CustomDrawerContent(props) {
  for(var i=0;i<arr.length;i++){
    elements.push(
      <DrawerItem 
      key={i.toString()}
      label={ arr[i] } 
      onPress={() => Linking.openUrl('https://mywebsite.com/help')
    }/>
  );
}
  return (
    <DrawerContentScrollView {...props}>
      {elements}
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Site" component={Site} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
