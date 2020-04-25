import * as React from 'react';
import { View, StyleSheet} from 'react-native';
import { Component } from 'react';

class Site extends Component{
    render(){
        return(        
            <View>
            </View>
        );
    }
} export default Site;

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