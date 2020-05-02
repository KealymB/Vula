import * as React from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView} from 'react-native';
import { Component } from 'react';

import Header from '../components/Header';

async function makeRequest(path) {
  let response = await fetch(path, {
    method: 'GET',
    headers: { 
      'User': 'react-native',
      'Connection': 'keep-alive',
    }
  }).then((response) => response.json())
    .then(text => {
      data = text.site_collection.map(function(item) {
        return {
          key: item.id,
          label: item.title,
        };
      });
      
  })    
  return{
    data
  }
}

class Site extends Component{

    render(){
      return(
        <SafeAreaView style={styles.container}>
        <Header title={this.props.route.params.title} navigation={this.props.navigation}/>
        </SafeAreaView>
      );
    }
} export default Site;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1f4166',
    },
    logoview:{
      flex:2,
    },
    logo:{
      fontWeight:"bold",
      fontSize:30,
      color:"#f8f8f8",
    },
    search:{
      flex:4,
    },
    header:{
      marginTop:20,
      flexDirection: 'row',
    }
})