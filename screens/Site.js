import * as React from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView} from 'react-native';
import { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Announcements from '../components/Announcements';
import Resources from '../components/Resources';
import Overview from '../components/Overview';

class Site extends Component{
    render(){
      switch (this.props.toolName){
        case 'Announcements':
          return(
            <SafeAreaView style={styles.container}>
              <Header title={this.props.route.params.title} navigation={this.props.navigation}/>
              <Announcements/>
            </SafeAreaView>
          );
        case 'Resources':
          return(
            <SafeAreaView style={styles.container}>
              <Header title={this.props.route.params.title} navigation={this.props.navigation}/>
              <Resources/>
            </SafeAreaView>
          );
        case 'Overview':
          return(
            <SafeAreaView style={styles.container}>
              <Header title={this.props.route.params.title} navigation={this.props.navigation}/>
              <Overview/>
            </SafeAreaView>
          );
        default:
          return(
            <SafeAreaView style={styles.container}>
              <Header title={this.props.route.params.title} navigation={this.props.navigation}/>
              <Announcements/>
            </SafeAreaView>
          );
      }
    }
}
const mapStateToProps = (state) => {
  return {
    toolName: state.toolName,
  }
}
export default connect(mapStateToProps)(Site);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f4166',
    position: 'absolute'
  },
});


