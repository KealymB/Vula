import * as React from 'react';
import { Component } from 'react';
import { View, FlatList, TouchableOpacity, Button} from 'react-native';
import { WebView } from 'react-native-webview';


class AnnouncmentView extends Component {
     render() {
        return (
            <WebView
            originWhitelist={['*']}
            source={{ html: '<h1>Hello world</h1>' }}
          />
        );
    }
}

export default (AnnouncmentView);


