import React, { Component } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import {
    Placeholder,
    PlaceholderLine,
    Shine,
  } from 'rn-placeholder';

import { setDrop } from '../actions/data';
import { setUrl } from '../actions/data';

import { withNavigation} from '@react-navigation/compat'

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
            data = text.dropbox_collection.map(function (item) {
                return {
                    type: item.type,
                    title: item.title,
                    url: item.url,
                };
            });

        })
    return {
        data
    }
}

function itemRender(item, props) {
    return(
        <TouchableOpacity style={styles.itemContainer}
            onPress={ () => { 
                props.setUrl(item.url, item.title);
                props.navigation.navigate('DocViewer', { url: item.url, title: item.title })}}
                key={item.url}
        >
            <Text numberOfLines={1} style={styles.Title}>
                {item.title}
            </Text>
      </TouchableOpacity>
    );
  }

class DropBox extends Component {
    state={
        loading: true,
    }
    async componentDidMount() {
        await Expo.Font.loadAsync({
            Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        });
        let a = await makeRequest("https://vula.uct.ac.za/direct/dropbox/site/"+this.props.currSite.key+"/user/"+this.props.user.EID+".json")
        this.props.setDrop(a.data);
        this.setState({ loading: false })
    }

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
                <View style={{marginBottom:10}}>
                    <FlatList
                        contentContainerStyle={{flexGrow: 1, marginTop:10}}
                        data={this.props.drop}
                        renderItem={({item}) =>itemRender(item, this.props)}
                        keyExtractor={item => item.id}
                        extraData={this.props.drop}
                        showsVerticalScrollIndicator={false}>
                    </FlatList>
                </View>
            }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        drop: state.drop,
        user: state.userData,
        currSite: state.currSite
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDrop: (data) => dispatch(setDrop(data)),
        setUrl: (url, title) => dispatch(setUrl(url, title))
    }
}

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(DropBox));

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2e6299',
        height:screenHeight-headerHeight,
    },
    itemContainer: {
        backgroundColor:'white', 
        height:60, 
        borderRadius:5, 
        marginBottom:10,
        justifyContent: 'center',
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
    Title:{
        fontSize:20,
        paddingLeft:10,
    }
});