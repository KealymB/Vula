import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, } from 'react-native';
import Collapsible from 'react-native-collapsible';
<<<<<<< HEAD
import * as FileSystem from 'expo-file-system';


async function download(url, name) {
    console.log(url)
    try {
        await FileSystem.makeDirectoryAsync(
            FileSystem.documentDirectory,
            {
                intermediates: true
            }
        )
    } catch (e) {
        console.log(e)
    }

    await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + name
    )
        .then(({ uri }) => {
            console.log('Finished downloading to:', uri);
        })
        .catch(error => {
            console.error(error);
        });

    try {
        console.log(await FileSystem.getInfoAsync(FileSystem.documentDirectory + name))
    } catch (e) {
        console.log(e)
    }
}
=======
import DocViewer from './DocViewer';
>>>>>>> ffdee18d155aeaa2e95308e6e272bd61c95348ea

class Accordion extends Component {
    state = {
        collapsed: true,
        docView: false,
    };

<<<<<<< HEAD
    toggleExpanded = (url, type, name) => {
        if (type == 'collection') {
            this.setState({ collapsed: !this.state.collapsed });
        } else {
            download(url, name);
=======
    toggleExpanded = (type) => {
        if(type == 'collection'){
            this.setState({ collapsed: !this.state.collapsed });
        }else{
          this.setState({ collapsed: this.state.collapsed, docView: true });
>>>>>>> ffdee18d155aeaa2e95308e6e272bd61c95348ea
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
<<<<<<< HEAD
                <TouchableOpacity onPress={() => { this.toggleExpanded(this.props.url, this.props.type, this.props.title)}}>
=======
                <TouchableOpacity onPress={()=>{this.toggleExpanded( this.props.type)}}>
>>>>>>> ffdee18d155aeaa2e95308e6e272bd61c95348ea
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
        color: 'white',
        fontSize: 30,
    },
    titleclosed: {
        color: 'black',
        fontSize: 20,
        paddingLeft: 15
    }
})