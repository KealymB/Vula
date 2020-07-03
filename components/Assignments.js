import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import { connect } from 'react-redux';
import { setAss } from '../actions/data';
import { withNavigation} from '@react-navigation/compat'
import { setUrl } from '../actions/data';

import Collapsible from 'react-native-collapsible';

import {
    Placeholder,
    PlaceholderLine,
    Shine,
  } from 'rn-placeholder';

const screenHeight = Math.round(Dimensions.get('window').height); //used to set content height

const screenWidth = Math.round(Dimensions.get('window').width); //used to set content width

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
                    instructions: item.instructions,
                };
            });

        })
    return {
        data
    }
}
async function delay(t, data) {
    return new Promise(resolve => {
        setTimeout(resolve.bind(null, data), t);
    });
}

async function getAll(array) {
    let index = 0;
    function next() {
        if (index < array.length) {
            return get(array[index++]).then(function() {
                return delay(500).then(next);
            });
        }        
    }
    return Promise.resolve().then(next);
}


var body = [];

async function get(url){
    var test = 0;
    await fetch(url).then(resp => resp.text()).then(rep => {test = rep})
    body.push(test)
}

function Parser(html, data) {   
    var mark = null;
    var point = html.split("(max")[0].split("Grade")[1]

    if(point.includes(".")){
        mark = parseFloat(point.split("<strong>")[1])
    }

    //for marks
    var au = null;
    var an = null;

    try {
        au = html.split("<ul class=\"attachList\">")[1].split("<span")[0].split("<a href=\"")[1].split("\"")[0]
    }
    catch(err) {
        
    }

    try {
        an = html.split("<ul class=\"attachList\">")[1].split("<span")[0].split("_blank\">")[1].split("</a>")[0]
    }
    catch(err) {
        
    }

    var mu = null;
    var mn = null;
    var start;
    var end;

    try {
        start = html.lastIndexOf("class=\"attachList")
        end = html.lastIndexOf("<span class=\"textPanelFooter\">(")
        mu = html.substring(start, end).split("</a>")[0].split("<a href=\"")[1].split("\"")[0]
    }
    catch(err) {
        
    }

    try {
        mn = html.substring(start, end).split("target=\"_blank\">")[1].split("</a>")[0]
    }
    catch(err) {
        
    }

    return ({
        key: data.key,
        title: data.title,
        due: data.due,
        open: data.open,
        max: data.max,
        url: data.url,
        instructions: data.instructions,
        mark: mark,
        attachments: {
            url: au,
            name: an,
        },
        myattachments: {
            url: mu,
            name: mn,
        },
    })
}

class Assignments extends Component {
    state = {
        loading: true,
        selected: '',
        docView: false,
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

        var urls = [];

        data = a.data.map( function (item) {
            urls.push(item.url)
            return {
                key: item.key,
                title: item.title,
                due: item.due,
                open: item.open,
                max: item.max,
                url: item.url,
                instructions: item.instructions,
            };
        });

        getAll(urls).then(rep => {
            var counter = 0;
            var finalData = [];
            body.map(html => {
                finalData.push(Parser(html, data[counter]))
                counter ++;
            })
            this.props.setAss(finalData)
            this.setState({ loading: false })
        }).catch(err => {
            console.log(err)
        });
    }

