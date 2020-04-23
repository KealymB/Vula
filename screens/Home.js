import * as React from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import { Component } from 'react';
import { AsyncStorage} from 'react-native';

async function makeRequest(path, params) {
  let cookie = await AsyncStorage.getItem('cookie');
  let id = (JSON.stringify(cookie).slice(3,59));

  console.log('session id:'+id)

  let response = await fetch(path, {
    credentials: 'include',
    method: 'GET',
    headers: {
      'User': 'react-native',
      'Connection': 'keep-alive',
    }
  }).then((response) => (response).json())
  .then(text => {
    var data = text.site_collection.map(function(item) {
      return {
        key: item.id,
        label: item.title
      };
    });

    console.log(data)
  })
}

async function get() {
  let a = await makeRequest("https://vula.uct.ac.za/direct/site.json?_limit=100")
  let cookie = await AsyncStorage.getItem('cookie');
  console.log('init cookie:' + cookie)
}

class Home extends Component{
    componentDidMount() {
      get();
      console.log('ran this');
    }

    render(){
        return(        
            <View>
            </View>
        );
    }
} export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1f4166',
      alignItems: 'center',
    },  
    
    inputView:{
      width:"80%",
      backgroundColor:"#465881",
      borderRadius:25,
      height:65,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#f8f8f8",
      marginBottom:40,
      marginTop:40
    },
})