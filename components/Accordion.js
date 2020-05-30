import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import Collapsible from 'react-native-collapsible';
import * as FileSystem from 'expo-file-system';


async function download (url, name) {
    const testurl = 'https://vula.uct.ac.za/access/content/group/4525ef7b-8431-46b1-bd92-2fb0687c2dcb/Week%208%20-%2013%20Septembr/Making%20Popular%20Culture%20in%20Urban%20Africa.pdf'
    const testurl2 = 'https://vula.uct.ac.za/access/content/group/67e29053-f714-412c-bee8-e0f0ba062a85/studentadmin_aca09.pdf'

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
        testurl2,
        FileSystem.documentDirectory+'test.pdf'
      )
        .then(({ uri }) => {
          console.log('Finished downloading to ', uri);
          iconTestPath=FileSystem.documentDirectory+'test.pdf';
           iconTestPath
          console.log(iconTestPath)
        //   console.log(iconTestPath);
        //   console.log({uri:iconTestPath});
        //   console.log(Boolean({iconTestPath}.exists));
        })
        .catch(error => {
          console.error(error);
      });
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
        color:'white'
    },
    titleclosed: {
        color:'black'
    }
})