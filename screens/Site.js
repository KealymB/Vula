import * as React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { Component } from 'react';

import SiteSearch from '../components/SiteSearch';

class Site extends Component{
    render(){
      console.log(this.props.route.params.title);
        return(        
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.logoview}>
                <Text style={styles.logo}>
                  {this.props.route.params.title}
                </Text>
              </View>

              <View style={styles.search}>
                <SiteSearch/>
              </View>
            </View>
          </View>
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