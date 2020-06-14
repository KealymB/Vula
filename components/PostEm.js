import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Component } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';


const screenWidth = Math.round(Dimensions.get('window').width); //used to set content width
const screenHeight = Math.round(Dimensions.get('window').height); //used to set content height

//<WebView source={{ uri: this.props.url}} sharedCookiesEnabled={true} thirdPartyCookiesEnabled={true}/>

class PostEm extends Component {
    render() {
        var url = 'https://vula.uct.ac.za/portal/site/'+this.props.currSite.key+'/tool/'+this.props.toolID
        return (
            <View style={styles.container}>
                <WebView source={{ uri: url}} style={styles.view} sharedCookiesEnabled={true} thirdPartyCookiesEnabled={true}/>
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        currSite: state.currSite,
        toolID: state.toolID,
    }
}


export default connect(mapStateToProps)(PostEm);


const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#1f4166'
    },
    view: {
        height:screenHeight-120,
        width: screenWidth,
      }
})