import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AsyncStorage } from 'react-native';
let CookieManager = require("@react-native-community/cookies");
var FormData = require('form-data')


const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake fordev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
});

export default function App() {
  let formdata = new FormData();
    formdata.append('_username', 'USERNAME')
    formdata.append('_password', 'PASSWORD')

    CookieManager.clearAll()
      .then((res) => {
        console.log('CookieManager.clearAll =>', res);
      });

    function makeRequest(path, params) {
      fetch(path, {
        method: 'POST',
        headers: {
          'User-Agent': 'react-native',
          'Connection': 'keep-alive'
        },
        body: params
      }).then((response) => response.headers['map']['set-cookie']).then(cookie => {
        AsyncStorage.setItem('cookie', JSON.stringify(cookie))
      }).catch(err => {
        console.log(err)
      })


    }

    async function get() {
      let a = await makeRequest("https://vula.uct.ac.za/direct/session/new", formdata)
      let cookie = await AsyncStorage.getItem('cookie')
      alert('Cookie: ' + cookie)
    }

    get()
  

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native!</Text>
      <Text style={styles.instructions}>To get started, edit App.js</Text>
      <Text style={styles.instructions}>{instructions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
