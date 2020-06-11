import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { connect } from 'react-redux';
import { withNavigation} from '@react-navigation/compat'

import { setUrl } from '../actions/data';
import Icon from 'react-native-vector-icons/Ionicons';

class Accordion extends Component {
    state = {
        collapsed: true,
        docView: false,
    };

    async componentDidMount() {
        await Expo.Font.loadAsync({
          Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        });
    }
    
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
            <View >
                <TouchableOpacity onPress={()=>{this.toggleExpanded( this.props.type)}}>
                    <View style={styles.header}>
                        <Text style={this.state.collapsed ? styles.titleclosed : styles.titleopen}>
                            {this.props.title}
                        </Text>
                        {this.state.collapsed ? <Icon name="md-folder" size={18} style={styles.icons} /> : <Icon name="md-folder-open" size={18}  style={styles.icons}/>}
                    </View>

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
        color:'black',
        fontSize: 25,
        paddingLeft: 15,
        borderRadius:5,
        backgroundColor:'white',
    },
    titleclosed: {
        color:'black',
        fontSize:20,
        paddingLeft: 15,
    },
    container:{
        borderRadius:5,
        backgroundColor:'white',
        paddingRight:5,
        paddingRight:5,
    },
    header:{
        backgroundColor:'white',
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    icons: {
        paddingRight:5,
    }
})