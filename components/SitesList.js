import * as React from 'react';
import { AsyncStorage} from 'react-native';
import { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';

class SitesList extends Component {
    render(){
      const { data } = this.props.siteData;
      return(
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item}) =>{
                return(
                <TouchableOpacity style={styles.itemView}>
                    <Button
                        style={{
                            color:'black',
                        }}  
                        onPress={() => {
                            const { navigate } = this.props.navigation;
                            navigate("Site", {title: item.label, siteID:item.key});
                        }} title={item.label}>
                    </Button>
                </TouchableOpacity>
                );}}>
          </FlatList>
        </View>
      );
    }
  }  
  const mapStateToProps = (state) => {
    console.log(state.siteReducer)
    return{
      dataSearched:state.siteReducer
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      search: (query) => dispatch(searchData(query))
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
        marginLeft:2,
        marginRight:2,
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
})