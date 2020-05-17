import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet, Button, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

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
        return (
            <View>                  
                <FlatList
                    contentContainerStyle={{flexGrow: 1, marginLeft:5, marginRight:5}}
                    data={this.props.allAnnouncements}
                    renderItem={({ item }) => 
                    <TouchableOpacity style={styles.itemView}>          
                        <Button
                            color='black'
                            onPress={() => {}} 
                            title={item.title}>
                        </Button>
                    </TouchableOpacity>}   
                    keyExtractor={item => item.key}
                />
            </View>
        );
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
        backgroundColor: '#1f4166',
    },
    itemView:{
        backgroundColor: "#f8f8f8",
        borderRadius:10,
        marginTop:10,        
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