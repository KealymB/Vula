import * as React from 'react';
import { View, StyleSheet, Text, Button} from 'react-native';
import { Component } from 'react';

import Header from '../components/Header';

class Site extends Component{

    render(){
      return(
        <Header title={this.props.route.params.title} navigation={this.props.navigation}/>
      );
    }
} export default Site;