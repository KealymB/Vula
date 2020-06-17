import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { connect } from 'react-redux';
import { setAnnouncements } from '../actions/data';

import {
    Placeholder,
    PlaceholderLine,
    Shine,
  } from 'rn-placeholder';

const screenHeight = Math.round(Dimensions.get('window').height); //used to set content height

const headerHeight = 133; //used to set header height

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
        loading: true,
    };

    convertDate = ms => {
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
            <Animatable.View style={[styles.itemView, isActive ? styles.active : styles.inactive]}>
                <View style={styles.innerItemViewLeft}>
                    <Text numberOfLines={2}>{section.title}</Text>
                    <Text numberOfLines={1}>{section.author}</Text>
                </View>
                <View style={styles.innerItemViewRight}>
                    <Text style={{paddingLeft:0}}>{this.convertDate(section.date)}</Text>
                </View>
            </Animatable.View>
        );
    };

    renderContent(section, _, isActive) {
        return (
            <Animatable.View style={[styles.content, isActive ? styles.active : styles.inactive]}>
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
            {this.state.loading?           
                <Placeholder
                    Animation={Shine}>
                    <PlaceholderLine width={100} height={60} style={{marginBottom:10, marginTop:10}}/>
                    <PlaceholderLine width={100} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={100} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={100} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={100} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={100} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={100} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={100} height={60} style={{marginBottom:10}}/>
                </Placeholder>
                :
                <ScrollView>
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
            }
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
        marginLeft:5,
        marginRight:5,
        height:screenHeight-headerHeight,
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
        height: 60,
        flex: 1,
        flexDirection: 'row'
    },
    innerItemViewLeft:
    {
        flex: 8.5,
        marginTop: 5,
        marginLeft: 2,
        justifyContent: 'space-between'
    },
    innerItemViewRight:
    {
        flex: 2,
        alignItems: "flex-start",
        justifyContent: 'center',
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    itemText: {
        fontSize: 15,
        padding: 2,
    },
});