    toggleExpanded = (name) => {
        if(this.state.selected != name){
            this.setState({ selected: name});
        }else{
            this.setState({ selected: ''});
        }
        
    };
    render() {
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
                        {this.props.Ass.map((item) =>
                            <TouchableOpacity onPress={()=>{this.toggleExpanded(item.title)}} style={styles.wrapper} key={item.title}>
                                <View style={styles.header}>
                                    <View style={!(this.state.selected != item.title)? styles.innerItemViewLeftOpen : styles.innerItemViewLeftClosed}>
                                        <Text numberOfLines={1} style={{fontSize:20, paddingLeft:5}}>{item.title}</Text>
                                    </View>
                                    <View style={!(this.state.selected != item.title)? styles.innerItemViewRightOpen : styles.innerItemViewRightClosed}>
                                        <Text style={{paddingLeft:0}}>{this.convertDate(item.due)}</Text>
                                    </View>
                                </View>

                                <Collapsible collapsed={this.state.selected != item.title} style={styles.content}>
                                    <Text style={{fontSize:20, paddingLeft:5}}>
                                        Instructions:
                                    </Text>
                                    <Text style={{fontSize:15, paddingLeft:10}} numberOfLines={3}>
                                        {item.instructions.replace(/<\/?[^>]+(>|$)/g, "")}
                                    </Text>
                                    <Text style={{fontSize:20, paddingLeft:5}}>
                                                Assignment Resources: 
                                    </Text>
                                    {
                                        item.attachments.name?
                                        <View style={{paddingLeft:10}}>
                                            {
                                                <TouchableOpacity onPress={()=>{
                                                console.log(item.attachments.url)
                                                this.props.navigation.navigate('DocViewer', 
                                                {
                                                    url: item.attachments.url,
                                                    title: item.attachments.name
                                                }) 
                                                
                                                this.setState({ docView: true })
                                                
                                                this.props.setUrl(item.attachments.url, item.attachments.name)
                                                
                                                }}>
                                                        <Text>
                                                            {item.attachments.name}
                                                        </Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                        :
                                        <View>
                                            <Text style={{paddingLeft:5}}>
                                                None
                                            </Text>
                                        </View>
                                    }
                                    <Text style={{fontSize:20, paddingLeft:5}}>
                                        Uploaded documents: 
                                    </Text>
                                    {
                                        item.myattachments.name?
                                        <View style={{paddingLeft:5, paddingLeft:10}}>
                                            {
                                                <TouchableOpacity onPress={()=>{
                                                console.log(item.myattachments.url)
                                                this.props.navigation.navigate('DocViewer', 
                                                {
                                                    url: item.myattachments.url,
                                                    title: item.myattachments.name
                                                }) 
                                                
                                                this.setState({ docView: true })
                                                
                                                this.props.setUrl(item.myattachments.url, item.myattachments.name)
                                                
                                                }}>
                                                        <Text>
                                                            {item.myattachments.name}
                                                        </Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                        :
                                        <View>
                                            <Text style={{paddingLeft:5}}>
                                                None
                                            </Text>
                                        </View>
                                    }
                                </Collapsible>
                        </TouchableOpacity>
                        )
                        }
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
        setAss: (data) => dispatch(setAss(data)),
        setUrl: (url, title) => dispatch(setUrl(url, title))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(Assignments));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e6299',
        height:screenHeight-headerHeight,
    },
    PlaceHolder: {
        marginLeft:5,
    },
    content: {
        backgroundColor: '#eee',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        height:180,
        marginLeft:2,
    },
    active: {
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
    },
    inactive: {
        borderRadius: 5,
    },
    itemView: {
        backgroundColor: "#F5FCFF",
        marginTop: 10,
        height: 60,
        flex: 1,
        flexDirection: 'row'
    },
    innerItemViewLeftClosed:
    {
        flex: 8.5,
        marginLeft: 2,
        justifyContent: 'center',
        backgroundColor:'white',
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
    },
    innerItemViewRightClosed:
    {
        flex: 2,
        alignItems: "flex-start",
        justifyContent: 'center',
        backgroundColor: '#eee',
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
    },
    innerItemViewLeftOpen:
    {
        flex: 8.5,
        marginLeft: 2,
        justifyContent: 'center',
        backgroundColor:'white',
        borderTopLeftRadius:5,
    },
    innerItemViewRightOpen:
    {
        flex: 2,
        alignItems: "flex-start",
        justifyContent: 'center',
        backgroundColor: '#eee',
        borderTopRightRadius:5,
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
        paddingTop:10,
    },
    wrapper:{
        borderRadius:5,
        marginBottom:10,
    },
    header: {
        flexDirection:"row",
        height:60,
    },
});