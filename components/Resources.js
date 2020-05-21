import * as React from 'react';
import { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text} from 'react-native';
import { connect } from 'react-redux';

import { setCont } from '../actions/data';


async function makeRequest(path) {
    let response = await fetch(path, {
        method: 'GET',
        headers: {
            'User': 'react-native',
            'Connection': 'keep-alive',
        }
    }).then((response) => response.json())
        .then(text => {
            data = text.content_collection.map(function (item) {
                return {
                    url: item.url,
                    type: item.type,
                    title: item.title,
                    numChildren: item.numChildren,
                    container: item.container,
                };
            });

        })
    return {
        data
    }
}

class Resources extends Component {
    async componentDidMount() {
        await Expo.Font.loadAsync({
            Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        });
        
        var path = "https://vula.uct.ac.za/direct/content/site/"+this.props.currSite.key+".json";
        let a = await makeRequest(path)
        this.props.setCont(a.data);
    }

    

//need to turn flatlist into accordian (also need to stop the collection from rendering outside of another collection...)
     render() {
        return (
            <View>                  
                <FlatList 
                    data={this.props.cont}
                    renderItem={({item}) =>{
                        if(item.numChildren>0){
                            return(
                                <TouchableOpacity >
                                    <Text>
                                        {item.title}
                                    </Text>
                                </TouchableOpacity>
                            );}
                        }}
                    keyExtractor={item => item.url}>
                </FlatList>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        currSite: state.currSite,
        cont: state.cont,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCont: (data) => dispatch(setCont(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Resources);