import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Component } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';


//<WebView source={{ uri: this.props.url}} sharedCookiesEnabled={true} thirdPartyCookiesEnabled={true}/>

class PostEm extends Component {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        grades: state.grades,
    }
}


export default connect(mapStateToProps)(PostEm);


const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#1f4166'
    },
    gradeItem:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#BFBFBF',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    gradeItemLeft:
    {
        flex: 7,
    },
    gradeItemRight:
    {
        flex: 3,
        alignItems: 'flex-end',
        paddingRight: 20,
        borderLeftWidth: 1,
        borderLeftColor: '#BFBFBF'
    },
    gradeTitleText:
    {
        fontSize: 25,
        color: '#34393b'
    },
    gradeText:
    {
        fontSize: 20,
        color: '#34393b',
    },
})