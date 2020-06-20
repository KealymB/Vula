import * as React from 'react';
import { StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import Resources from '../components/Resources';
import Overview from '../components/Overview';
import AnnouncementAccordionSite from '../components/AnnouncementAccordionSite'
import AnnouncementAccordion from '../components/AnnouncementAccordion'
import Gradebook from '../components/Gradebook'
import PostEm from '../components/PostEm'

const screenWidth = Math.round(Dimensions.get('window').width); //used to set content width

class Site extends Component{
    render(){
      switch (this.props.toolName){
        case 'Announcements':
          return(
            <SafeAreaView style={styles.container}>
              <Header title={this.props.route.params.title} navigation={this.props.navigation}/>
              <AnnouncementAccordionSite/>
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
        case 'Gradebook':
          return(
            <SafeAreaView style={styles.container}>
              <Header title={this.props.route.params.title} navigation={this.props.navigation}/>
              <Gradebook navigation={this.props.navigation}/>
            </SafeAreaView>
          );
        case 'PostEm':
          return(
            <SafeAreaView style={styles.container}>
              <Header title={this.props.route.params.title} navigation={this.props.navigation}/>
              <PostEm/>
            </SafeAreaView>
          );
        default:
          return(
            <SafeAreaView style={styles.container}>
              <Header title={this.props.route.params.title} navigation={this.props.navigation}/>
              <AnnouncementAccordion/>
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
    flex:1,
    backgroundColor: '#2e6299',
    position:'absolute',
    minWidth:screenWidth,
  }
});


