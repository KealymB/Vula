import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import Collapsible from 'react-native-collapsible';
import DocViewer from './DocViewer';

class Accordion extends Component {
    state = {
        collapsed: true,
        docView: false,
    };

    toggleExpanded = (type) => {
        if(type == 'collection'){
            this.setState({ collapsed: !this.state.collapsed });
        }else{
          this.setState({ collapsed: this.state.collapsed, docView: true });
        }
    };

    render() {
      switch (this.state.docView){
        case true:
          return (
            <View>
                <DocViewer url={this.props.url} name={this.props.title}/>
            </View>
        );
        default:
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
    }
}
export default Accordion;

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