import * as React from 'react';
import { AsyncStorage} from 'react-native';
import { Component } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
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
          label: item.title,
        };
      });
      console.log(data);
  })    
  return{
    data
  }
}

class SiteSearch extends Component{
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
  } export default SiteSearch;