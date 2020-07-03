import * as React from 'react';
import { View, StyleSheet, Text, Button, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Component } from 'react';
import { connect } from 'react-redux';

import { setTool } from '../actions/data';
  
var arr=[]
var elements=[];
var sites =['Announcements', 'Resources', 'Gradebook', 'PostEm', 'Assignments', 'Drop Box'];

function itemRender(item, nav, props) {
  return(
    <TouchableOpacity
        onPress={() => {
          props.setTool(item.id,item.title);
          nav.closeDrawer();
        }} 
        key={item.key}>
          <Text style={{color:(props.toolName==item.title) ? 'white' : 'black', fontSize:20, paddingBottom:5}} numberOfLines={1}>
            {item.title}
          </Text>
    </TouchableOpacity>
  );
}

class SideBar extends Component {
    render(){  
      return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoview}>
              <Text style={styles.logo}>
                Tools 
              </Text>
            </View>

            <View
              style={{
                marginTop:10,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
              }}
            />
            <View style={styles.cont}>
              <FlatList
                contentContainerStyle={{flexGrow: 1, alignItems: 'flex-start',}}
                data={this.props.currSite.tools}
                renderItem={({item}) =>itemRender(item, this.props.navigation, this.props, this.pressed)}
                keyExtractor={item => item.id}
                extraData={this.props.toolName}
                showsVerticalScrollIndicator={false}>
              </FlatList>
            </View>
        </SafeAreaView>
      );
    }
}  

const mapStateToProps = (state) => {
  return{
    currSite:state.currSite,
    toolID:state.toolID,
    toolName:state.toolName
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTool: (curTool,name) => dispatch(setTool(curTool,name))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SideBar, itemRender);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e6299',
  },
  cont: {
    flex: 1,
    backgroundColor: '#2e6299',
    alignItems: 'flex-start',
    marginLeft:10,
  },
  itemView:{
    backgroundColor: "#2e6299",
    borderRadius:10,
  },    
  logoview:{
    marginLeft:15,
    marginTop:10,
  },
  logo:{
    fontWeight:"bold",
    fontSize:30,
    color:"#f8f8f8",
  },
})