import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import Collapsible from 'react-native-collapsible';
import DocViewer from './DocViewer';
import { withNavigation} from '@react-navigation/compat'

class Accordion extends Component {
    state = {
        collapsed: true,
        docView: false,
    };
    
    toggleExpanded = (type) => {
        if(type == 'collection'){
            this.setState({ collapsed: !this.state.collapsed });
        }else{
            console.log('setting docview')
          this.setState({ collapsed: this.state.collapsed, docView: true });
          this.props.navigation.navigate('DocViewer', 
          {
              url: this.props.url,
              title: this.props.title
          })
        }
    };
    render() {
    //   switch (this.state.docView){
    //     case true:
    //       return (
              
    //         <View style={{flex:1}}>
    //             <DocViewer url={this.props.url} name={this.props.title}/>
    //         </View>
    //     );
    //     default:
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
export default withNavigation(Accordion);

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