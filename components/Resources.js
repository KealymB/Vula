import * as React from 'react';
import { Component } from 'react';
import { View, Text} from 'react-native';
import { connect } from 'react-redux';

class Resources extends Component {
     render() {
        return (
            <View>                  
                <Text>RESOURCES</Text>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        allAnnouncements: state.allAnnouncements,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAnnouncements: (data) => dispatch(setAnnouncements(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Resources);