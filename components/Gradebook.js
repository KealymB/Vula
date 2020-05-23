import * as React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { Component } from 'react';
import { connect } from 'react-redux';
import { setGrades } from '../actions/data';

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

    renderGradebookItem = grade => {
        return (
            <View style={styles.gradeItem}>
                <Text style={styles.gradeTitleText}>
                    {grade.gradeTitle}
                </Text>
                <Text style={styles.gradeText}>
                    {grade.grade} / {grade.points}
                </Text>
            </View>

        );
    }


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <FlatList
                        data={this.props.grades}
                        renderItem={({ item }) => this.renderGradebookItem(item)
                        }
                        keyExtractor={item => item.gradeTitle}
                    />
                </View>
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
        backgroundColor: '#1f4166'
    },
    gradeItem:
    {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 5,
        paddingBottom: 5
    },
    gradeTitleText:
    {
        fontSize: 25,
        color: 'white'
    },
    gradeText:
    {
        fontSize: 20,
        color: '#eeee',
    },





})