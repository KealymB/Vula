import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Component } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';


const screenWidth = Math.round(Dimensions.get('window').width); //used to set content width
const screenHeight = Math.round(Dimensions.get('window').height); //used to set content height
const removeHeader = 'const elements = document.getElementsByClassName("Mrphs-header"); while (elements.length > 0) elements[0].remove();'
//<WebView source={{ uri: this.props.url}} sharedCookiesEnabled={true} thirdPartyCookiesEnabled={true}/>

class PostEm extends Component {
    
    render() {
        var url = 'https://vula.uct.ac.za/portal/site/'+this.props.currSite.key+'/tool/'+this.props.toolID
        return (
            <View style={styles.container}>
                <WebView source={{ uri: url}} 
                style={styles.view} 
                sharedCookiesEnabled={true} 
                thirdPartyCookiesEnabled={true}
                javaScriptEnabled={true}
                scalesPageToFit={false}
                injectedJavaScript={'function hideHead(){const elements = document.getElementsByClassName("Mrphs-topHeader"); while (elements.length > 0) elements[0].remove();};hideHead();'} 
                />
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
        backgroundColor: '#2e6299',
    },
    view: {
        height:screenHeight-120,
        width: screenWidth,
      }
})