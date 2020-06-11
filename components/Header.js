import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import SitesList from './SitesList';
import { addData } from '../actions/data';
import { searchData } from '../actions/data';
import { setSearch } from '../actions/data';

import {
  Placeholder,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';

async function makeRequest(path) {

  let response = await fetch(path, {
    method: 'GET',
    headers: {
      'User': 'react-native',
      'Connection': 'keep-alive',
    }
  }).then((response) => response.json())
    .then(text => {
      data = text.site_collection.map(function (item) {
        return {
          key: item.id,
          label: item.title,
          tools: item.sitePages,
        };
      });

    })
  return {
    data
  }
}

class Header extends Component {
  state = {
    search: '',
    searching: false,
    loading: true,
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
    });

    let a = await makeRequest("https://vula.uct.ac.za/direct/site.json?_limit=100")
    this.setState({ loading: true })
    this.props.add(a.data);//passes props to redux
    this.setState({ loading: false })
  }

  updateSearch = search => {
    this.setState({ search });
    const formatQuery = search.toLowerCase();
    this.props.search(formatQuery);
  };
  render() {
    const { search } = this.state;
    if (this.props.searching) {
      return (
        <View style={styles.container}>
          <View style={styles.searchbar}>
            <SearchBar
              placeholder="Search Sites:"
              onChangeText={this.updateSearch}
              value={search}
              onClear={() => { this.props.setSearch(false) }}
              showCancel={true}
              autoCapitalize='characters'
            />
          </View>

          <View style={styles.sites}>
            <SitesList navigation={this.props.navigation} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.sb}>
          <View style={styles.header}>
            <View style={styles.logoview}>
              <Text style={styles.logo}>
                {this.props.title}
              </Text>
            </View>

            <View style={styles.search}>
              <TouchableOpacity onPress={() => { this.props.setSearch(true) }}>
                <Icon name="ios-search" size={32} />
              </TouchableOpacity>
            </View>
          </View>

          {this.state.loading?
          <Placeholder
            style={{marginLeft:5, marginRight:5}}
            Animation={Shine}>
            <PlaceholderLine width={97} height={40} style={{marginTop:5, marginBottom:0}}/>
          </Placeholder>         
          :
          <View style={styles.sites}>
            <SitesList navigation={this.props.navigation} />
          </View>
          }

          <View style={styles.bottomBorder}></View>
        </View>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    dataSearched: state,
    searching: state.searching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (query) => dispatch(searchData(query)),
    add: (data) => dispatch(addData(data)),
    setSearch: (data) => dispatch(setSearch(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f4166',
  },
  logoview: {
    flex: 5,
    marginLeft: 5,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#f8f8f8",
  },
  search: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
  },
  sites: {
    marginTop: 5,
  },
  itemView:{
    backgroundColor: "#f8f8f8",
    borderRadius:10,
    marginRight:5,
    marginLeft:5
},
itemText:{
    fontSize:15,
    padding:2,
},
  searchbar: {
    marginTop: 20,
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
  },
})