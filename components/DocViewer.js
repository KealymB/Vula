import * as React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { withNavigation } from '@react-navigation/compat';
import PDFReader from 'rn-pdf-reader-js'
import * as WebBrowser from 'expo-web-browser';

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

openFile = () => {
    console.log("opening..")
    WebBrowser.openBrowserAsync(this.props.url);
};



class DocViewer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: props.route.params.url,
      title: props.route.params.title,
    }
  }  
  render() {
    const navigation = this.props
    console.log(this.props.url);
    if (Platform.OS == 'android') {
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
                <Text style={{color:'white', fontSize:15}}>{this.props.title}</Text>
              </View>
            
          </View>
          <View style={{ backgroundColor: 'yellow', flex: 1 }}>
            <PDFReader
              source={{ uri: this.props.url }}
              sharedCookiesEnabled={true}
              thirdPartyCookiesEnabled={true}
            />
            {/* <View style={{backgroundColor: 'red'}}>
        <Button title="Open WebBrowser" onPress={()=>{WebBrowser.openAuthSessionAsync(this.props.url)}} />
        <Text>{this.props.url}</Text>
      </View> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
  else if (Platform.OS == 'ios') {
    return(
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1f4166' }}>
        <View style={{ flex: 1, backgroundColor: 'red' }}>
          <View style={{paddingTop: 25, height: 70, backgroundColor: '#1f4166', flexDirection: 'row', alignContent: 'center' }}>
            <View style={{justifyContent:'flex-start'}}>
              <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                <Text style={{ fontSize: 20, color: 'white', paddingLeft: 10, paddingTop: 10, justifyContent: 'center' }}>
                  Go Back
                  
            </Text>
            </TouchableOpacity>
            </View>
              <View style={{paddingLeft: 30, paddingTop:15}}>
                <Text style={{color:'white', fontSize:15}}>{this.props.title} ios</Text>
              </View>
            
          </View>
          <View style={{flex:1, backgroundColor: 'yellow' }}>
            <WebView
              source={{ uri: this.props.url}}
              sharedCookiesEnabled={true}
              thirdPartyCookiesEnabled={true}
            />
          </View>
        </View>
      </SafeAreaView>

    )
  }
}
}

const mapStateToProps = (state) => {
  return {
      url: state.url,
      title: state.title,
  }
}

export default withNavigation(connect(mapStateToProps)(DocViewer));