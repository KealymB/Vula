import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Picker, Animated, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import SitesList from './SitesList';
import { addData } from '../actions/data';
import { searchData } from '../actions/data';
import { setSearch } from '../actions/data';
import { clearData } from '../actions/data';
import { setFilter } from '../actions/data';

import {
  Placeholder,
  PlaceholderLine,
  Shine,
} from 'rn-placeholder';

import HeaderTitle from './HeaderTitle'

const { width, height } = Dimensions.get('window');
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
  constructor(props){
    super(props)
    this.state = {
      search: '',
      searching: false,
      loading: true,
      animation: new Animated.Value(115),
      year: 2020,
      course: "",
      titleSearch: false
    }
  }

  expandHeader = () => {
    Animated.spring(this.state.animation, 
      {
        toValue: 174,
        duration: 10
      }).start()
  }

  collapseHeader = () => {
    Animated.spring(this.state.animation, 
      {
        toValue: 115,
        duration: 10,
      }).start()
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
    const animatedStyle = 
    {
      height: this.state.animation
    }
    const { search } = this.state;

    const interpolateOpacity = this.state.animation.interpolate({
      inputRange: [115, 174],
      outputRange: [0,1]
    })

    const animatedOpacityStyle = 
    {
      opacity: interpolateOpacity
    }
    if (this.props.searching) {
      return (
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={styles.searchbar}>
            <SearchBar
              platform='ios'
              placeholder="Search Sites:"
              onChangeText={this.updateSearch}
              value={search}
              onClear={() => { this.props.setSearch(false); this.props.clearData(); this.collapseHeader()}}
              onCancel={() => { this.props.setSearch(false); this.props.clearData(); this.collapseHeader()}}
              autoCapitalize='characters'
              lightTheme={true}
              round={true}
              containerStyle={{backgroundColor: 'white', borderBottomColor:'white', borderTopColor:'white', paddingTop:0, paddingBottom:0, marginTop:0}}
              autoFocus={true}
            />
          </View>

          <View style={styles.sites}>
            <SitesList navigation={this.props.navigation} style={{borderRadius:10,}}/>
          </View>

          <Animated.View style={[{flexDirection:'row', justifyContent:'space-around', animatedOpacityStyle}]}>
            <Picker
              style={styles.onePicker} itemStyle={styles.onePickerItem}
              selectedValue={this.state.year}
              onValueChange={(year) => {
                this.setState({year: year});
                this.props.setFilter(year, this.state.course);
              }}
            >
              <Picker.Item label="2020" value="2020" />
              <Picker.Item label="2019" value="2019" />
              <Picker.Item label="2018" value="2018" />
              <Picker.Item label="2017" value="2017" />
              <Picker.Item label="2016" value="2016" />
              <Picker.Item label="2015" value="2015" />
            </Picker>
            <Picker
              style={styles.onePicker} itemStyle={styles.onePickerItem}
              selectedValue={this.state.course}
              onValueChange={(course) => {
                this.setState({course: course});
                this.props.setFilter(this.state.year, course);
              }}
            >
              <Picker.Item label="COURSE" value=""/>
              <Picker.Item label="EEE" value="EEE"/>
              <Picker.Item label="CSC" value="CSC"/>
              <Picker.Item label="MAM" value="MAM"/>
              <Picker.Item label="MAM" value="MAM"/>
            </Picker>
          </Animated.View>
        </Animated.View>
      );
    } else {
      this.collapseHeader();
      return (
        <Animated.View style={[styles.sb, animatedStyle]}>
          <View style={styles.header}>
            <View style={styles.logoview}>
            <TouchableOpacity onPress={()=> this.setState({titleSearch:true})}>
              {/* <Text style={styles.logo} numberOfLines={1}>
                {this.props.title}
              </Text> */}
              <HeaderTitle title={this.props.title} searching={this.state.titleSearch}/>
              </TouchableOpacity>
            </View>

            <View style={styles.search}>
              <TouchableOpacity onPress={() => {this.props.setSearch(true); this.expandHeader()}}>
                <Icon name="ios-search" size={32} />
              </TouchableOpacity>
            </View>
          </View>

          {this.state.loading?
          <Placeholder
            style={{marginLeft:5, marginRight:5, marginBottom:10}}
            Animation={Shine}>
            <PlaceholderLine width={97} height={40} style={{marginTop:5, marginBottom:0}}/>
          </Placeholder>         
          :
          <View style={styles.sites}>
            <SitesList navigation={this.props.navigation} style={{borderRadius:10,}}/>
          </View>
          }
        </Animated.View>
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
    setSearch: (data) => dispatch(setSearch(data)),
    clearData: () => dispatch(clearData()),
    setFilter: (year, course) => dispatch(setFilter(year, course)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    shadowColor: "#000",
    borderRadius:10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4,
    zIndex:999,  
  },
  logoview: {
    flex: 5,
    marginLeft: 5,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
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
    borderRadius:5,
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
    backgroundColor: 'white',
    shadowColor: "#000",
    borderRadius:10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    zIndex:999,  
    height: 140,


  },
  searchText: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: 'uppercase'
  },
  onePicker: {
    width: 150,
    height: 44,
    borderRadius:5,
  },
  onePickerItem: {
    height: 44,
  },
})