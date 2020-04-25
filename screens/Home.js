import * as React from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import { Component } from 'react';
import { AsyncStorage} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';

var data;

async function makeRequest(path) {
  let cookie = await AsyncStorage.getItem('cookie');
  let id = (JSON.stringify(cookie).slice(3,59));

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
          label: item.title
        };
      });
      console.log(data);
  })    
  return{
    data
  }
}

class Home extends Component{
  state = {
    search: '',
  };
  
  updateSearch = search => {
    this.setState({ search });
  };

    componentDidMount() {
      Get(this.props);

      async function Get(props) {
        let a = await makeRequest("https://vula.uct.ac.za/direct/site.json?_limit=100")
        var i;
        for (i = 0; i < (a).data.length; i++) {
          console.log((a).data[i].key)
        }
      }
    }

    render(){
      const { search } = this.state;
        return(        
            <View>
               <SearchBar
                  placeholder="Type Here..."
                  onChangeText={this.updateSearch}
                  value={search}
                />
            </View>
        );
    }
} export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1f4166',
      alignItems: 'center',
    },  
    
    inputView:{
      width:"80%",
      backgroundColor:"#465881",
      borderRadius:25,
      height:65,
      marginBottom:20,
      justifyContent:"center",
      padding:20
    },
    logo:{
      fontWeight:"bold",
      fontSize:50,
      color:"#f8f8f8",
      marginBottom:40,
      marginTop:40
    },
})