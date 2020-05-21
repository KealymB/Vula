import React, { Component } from 'react';
import {
    Switch,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { connect } from 'react-redux';
import WebView from 'react-native-webview';
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
                    author: item.createdByDisplayName,
                    date: item.createdOn
                };
            });

        })
    return {
        data
    }
}





class AnnouncementAccordion extends Component {
    state = {
        activeSections: [],
        collapsed: true,
        multipleSelect: false,
    };

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

    async componentDidMount() {
        await Expo.Font.loadAsync({
            Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        });

        let a = await makeRequest("https://vula.uct.ac.za/direct/announcement/user.json?n=30")
        this.props.setAnnouncements(a.data);
        this.setState({ loading: false })
    }

    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };

    renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View
                //duration={400}
                style={[styles.itemView, isActive ? styles.active : styles.inactive]}
                //transition="backgroundColor"
            >
                <View style={styles.innerItemViewLeft}>
                    <Text style={styles.annTitle}>{section.title}</Text>
                    <Text style={styles.annTime}>{section.author}</Text>
                </View>
                <View style={styles.innerItemViewRight}>
                    <Text style={styles.annTime}>{this.convertDate(section.date)}</Text>
                </View>
            </Animatable.View>
        );
    };

    renderContent(section, _, isActive) {
        return (
            <Animatable.View
                //duration={400}
                style={[styles.content, isActive ? styles.active : styles.inactive]}
                //transition="backgroundColor"
            >
                {/* <WebView
        source={{ html: section.body.toString()}}
        style={{
          width: 400,
          height: 300,
          fontSize: 15
        }}
      /> */}
                <Text>
                    {section.body.replace(/<\/?[^>]+(>|$)/g, "")}
                </Text>

            </Animatable.View>
        );
    }

    render() {
        const { multipleSelect, activeSections } = this.state;

        return (
            <View style={styles.container}>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                </View>
                <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
                    <Text style={styles.title}>All Announcements</Text>
                    <Accordion
                        activeSections={activeSections}
                        sections={this.props.allAnnouncements}
                        touchableComponent={TouchableOpacity}
                        expandMultiple={multipleSelect}
                        renderHeader={this.renderHeader}
                        renderContent={this.renderContent}
                        //duration={400}
                        onChange={this.setSections}
                    />
                </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementAccordion);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f4166',
        paddingTop: Constants.statusBarHeight,
    },
    title: {
        textAlign: 'center',
        fontSize: 35,
        fontWeight: '500',
        marginBottom: 20,
        color: 'white'
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
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
});