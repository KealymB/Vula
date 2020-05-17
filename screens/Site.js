import * as React from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView} from 'react-native';
import { Component } from 'react';

import Header from '../components/Header';
import Announcements from '../components/Announcements';

class Site extends Component{
    render(){
      return(
        <SafeAreaView style={styles.container}>
          <Header title={this.props.route.params.title} navigation={this.props.navigation}/>
          <Announcements/>
        </SafeAreaView>
      );
    }
} export default Site;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f4166',
    position: 'absolute'
  },
});


