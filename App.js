import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Component } from 'react';
import { View, Text } from 'react-native';
import Login from './screens/Login';
import Site from './screens/Site';
import SideBar from './components/SideBar';
import Loading from './screens/Loading';
import DocViewer from './components/DocViewer'
import siteReducer from './reducers/siteReducer';
import AsyncStorage from '@react-native-community/async-storage';
import * as SecureStore from 'expo-secure-store';
const Drawer = createDrawerNavigator();
const store = createStore(siteReducer);



class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false
    }
    this.getLoginState()

  }


  getLoginState = async () => {
    await this.getSavedDetails()
    console.log('val: ' + this.state.loggedIn)
    try {
      const value = await AsyncStorage.getItem('LoginState')
      if (value !== null) {
        if (value == 'true')
          this.setState({ loggedIn: true })
        console.log('val: ' + this.state.loggedIn)
      }
    } catch (e) {
      console.log(e)
    }
  }

  getSavedDetails = async () => {
    try {
      const value = await SecureStore.getItemAsync('userData')
      if (value !== null) 
      {
        console.log('details saved!')
      }
    } catch (e) {
      console.log(e)
    }
  }
  render() {
      return (
        <Provider store={store}>
          <NavigationContainer>
            <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
              <Drawer.Screen name="Login" component={Login} />
              <Drawer.Screen name="Site" component={Site} initialParams={title = 'Home'} />
              <Drawer.Screen name="Loading" component={Loading} />
              <Drawer.Screen name="DocViewer" component={DocViewer} />
            </Drawer.Navigator>
          </NavigationContainer>
        </Provider>
      );
  }
} export default App;
