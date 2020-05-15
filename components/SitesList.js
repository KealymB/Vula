import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { setSite } from '../actions/data';

class SitesList extends Component {
    render(){
      return(
        <View style={styles.marg}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.props.dataSearched.siteData}
            renderItem={({item}) =>{
                return(
                <TouchableOpacity style={styles.itemView}>
                    <Button
                        color='black'
                        onPress={() => {
                            this.props.setSite(item)
                            const { navigate } = this.props.navigation;
                            navigate("Site", {title: item.label, siteID:item.key});
                        }} title={item.label}>
                    </Button>
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
      dataSearched:state
    }
  }
  
const mapDispatchToProps = (dispatch) => {
  return {
    setSite: (curSite) => dispatch(setSite(curSite)),
    setTool: (curTool) => dispatch(setTool(curTool))
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
  },
  itemText:{
      fontSize:15,
      padding:2,
  },
  searchbar:{
    marginTop:20,
    flex:1,
  },
  sb: {
    flex: 1,
    backgroundColor: '#1f4166',
  },
  marg:{
    marginLeft:10,
    marginRight:10,
  },
})