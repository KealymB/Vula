import * as React from 'react';
import { View, StyleSheet, Text, Button, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Component } from 'react';
import { connect } from 'react-redux';
//import Icon from 'react-native-vector-icons/Ionicons';
import { Icon } from 'react-native-elements'
import { setTool } from '../actions/data';
import * as SecureStore from 'expo-secure-store';
var arr=[]
var elements=[];
var sites =['Announcements', 'Resources', 'Gradebook', 'PostEm', 'Assignments', 'Drop Box'];
var icons = {
  Announcements: "bullhorn",
  Resources: "folder-open",
  Assignments: "file-text",
  Gradebook : "book",
  Participants: "group",
  Chatroom: "comments-alt",
  "Drop Box": "exchange"
};
function itemRender(item, nav, props) {
  return(
    <TouchableOpacity
        onPress={() => {
          props.setTool(item.id,item.title);
          nav.closeDrawer();
        }} 
        key={item.key}>
        <View style={{width: 280, backgroundColor:(props.toolName==item.title) ? '#21558C' : '#2e6299', flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
        <Icon name={icons[item.title]}  type='font-awesome' size={22} style={{paddingLeft: 20}} color={'black'} />
        <Text style={{color:(props.toolName==item.title) ? 'white' : 'black', fontSize:25, paddingBottom:10, paddingLeft: 15, paddingTop: 10}} numberOfLines={1}>
            {item.title}
          </Text>
          </View>
    </TouchableOpacity>
  );
}

async function clearData()
{
  await SecureStore.deleteItemAsync('userData')

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
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                bounces={false}>
                
              </FlatList>
              <TouchableOpacity onPress={()=> {clearData(); alert('Please refresh the app')}}> 
              <View style={{backgroundColor: 'rgba(255,255,255, 0.3)', width: 280, justifyContent: 'center', paddingLeft: 20, height: 40}}>
                <Text style={{fontSize: 25}}>Logout</Text>
              </View>
              </TouchableOpacity>
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
    width: 280 //constant. Could maybe be variable based on screen size?
  },
  cont: {
    flex: 1,
    backgroundColor: '#2e6299',
    alignItems: 'flex-start',
    paddingTop: 10

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