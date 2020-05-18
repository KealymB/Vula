import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet, Button, FlatList, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import { setAnnouncements } from '../actions/data';
import AnnouncementView from './AnnouncementView'


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
                    author: item.createdByDisplayName,
                    date: item.createdOn
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

    convertDate = ms => {
        /* 

        TODO: 
    
        - Add 24 hour time such as 2pm, 2am, 8am, 8pm etc..
        - Maybe change all of this idk 

        */
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        var date = new Date(ms);
        var month = date.getUTCMonth() + 1; //months from 1-12
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();
        var dayindex = date.getDay();
        var finaldate = weekdays[dayindex] + '\t' + day + "/" + month + "/" + year
        return finaldate.toString()
    }

    openAnnouncementView = ann => {
        alert(ann.title)
        return(
              <AnnouncementView body={ann.body} navigation={this.props.navigation} /> 
          );
    };
    // STILL TO DO:
    renderAnnouncement = ann => {
        return (
            <TouchableOpacity style={styles.itemView}
                onPress={() => {}}> 

                <View style={styles.innerItemViewLeft}>
                    <Text style={styles.annTitle}>{ann.title}</Text>
                    <Text style={styles.annTime}>{ann.author}</Text>
                </View>
                <View style={styles.innerItemViewRight}>
                    <Text style={styles.annTime}>{this.convertDate(ann.date)}</Text>
                </View>

            </TouchableOpacity>
        );
    };

    async componentDidMount() {
        await Expo.Font.loadAsync({
            Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        });

        let a = await makeRequest("https://vula.uct.ac.za/direct/announcement/user.json?n=30")
        this.props.setAnnouncements(a.data);
        this.setState({ loading: false })
    }



    render() {
        return (
            <View style={styles.flalist}>
                <FlatList
                    contentContainerStyle={{ flexGrow: 1, marginLeft: 5, marginRight: 5 }}
                    data={this.props.allAnnouncements}
                    renderItem={({ item }) => this.renderAnnouncement(item)}
                    keyExtractor={item => item.key}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        allAnnouncements: state.allAnnouncements,
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
        paddingTop: 50,
        flex: 1
    },
    itemView: {
        backgroundColor: "#f8f8f8",
        borderRadius: 5,
        marginTop: 10,
        height: 50,
        flex: 1,
        flexDirection: 'row'

    },
    innerItemViewLeft:
    {
        flex: 8.5,
        marginTop: 5,
        marginLeft: 2,

    },
    innerItemViewRight:
    {
        flex: 1.5,
        alignItems: "flex-end",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee'

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
    announcementItem: {
        backgroundColor: 'white',
        padding: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginHorizontal: 16,
        flexDirection: 'row'
    },
    title: {
        fontSize: 32,
    },
    author:
    {
        fontSize: 15
    },
    titleAnnouncementMain:
    {
        fontSize: 32,
        marginHorizontal: 16,
        color: 'white'
    },
    annTitle:
    {
        fontSize: 15,
        fontWeight: "500",
        color: "black"
    },
    annTime:
    {
        fontSize: 11,
        color: 'black',
        marginTop: 4
    },
    flalist:
    {
        //need to put in height or some form of styling to get flatlist to scroll
    }


})