import * as React from 'react';
import { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownItem from 'react-native-drop-down-item';

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
    var parentNode = GetTheParentNodeChildArray(node.container, treeNodes) || treeNodes;
  
    parentNode.push({
      title: node.title,
      path: node.container,
      url: node.container,
      type: node.type,
      children: []
    });
  }
  
  function GetTheParentNodeChildArray(path, treeNodes) {
    for (var i = 0; i < treeNodes.length; i++) {
      var treeNode = treeNodes[i];
  
      if (path === (treeNode.path + '/' + treeNode.title)) {
        return treeNode.children;
      } 
      else if (treeNode.children.length > 0) {
        var possibleParent = false;
  
        treeNode.children.forEach(function(item) {
          if (path.indexOf(item.path + '/' + item.title) == 0) {
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

class Resources extends Component {
    state = {
        activeSections: [],
        collapsed: true,
        multipleSelect: false,
    };

    toggleExpanded = () => {
        this.setState({ collapsed: !this.state.collapsed });
    };

    setSections = sections => {
        this.setState({
            activeSections: sections.includes(undefined) ? [] : sections,
        });
    };


    async componentDidMount() {
        await Expo.Font.loadAsync({
            Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        });
        
        var path = "https://vula.uct.ac.za/direct/content/site/"+this.props.currSite.key+".json";
        let a = await makeRequest(path)
        this.props.setCont(createTree(a.data));
    }

    renderHeader = (section, _, isActive) => {
        switch (section.type){
            case 'collection':
                return (
                    <Animatable.View style={[styles.itemView, isActive ? styles.active : styles.inactive]}>
                        <Icon name="md-folder-open" size={36} style={{flex:1, paddingTop:5, marginLeft:5}}/>
                        <Text style={{flex:5, paddingTop:15}}>{section.title}</Text>
                    </Animatable.View>
                );
            default:
                return(
                    <Animatable.View style={[styles.itemView, isActive ? styles.active : styles.inactive]}>
                        <Icon name="ios-copy" size={36} style={{flex:1, paddingTop:5, marginLeft:5}}/>
                        <Text style={{flex:5, paddingTop:15}}>{section.title}</Text>
                    </Animatable.View>
                );
        }
    };

    

//need to turn flatlist into accordian (also need to stop the collection from rendering outside of another collection...)
     render() {
        const { multipleSelect, activeSections } = this.state;
        console.log();
        return (
            <View>
                <ScrollView style={{ alignSelf: 'stretch' }}>
                    {this.props.cont ? this.props.cont.map((param, i) => {
                        return (
                            <DropDownItem
                                key={i}
                                style={styles.dropDownItem}
                                contentVisible={false}

                                header={
                                    <View>
                                        
                                        <Text style={{fontSize: 16, color: 'blue',}}>
                                            {param.title}
                                        </Text>
                                    </View>
                                }>
                                <Text style={[styles.txt,{fontSize: 20,}]}>
                                    {param.url}
                                </Text>
                            </DropDownItem>
                        );
                        })
                        : null
                    }
                    <View style={{ height: 96 }}/>
                </ScrollView>
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
        flex:1,
        flexDirection:"row",
        justifyContent:'center',
        alignContent:"center"
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
        flexDirection: 'row',
        justifyContent:"center"
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