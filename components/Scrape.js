import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import { connect } from 'react-redux';
import { setAss } from '../actions/data';


class Scrape extends Component {
    async componentDidMount() {

    }

    render() {
        return (
            <View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        Ass: state.assignments,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAss: (data) => dispatch(setAss(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scrape);