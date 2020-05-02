import * as React from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView} from 'react-native';
import { Component } from 'react';

import Header from '../components/Header';

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
});


