import React, {Component} from 'react';
import { View, Image, Text } from 'react-native';

const Logo = require('../assets/VulaLogo.png')
class SplashScreen extends Component {
    state = {  }
    render() {
        return (
            <View style={{backgroundColor:'#2e6299', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            {/* <Image source={Logo} style={{height: 300, width: 300}} /> */}
            <Text style={{fontSize: 100}}>
                Splash Needs to go here!
            </Text>
            </View>
            
        );
    }
}

export default SplashScreen;