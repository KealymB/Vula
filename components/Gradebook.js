import * as React from 'react';
import { View, StyleSheet, Text, FlatList, Dimensions } from 'react-native';
import { Component } from 'react';
import { connect } from 'react-redux';
import { setGrades } from '../actions/data';

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
            data = text.assignments.map(function (item) {
                if (item.grade == null) {
                    item.grade = "-"
                }
                return {
                    gradeTitle: item.itemName,
                    grade: item.grade,
                    points: item.points
                };
            });

        })
    return {
        data
    }
}

class Gradebook extends Component {

    async componentDidMount() {
        await Expo.Font.loadAsync({
            Icon: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
        });

        var path = "https://vula.uct.ac.za/direct/gradebook/site/" + this.props.currSite.key + ".json";
        let a = await makeRequest(path)
        this.props.setGrades(a.data);
    }

    renderGradebookItem = (grade, index) => {
        return (
            <View style={[styles.gradeItem, { backgroundColor: index % 2 === 0 ? '#F2F2F2' : '#FFFFFF' }]}>
                <View style={styles.gradeItemLeft}>
                    <Text style={styles.gradeTitleText}>
                        {grade.gradeTitle}
                    </Text>
                </View>
                <View style={styles.gradeItemRight}>
                    <Text style={styles.gradeText}>
                        {grade.grade} / {grade.points}
                    </Text>
                </View>
            </View>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.grades}
                    renderItem={({ item, index }) => this.renderGradebookItem(item, index)
                    }
                    keyExtractor={item => item.gradeTitle}
                    showsVerticalScrollIndicator={false}
                    style={styles.flatlist}
                />
            </View>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        grades: state.grades,
        currSite: state.currSite,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setGrades: (data) => dispatch(setGrades(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Gradebook);


const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#2e6299',
        height:screenHeight-headerHeight,
        paddingTop:10,
    },
    gradeItem:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#BFBFBF',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    gradeItemLeft:
    {
        flex: 7,
    },
    gradeItemRight:
    {
        flex: 3,
        alignItems: 'flex-end',
        paddingRight: 20,
        borderLeftWidth: 1,
        borderLeftColor: '#BFBFBF'
    },
    gradeTitleText:
    {
        fontSize: 25,
        color: '#34393b'
    },
    gradeText:
    {
        fontSize: 20,
        color: '#34393b',
    },
    flatlist:{
        borderRadius:5,
    }
})