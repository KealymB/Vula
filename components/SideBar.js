import * as React from 'react';
import { View, StyleSheet, Text, Button} from 'react-native';
import { Component } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { connect } from 'react-redux';
  
var arr=[]
var elements=[];

function Side(data) {
  
  if(data.data.length>0){console.log(data.data[0].tools);arr=data.data[0].tools}
    for(var i=0;i<arr.length;i++){
      console.log("here")
      elements.push(
        <DrawerItem 
        key={i.toString()}
        label={ arr[i].title } 
        onPress={() => Linking.openUrl('https://mywebsite.com/help')
      }/>
    );
  }
    return (
      <DrawerContentScrollView>
        {elements}
      </DrawerContentScrollView>
    );
  }

class SideBar extends Component {
    render(){
        return(
          <Side data={this.props.dataSearched.siteData}/>
        );
    }
}  

const mapStateToProps = (state) => {
  return{
    dataSearched:state
  }
}

export default connect(mapStateToProps)(SideBar);