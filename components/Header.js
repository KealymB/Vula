import * as React from 'react';
import { AsyncStorage} from 'react-native';
import { Component } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Button, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';

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

class SitesList extends Component {
  render(){
    const { data } = this.props.data;
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

class Header extends Component{  
    state={
        search: '',
        searching:false,
        data:[],
        dataSearched:[],
    }

    async componentDidMount() {
      await Expo.Font.loadAsync({
        Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
      });

      let a = await makeRequest("https://vula.uct.ac.za/direct/site.json?_limit=100")

      this.setState({data:a.data});
      this.setState({dataSearched:a.data});
    }

    updateSearch = search => {
        this.setState({ search });
        const formatQuery = search.toLowerCase();
        this.setState(dataSearched=_.filter(this.state.data, item =>
          {
            return contains(item.toLowerCase(), formatQuery);
          }));
    };

      render(){ 
        const { search } = this.state;
        if(this.state.searching){
          return(
            <View style={styles.container}>
              <View style={styles.searchbar}>
                <SearchBar         
                  placeholder="Search Sites:"
                  onChangeText={this.updateSearch}
                  value={search}
                  onClear={()=>this.setState({ searching:false })}
                  showCancel={true}/>
              </View>
  
              <View style={styles.sites}>
                <SitesList navigation={this.props.navigation} data={this.state.dataSearched}/>
              </View>
            </View>
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
                <SitesList navigation={this.props.navigation} data={this.state.dataSearched}/>
              </View>
            </View>
          );
        }
      }
  } export default Header;

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