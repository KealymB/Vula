import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Button, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import { setSite } from '../actions/data';
import { setSearch } from '../actions/data';
import { setTool } from '../actions/data';
import { clearData } from '../actions/data';

const sites = ['Announcements', 'Resources', 'Gradebook', 'PostEm', 'Assignments', 'Drop Box']

class SitesList extends Component {
    render(){
      return(
        <View>
          <FlatList
          style={{ borderBottomLeftRadius:10, borderBottomRightRadius:10 }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.props.dataSearched.siteData}
            renderItem={({item}) =>{
                return(
                <TouchableOpacity 
                  style={styles.itemView}
                  onPress={() => {
                    var test={
                      key:item.key,
                      label:item.label,
                      tools:item.tools.filter((point)=>{
                        var flag = false;
                        sites.forEach((site)=>{
                          if(site == point.title){
                            flag = true;
                          }
                        })
                        return flag;
                      })
                    }
                    this.props.setSite(test)
                    const { navigate } = this.props.navigation;
                    navigate("Site", {title: item.label, siteID:item.key});
                    this.props.setSearch(false);
                    this.props.clearData();
                }}>
                  <Text style={styles.itemText}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
                );}}
            keyExtractor={item => item.key}>
          </FlatList>
        </View>
      );
    }
  }  
  const mapStateToProps = (state) => {
    return{
      dataSearched:state,
    }
  }
  
const mapDispatchToProps = (dispatch) => {
  return {
    setSite: (curSite) => dispatch(setSite(curSite)),
    setTool: (curTool) => dispatch(setTool(curTool)),
    setSearch: (data) => dispatch(setSearch(data)),
    clearData: () => dispatch(clearData()),
  }
}
  export default connect(mapStateToProps, mapDispatchToProps)(SitesList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f4166',
  },
  logoview:{
    flex:5,
    marginLeft:5,
  },
  logo:{
    fontWeight:"bold",
    fontSize:30,
    color:"#f8f8f8",
  },
  search:{
    flex:1,
  },
  header:{
    marginTop:20,
    flexDirection: 'row',
  },
  sites:{
    marginTop:5,
  },
  itemView:{
      backgroundColor: "#f8f8f8",
      borderRadius:10,
      marginRight:5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      height:40,

      elevation: 4,
      margin:5,
      marginBottom:10,
      justifyContent:'center'
  },
  itemText:{
      fontSize:20,
      padding:2,
      color:'black',
  },
  searchbar:{
    marginTop:20,
    flex:1,
  },
  sb: {
    flex: 1,
    backgroundColor: '#1f4166',
  },
})