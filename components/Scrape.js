import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import { connect } from 'react-redux';
import { setAss } from '../actions/data';

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
                return delay(300).then(next);
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

    return ({
        key: data.key,
        title: data.title,
        due: data.due,
        open: data.open,
        max: data.max,
        url: data.url,
        mark: mark,
        //attachments [], submitted, 
    })
}

class Scrape extends Component {
    state = {
        mark: [],
        attachments: [],
        submitted: [],
    };

    async componentDidMount() {
        var urls = [];

        data = this.props.Ass.map( function (item) {
            urls.push(item.url)
            return {
                key: item.key,
                title: item.title,
                due: item.due,
                open: item.open,
                max: item.max,
                url: item.url,
                //mark, attachments [], submitted, 
            };
        });

        getAll(urls).then(rep => {
            var counter = 0;
            var finalData = [];
            body.map(html => {
                finalData.push(Parser(html, data[counter]))
                counter ++;
            })
            console.log(finalData[1].mark)
            this.props.setAss(finalData)
        }).catch(err => {
            console.log(err)
        });
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