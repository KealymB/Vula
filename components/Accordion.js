import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as FileSystem from 'expo-file-system';


async function download (url, name) {
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
        FileSystem.documentDirectory+name
      )
        .then(({ uri }) => {
          console.log('Finished downloading to:', uri);
          iconTestPath=FileSystem.documentDirectory+name;
        })
        .catch(error => {
          console.error(error);
      });

      try {
        console.log(await FileSystem.getInfoAsync(FileSystem.documentDirectory+name))
      } catch (e) {
        console.log(e)
      }
}

class Accordion extends Component {
    state = {
        collapsed: true,
    };

    toggleExpanded = (url, type, name) => {
        if(type == 'collection'){
            this.setState({ collapsed: !this.state.collapsed });
        }else{
            download(url, name);
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
        color:'white',
        fontSize: 30,
    },
    titleclosed: {
        color:'black',
        fontSize:20,
        paddingLeft: 15
    }
})