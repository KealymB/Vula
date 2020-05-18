import * as React from 'react';
import { Component } from 'react';
import { View, Text, FlatList} from 'react-native';
import { connect } from 'react-redux';

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
        console.log(path)
        let a = await makeRequest(path)
        console.log(a.data)
    }


     render() {
        return (
            <View>                  
                <Text>havew data in accorian</Text>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        currSite: state.currSite,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Resources);