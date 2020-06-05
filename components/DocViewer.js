import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import * as Linking from 'expo-linking';
import { withNavigation, getParam, NavigationActions, StackActions } from '@react-navigation/compat'
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
      iconTestPath = FileSystem.documentDirectory + name;
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

class DocViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: props.route.params.url,
      title: props.route.params.title,
    }
    console.log(this.state.url)
  }
  render() {
    const navigation = this.props
    console.log(this.props.url);
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1f4166' }}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 50, backgroundColor: '#1f4166', flexDirection: 'row', alignContent: 'center' }}>
            <View style={{justifyContent:'flex-start'}}>
              <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                <Text style={{ fontSize: 20, color: 'white', paddingLeft: 10, paddingTop: 10, justifyContent: 'center' }}>
                  Go Back
                  
            </Text>
            </TouchableOpacity>
            </View>
              <View style={{paddingLeft: 30, paddingTop:15}}>
                <Text style={{color:'white', fontSize:15}}>{this.state.title}</Text>
              </View>
            
          </View>
          <View style={{ backgroundColor: 'yellow', flex: 1 }}>
            <WebView
              source={{ uri: this.state.url }}
              sharedCookiesEnabled={true}
              thirdPartyCookiesEnabled={true}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default withNavigation(DocViewer);