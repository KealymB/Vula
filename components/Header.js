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
        };
      });
      
  })    
  return{
    data
  }
}

class SitesList extends Component {
  state={
    data:[],
    dataS:[],
  }

  async componentDidMount() {
    let a = await makeRequest("https://vula.uct.ac.za/direct/site.json?_limit=100")
    this.setState({data:a.data});
  }

  render(){
    return(
      <View>
        <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.data}
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
    }

    updateSearch = search => {
        this.setState({ search });
        
    };

    async componentDidMount() {
        await Expo.Font.loadAsync({
            Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        });
        let a = await makeRequest("https://vula.uct.ac.za/direct/site.json?_limit=100")
        this.setState({data:a.data});
        console.log(a);
    }
  
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
                <SitesList navigation={this.props.navigation}/>
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
                <SitesList navigation={this.props.navigation}/>
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
      flex:6,
    },
    sb: {
      flex: 1,
      backgroundColor: '#1f4166',
    },
})