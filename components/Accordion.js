import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { connect } from 'react-redux';
import { withNavigation} from '@react-navigation/compat'

import { setUrl } from '../actions/data';

class Accordion extends Component {
    state = {
        collapsed: true,
        docView: false,
    };
    
    toggleExpanded = (type) => {
        if(type == 'collection'){
            this.setState({ collapsed: !this.state.collapsed });
        }else{
            this.props.setUrl(this.props.url, this.props.title)
            this.setState({ collapsed: this.state.collapsed, docView: true });
            this.props.navigation.navigate('DocViewer', 
            {
                url: this.props.url,
                title: this.props.title
            })
        }
    };
    render() {
          return (            
            <View>
                <TouchableOpacity onPress={()=>{this.toggleExpanded( this.props.type)}}>
                    <Text style={this.state.collapsed ? styles.titleclosed : styles.titleopen}>{this.props.title}</Text>
                    <Collapsible collapsed={this.state.collapsed}>
                        {this.props.content}
                    </Collapsible>
                </TouchableOpacity>
            </View>
        );
      }
    //}
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUrl: (url, title) => dispatch(setUrl(url, title))
    }
}

export default withNavigation(connect(null, mapDispatchToProps)(Accordion));

const styles = StyleSheet.create({
    titleopen: {
        color:'white',
        fontSize: 30,
    },
    titleclosed: {
        color:'black',
        fontSize:20,
        paddingLeft: 15
    }
})