import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import Icon from 'react-native-vector-icons/Ionicons';

import { setAnnouncements } from '../actions/data';

async function makeRequest(path) {
    let response = await fetch(path, {
        method: 'GET',
        headers: {
            'User': 'react-native',
            'Connection': 'keep-alive',
        }
    }).then((response) => response.json())
        .then(text => {
            data = text.announcement_collection.map(function (item) {
                return {
                    key: item.announcementId,
                    parentSite: item.siteId,
                    title: item.title,
                    body: item.body,
                    author: item.createdByDisplayName
                };
            });

        })
    return {
        data
    }
}

function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

class Announcements extends Component {
    state = {
        loading: true,
    }

    async componentDidMount() {
        await Expo.Font.loadAsync({
            Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        });

        let a = await makeRequest("https://vula.uct.ac.za/direct/announcement/user.json?n=10")
        console.log(a.data)
        this.props.setAnnouncements(a.data);
        this.setState({ loading: false })
    }

    

    render() {
        if (this.state.loading) {
            return (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>                  
                    <FlatList
                        data={this.props.allAnnouncements}
                        renderItem={({ item }) => <Item title={item.title} />}
                        keyExtractor={item => item.key}
                    />
                </View>
            );
        }
    }
}
const mapStateToProps = (state) => {
    return{
      allAnnouncements:state.allAnnouncements,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAnnouncements: (data) => dispatch(setAnnouncements(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Announcements);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f4166',
    },
    itemView: {
        backgroundColor: "#f8f8f8",
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
    },
    itemText: {
        fontSize: 15,
        padding: 2,
    },
    searchbar: {
        marginTop: 20,
    },
    bottomBorder: {
        marginTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
      item: {
        backgroundColor: 'white',
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
      author: 
      {
        fontSize: 15
      }
})