import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';

import { setCont } from '../actions/data';
import Accordion from './Accordion';
import { ScrollView } from 'react-native-gesture-handler';

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
                var path = item.url;

                if(item.url[item.url.length-1] === '/'){
                    path = item.url.substring(0, item.url.length-1);
                }
            
                var pathSplit = path.split('/');

                return {
                    path: path.substring(0, path.indexOf(pathSplit[pathSplit.length-1])-1),
                    name: pathSplit[pathSplit.length-1],
                    url: item.url,
                    type: item.type,
                    title: item.title,
                    container: item.container.substring(0, item.container.length-1),
                };
            });

        })
    return {
        data
    }
}

// Add an item node in the tree, at the right position
function addToTree(node, treeNodes) {
    var parentNode = GetTheParentNodeChildArray(node.path, treeNodes) || treeNodes;

    parentNode.push({
      title: node.title,
      path: node.path,
      type: node.type,
      name: node.name,
      children: []
    });
}

function GetTheParentNodeChildArray(path, treeNodes) {
    for (var i = 0; i < treeNodes.length; i++) {
        var treeNode = treeNodes[i];
        if (path === (treeNode.path + '/'+ treeNode.name)) {
        return treeNode.children;
        } 
        else if (treeNode.children.length > 0) {
        var possibleParent = false;

        treeNode.children.forEach(function(item) {
            if (path.indexOf(item.path + '/' + item.name) == 0) {
            possibleParent = true;
            return false;
            }
        });

        if (possibleParent) {
            return GetTheParentNodeChildArray(path, treeNode.children)
        }
        }
    }
}


//Create the item tree starting from menuItems
function createTree(nodes) {
    var tree = [];

    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        addToTree(node, tree);
    }
    return tree;
}

const RenderCont = ({cont}) => {
    return (
        <View>
            {cont.map( param => (
                <Accordion
                    key={param.name}
                    title={param.title}
                    url={param.url}
                    type={param.type}
                    content={                    
                        <View>
                            {(param.children.length > 0) &&
                                <RenderCont cont={param.children}/>
                            }
                        </View>
                    }
                />
            ))}
        </View>
    );
}

class Resources extends Component {
    async componentDidMount() {
        await Expo.Font.loadAsync({
            Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        });
        
        var path = "https://vula.uct.ac.za/direct/content/site/"+this.props.currSite.key+".json";
        let a = await makeRequest(path);
        this.props.setCont(createTree(a.data));
    }

    render() {
        return (
            <ScrollView>
                <RenderCont cont={this.props.cont}/>
            </ScrollView>
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