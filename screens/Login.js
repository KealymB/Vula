import * as React from 'react';
import { Component } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity  } from 'react-native';
import { connect } from 'react-redux';

import { setUser } from '../actions/data';

var FormData = require('form-data');
let formdata = new FormData();


let test = '';

async function makeRequest(path, params) {
    let response = await fetch(path, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'User': 'react-native',
        'Connection': 'keep-alive',
      },
      body: params
    }).then((response) => {
    if(response.status == 201){
      return true;
    }else{
      return false;
    }})
    return response
}

async function userDetails(path) {
  let response = await fetch(path, {
      method: 'GET',
      headers: {
          'User': 'react-native',
          'Connection': 'keep-alive',
      }
  }).then((response) => response.json())
      .then(text => {
          data = {
            EID: text.eid,
            fname: text.firstName,
            lname: text.lastName,
          }
      })
  return {
      data
  }
}

async function get({ navigate }, props) {
    let a = await makeRequest("https://vula.uct.ac.za/direct/session/new", formdata)
    let userData = await userDetails("https://vula.uct.ac.za/direct/user/current.json")
    console.log(userData.data)
    if(a){
      props.setUser(userData.data);
      navigate("Site", {title: 'Home', siteID:this.state.uname});//might be a differed siteID
    }else{
      alert('Incorrect username or password');
    }
}

state={
    uname:'',
    password:''
}

class Login extends Component{
    constructor(props){
      super(props);

      this.state = {
        uname:'',
        password:'',
      }
    }

    render(){  
      return(
          <View style={styles.container}>
              <View style={styles.logo} >
                <Text style={styles.logo}>
                  vula
                </Text>
              </View>

              <View style={styles.inputView} >
                  <TextInput  
                      style={styles.inputText}
                      placeholder="UserName..." 
                      placeholderTextColor="#003f5c"
                      onChangeText={text => this.setState({uname:text})}
                      autoCapitalize='characters'
                      returnKeyType='next'
                      onSubmitEditing={() => this.password.focus()}
                      enablesReturnKeyAutomatically={true}
                      />
              </View>

              <View style={styles.inputView} >
                  <TextInput  
                      style={styles.inputText}
                      placeholder="Password..." 
                      placeholderTextColor="#003f5c"
                      onChangeText={text => this.setState({password:text})}
                      secureTextEntry={true}
                      enablesReturnKeyAutomatically={true}
                      returnKeyType='go'
                      ref={ref => {
                        this.password = ref;
                      }}
                      onSubmitEditing={() => {                      
                        if(this.state.uname||this.state.password){
                            formdata.append('_username', (this.state.uname));
                            formdata.append('_password', (this.state.password));
                            get(navigate = this.props.navigation, this.props);
                        }else{
                          alert('Username or Password is blank');
                        }}}
                      />
              </View>

              <TouchableOpacity 
                onPress={() => {
                      if(this.state.uname||this.state.password){
                          formdata.append('_username', (this.state.uname));
                          formdata.append('_password', (this.state.password));
                          get(navigate = this.props.navigation, this.props);
                      }else{
                        alert('Username or Password is blank');
                      }
                }}>
                <Text style={styles.loginBtn}>
                  Login
                </Text>
              
              </TouchableOpacity>
          </View>
      );
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
      setUser: (data) => dispatch(setUser(data))
    }
}
export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e6299',
    alignItems: 'center',
  },  
  loginBtn:{
    color:'white',
    fontSize:20
  },
  inputView:{
    width:"80%",
    backgroundColor:"#5984b3",
    borderRadius:25,
    height:65,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#f8f8f8",
    marginBottom:20,
    marginTop:40
  },
});