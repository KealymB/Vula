import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Webview
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import { connect } from 'react-redux';
import { setAss } from '../actions/data';

import Scrape from './Scrape';

import {
    Placeholder,
    PlaceholderLine,
    Shine,
  } from 'rn-placeholder';
import { render } from 'react-dom';

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
            data = text.assignment_collection.map(function (item) {
                return {
                    key: item.id,
                    title: item.title,
                    due: item.dueTime.epochSecond,
                    open: item.openTime.epochSecond,
                    max: item.gradeScaleMaxPoints,
                    url: item.entityURL,
                };
            });

        })
    return {
        data
    }
}

class Assignments extends Component {
    state = {
        activeSections: [],
        collapsed: true,
        multipleSelect: false,
        loading: true,
    };
    convertDate = ms => {
        var utcSeconds = ms;
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds); //use to convert dates

        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        var date = new Date(d);

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

        let a = await makeRequest("https://vula.uct.ac.za/direct/assignment/site/"+this.props.currSite.key+".json?n=30")
        //set the id in site
        this.props.setAss(a.data);
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
                    <Text numberOfLines={2} style={{fontSize:20, paddingLeft:5,}}>{section.title}</Text>
                </View>
                <View style={styles.innerItemViewRight}>
                    <Text style={{paddingLeft:0}}>{this.convertDate(section.due)}</Text>
                </View>
            </Animatable.View>
        );
    };

    renderContent(section, _) {
        return (
            <Animatable.View style={styles.content}>
                
            </Animatable.View>
        );
    }

    render() {
        const { multipleSelect, activeSections } = this.state;
        return (
            <View style={styles.container}>
            {this.state.loading?           
                <Placeholder
                    style={styles.PlaceHolder}
                    Animation={Shine}>
                    <PlaceholderLine width={97} height={60} style={{marginBottom:10, marginTop:10}}/>
                    <PlaceholderLine width={97} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={97} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={97} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={97} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={97} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={97} height={60} style={{marginBottom:10}}/>
                    <PlaceholderLine width={97} height={60} style={{marginBottom:10}}/>
                </Placeholder>
                :
                <ScrollView showsVerticalScrollIndicator={false} 
                    style={styles.itemContainer}>
                    <Scrape/>
                    <Accordion
                        activeSections={activeSections}
                        sections={this.props.Ass}
                        touchableComponent={TouchableOpacity}
                        expandMultiple={multipleSelect}
                        renderHeader={this.renderHeader}
                        renderContent={this.renderContent}
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
        Ass: state.assignments,
        currSite: state.currSite,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAss: (data) => dispatch(setAss(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e6299',
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
        backgroundColor: '#eee',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        height:100,
    },
    active: {
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
    },
    inactive: {
        borderRadius: 5,
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
        backgroundColor: "#F5FCFF",
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
        justifyContent: 'center'
    },
    innerItemViewRight:
    {
        flex: 2,
        alignItems: "flex-start",
        justifyContent: 'center',
        backgroundColor: '#eee',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
    },
    itemText: {
        fontSize: 15,
        padding: 2,
    },
    itemContainer: {
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        marginLeft:5,
        marginRight:5,
        
        elevation: 4,
        zIndex:999,  
    },
    PlaceHolder:{
        marginLeft:5,
        marginRight:5,
    },
});