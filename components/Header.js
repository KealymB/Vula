import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import Icon from 'react-native-vector-icons/Ionicons';
import SitesList from './SitesList';
import { addData } from '../actions/data';
import { searchData } from '../actions/data';

async function makeRequest(path) {
  let response = await fetch(path, {
    method: 'GET',
    headers: { 
      'User': 'react-native',
      'Connection': 'keep-alive',
    }
  }).then((response) => response.json())
    .then(text => {
      data = text.site_collection.map(function(item) {
        return {
          key: item.id,
          label: item.title,
          tools: item.sitePages,
        };
      });
      
  })    
  return{
    data
  }
}

class Header extends Component{  
    state={
        search: '',
        searching:false,
        loading: true,
    }

    async componentDidMount() {
      await Expo.Font.loadAsync({
        Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
      });

<<<<<<< HEAD
      let a = await makeRequest("https://vula.uct.ac.za/direct/site.json?_limit=100")
      
      this.props.add(a.data);//passes props to redux
      console.log(this.props.dataSearched);
=======
      let a = await makeRequest("https://vula.uct.ac.za/direct/site.json?_limit=30")
      
      this.props.add(a.data);//passes props to redux
      this.setState({loading:false})
>>>>>>> 0d5ff60ece55e1e7517a8c2526a0ce1584682d3f
    }

    updateSearch = search => {
        this.setState({ search });
        const formatQuery = search.toLowerCase();
        this.props.search(formatQuery);
    };
    render(){ 
      const { search } = this.state;
      if(this.state.searching){
        return(
<<<<<<< HEAD
          <View style={styles.container}>
            <View style={styles.searchbar}>
              <SearchBar         
=======
          
          <View style={styles.container}>
            <View style={styles.searchbar}>
              <SearchBar
                lightTheme 
                round        
>>>>>>> 0d5ff60ece55e1e7517a8c2526a0ce1584682d3f
                placeholder="Search Sites:"
                onChangeText={this.updateSearch}
                value={search}
                onClear={()=>this.setState({ searching:false })}
<<<<<<< HEAD
=======
                autoCapitalize={'characters'}
>>>>>>> 0d5ff60ece55e1e7517a8c2526a0ce1584682d3f
                showCancel={true}/>
            </View>

            <View style={styles.sites}>
              <SitesList navigation={this.props.navigation}/>
            </View>
          </View>
<<<<<<< HEAD
=======

>>>>>>> 0d5ff60ece55e1e7517a8c2526a0ce1584682d3f
        );
      }else{
        return(
          <View style={styles.sb}>
            <View style={styles.header}>
              <View style={styles.logoview}>
                <Text style={styles.logo}>
                  {this.props.title}
                </Text>
              </View>

              <View style={styles.search}>
                <TouchableOpacity onPress={()=>{this.setState({ searching:true })}}>
                    <Icon name="ios-search" size={32}/>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sites}>
              <SitesList navigation={this.props.navigation}/>
            </View>
<<<<<<< HEAD
=======
            <View style={styles.bottomBorder}>
            
            </View>
>>>>>>> 0d5ff60ece55e1e7517a8c2526a0ce1584682d3f
          </View>
        );
      }
    }
  } 
  const mapStateToProps = (state) => {
    return{
      dataSearched:state
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      search: (query) => dispatch(searchData(query)),
      add: (data) => dispatch(addData(data))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Header);

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
    },
    sb: {
      flex: 1,
      backgroundColor: '#1f4166',
    },
    searchText: {
      fontSize: 20,
      fontWeight: "bold",
      textTransform: 'uppercase'

    },
    bottomBorder: {
      marginTop: 10,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    }
})