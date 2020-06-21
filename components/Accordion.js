import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { connect } from 'react-redux';
import { withNavigation} from '@react-navigation/compat'

import { setUrl } from '../actions/data';
import Icon from 'react-native-vector-icons/Ionicons';

//count number of / to determine the positions in file... or use states adding to each other

const screenWidth = Math.round(Dimensions.get('window').width); //used to set content widt

class Accordion extends Component {
    state = {
        collapsed: true,
        docView: false,
        open: '',
        closed: '',
        space: 0,
    };

    async componentDidMount() {
        await Expo.Font.loadAsync({
          Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        });
        
        if(this.props.type == 'collection'){
            this.setState({open: 'md-folder-open'})
            this.setState({closed: 'md-folder'})
        }else{
            this.setState({open: 'md-attach'})
            this.setState({closed: 'md-attach'})
        }

        this.setState({space:this.props.url.split("/").length - 9})
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
            <View>
                <TouchableOpacity onPress={()=>{this.toggleExpanded( this.props.type)}} style={styles.container}>
                    <View style={this.state.collapsed ? styles.wrapperOpen : styles.wrapperClosed}>
                        <View style={styles.header}>
                            <Text style={this.state.collapsed ? styles.titleclosed : styles.titleopen} numberOfLines={2}>
                                {this.props.title}
                            </Text>

                            {this.state.collapsed ? <Icon name={this.state.closed} size={18} style={styles.icons} /> : <Icon name={this.state.open} size={18}  style={styles.icons}/>}
                        </View>

                        <Collapsible collapsed={this.state.collapsed} style={styles.content}>
                            {this.props.content}
                        </Collapsible>
                    </View>
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
        marginLeft: 15,
        borderRadius:5,
        maxWidth:screenWidth-90
    },
    titleclosed: {
        color:'black',
        fontSize:25,
        marginLeft: 15,
        maxWidth:screenWidth-90
    },
    container:{
        marginTop:10,

        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        marginLeft:5,
        marginRight:5,
        
        elevation: 4,
        zIndex:999,  
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:60,
    },
    wrapperOpen:{
        backgroundColor:'white',
        borderRadius:5,
    },
    wrapperClosed:{
        backgroundColor:'#b5b5b5',
        borderRadius:5,
    },
    icons: {
        paddingRight:5,
    },
    content:{
        marginBottom:5,
        backgroundColor:'#e8e8e8',
        borderRadius:5,
        paddingBottom:5,
    }
})