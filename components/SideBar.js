import * as React from 'react';
import { View, StyleSheet, Text, Button, FlatList, SafeAreaView} from 'react-native';
import { Component } from 'react';
import { connect } from 'react-redux';

import { setTool } from '../actions/data';
  
var arr=[]
var elements=[];

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
                renderItem={({item}) =>{
                    return(
                      <Button
                          color='black'
                          onPress={() => {
                            this.props.setTool(item.id,item.title);
                            this.props.navigation.closeDrawer();
                          }} 
                          title={item.title}
                          key={item.key}>
                      </Button>
                    );}}
                keyExtractor={item => item.id}>
              </FlatList>
            </View>
        </SafeAreaView>
      );
    }
}  

const mapStateToProps = (state) => {
  return{
    currSite:state.currSite,
    toolID:state.toolID
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setTool: (curTool,name) => dispatch(setTool(curTool,name))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SideBar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f4166',
  },
  cont: {
    flex: 1,
    backgroundColor: '#1f4166',
    alignItems: 'flex-start',
    marginLeft:10,
  },
  itemView:{
    backgroundColor: "#f8f8f8",
    borderRadius:10,
    marginRight:5,
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