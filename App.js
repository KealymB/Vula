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
import SplashScreen from './components/SplashScreen'
import AsyncStorage from '@react-native-community/async-storage';
import * as SecureStore from 'expo-secure-store';
const Drawer = createDrawerNavigator();
const store = createStore(siteReducer);
var FormData = require('form-data');
let formdata = new FormData();


async function makeRequest(path, params) {
  let response = await fetch(path, {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'User': 'react-native',
      'Connection': 'keep-alive',
    },
    body: params
  }).then((response) => {
    if (response.status == 201) {
      console.log('good login')
      return true;

    } else {
      console.log('bad login')
      return false;
    }
  })
  return response
}

const AppScreens = ({ loginState, isLoading }) => {
  console.log('Loading: '+isLoading)
  if(isLoading)
  {
    return (
      <SplashScreen/>
    )
  }
  
  if (loginState) {
    return (
      <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
        <Drawer.Screen name="Site" component={Site}  />
        <Drawer.Screen name="Loading" component={Loading} />
        <Drawer.Screen name="DocViewer" component={DocViewer} />
        {/* <Drawer.Screen name="Login" component={Login} /> this needs sorting */} 
      </Drawer.Navigator>
    )
  }
  else if (!loginState) {
    return (
      <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Site" component={Site} />
      </Drawer.Navigator>
    )
  }

}

class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      isLoading: true
    }

    this.getLoginState()
  }





  getLoginState = async () => {
    await this.getSavedDetails()
    // console.log('Login Val Before: ' + this.state.loggedIn)
    // try {
    //   const value = await AsyncStorage.getItem('LoginState')
    //   console.log('Value In Login State: '+ value)
    //   if (value !== null) {
    //     if (value == 'true')
    //       this.setState({ loggedIn: true })
    //       this.setState({isLoading:false})
    //     console.log('val: ' + this.state.loggedIn)
        
    //   }
    // } catch (e) {
    //   console.log(e)
    // }
  }

  getSavedDetails = async () => {
    try {
      const value = await SecureStore.getItemAsync('userData')
      if (value !== null) {
        //console.log('details saved!')
        //console.log('Details: ' + value)
        formdata.append('_username', JSON.parse(value).username)
        formdata.append('_password', JSON.parse(value).password)
        //console.log('Data to be sent: ' + JSON.stringify(formdata))
        let a = await makeRequest("https://vula.uct.ac.za/direct/session/new", formdata)
        if(a)
        {
          this.setState({ loggedIn: true })
          this.setState({isLoading:false})
        }
        //console.log('Login Attempt Return: ' + a)

      }
      else
      {
        this.setState({isLoading:false})
      }
    } catch (e) {
      console.log(e)
    }
  }


  render() {
    const loginState = this.state.loggedIn
    const isLoading = this.state.isLoading
    return (
      <Provider store={store}>
        <NavigationContainer>
          <AppScreens loginState={loginState} isLoading={isLoading}/>
          {/* <Drawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Site" component={Site} initialParams={title = 'Home'} />
            <Drawer.Screen name="Loading" component={Loading} />
            <Drawer.Screen name="DocViewer" component={DocViewer} />
          </Drawer.Navigator> */}
        </NavigationContainer>
      </Provider>
    );
  }
} export default App;
