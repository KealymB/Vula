import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import Collapsible from 'react-native-collapsible';


async function download (url, name) {

}

class Accordion extends Component {
    state = {
        collapsed: true,
    };

    toggleExpanded = (url, type, name) => {
        if(type == 'collection'){
            this.setState({ collapsed: !this.state.collapsed });
        }else{
            download(url, type);
        }
        
    };



    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>{this.toggleExpanded(this.props.url, this.props.type, this.props.title)}}>
                    <Text style={this.state.collapsed ? styles.titleclosed : styles.titleopen}>{this.props.title}</Text>
                    <Collapsible collapsed={this.state.collapsed}>
                        {this.props.content}
                    </Collapsible>
                </TouchableOpacity>
            </View>
        );
    }
}
export default Accordion;

const styles = StyleSheet.create({
    titleopen: {
        color:'white'
    },
    titleclosed: {
        color:'black'
    }
})