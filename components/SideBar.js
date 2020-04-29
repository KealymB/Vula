import * as React from 'react';
import { View, StyleSheet, Text, Button} from 'react-native';
import { Component } from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
  

var arr=["one", "two", "three", "four"]; //need to replace with site tools
var elements=[];

function Side(props) {
    for(var i=0;i<arr.length;i++){
      elements.push(
        <DrawerItem 
        key={i.toString()}
        label={ arr[i] } 
        onPress={() => Linking.openUrl('https://mywebsite.com/help')
      }/>
    );
  }
    return (
      <DrawerContentScrollView {...props}>
        {elements}
      </DrawerContentScrollView>
    );
  }

class SideBar extends Component {
    render(){
        return(
            <View>

            </View>
        );
    }
}export default SideBar;