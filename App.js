import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Component } from 'react';

import Login from './screens/Login';
import Site from './screens/Site';
import SideBar from './components/SideBar';
import Loading from './screens/Loading';

import siteReducer from './reducers/siteReducer';

const Drawer = createDrawerNavigator();
const store = createStore(siteReducer);

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Site" component={Site} initialParams={title='Home'}/>
            <Drawer.Screen name="Loading" component={Loading} />
          </Drawer.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}export default App;
