import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button} from 'react-native';
import {WebView} from 'react-native-webview';
import * as Linking from 'expo-linking';

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

class DocViewer extends Component {
    render() {
        console.log(this.props.url);
        return (
            <View>
                <WebView source={{ uri: 'https://vula.uct.ac.za/access/content/group/4525ef7b-8431-46b1-bd92-2fb0687c2dcb/Week%202%20-%2026%20July/RD1_Wk2%20Held.D_The%20Great%20Globalization%20Debate.pdf'}}/>
            </View>
        );
    }
}
export default DocViewer;