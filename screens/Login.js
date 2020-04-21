import * as React from 'react';
import { AsyncStorage} from 'react-native';
import { Component } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';


var FormData = require('form-data')
let formdata = new FormData();

formdata.append('_username', '')//add into login
formdata.append('_password', '')//add info login

function makeRequest(path, params) {
    fetch(path, {
      method: 'POST',
      headers: {
        'User-Agent': 'react-native',
        'Connection': 'keep-alive'
      },
      body: params
    }).then((response) => response.headers['map']['set-cookie']).then(cookie => {
      if(cookie){AsyncStorage.setItem('cookie', JSON.stringify(cookie))}
    }).catch(err => {
      alert('Cookie2: ' + err)
    })
}

async function get() {
    let a = await makeRequest("https://vula.uct.ac.za/direct/session/new", formdata)
    let cookie = await AsyncStorage.getItem('cookie')
    alert('Cookie: ' + cookie)
}

state={
    uname:"",
    password:""
}
  

class Login extends Component{
    render(){
        
        return(
            <View style={styles.container}>
                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Email..." 
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({uname:text})}/>
                </View>

                <View style={styles.inputView} >
                    <TextInput  
                        style={styles.inputText}
                        placeholder="Password..." 
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({password:text})}
                        secureTextEntry={true}/>
                </View>

                <TouchableOpacity style={styles.loginBtn}>
                    <Button  onPress={() => {
                        get();
                    }} title="Login">
                        <Text style={styles.loginText}>LOGIN</Text>
                    </Button>
                </TouchableOpacity>
            </View>
        );
    }
} export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },  
  
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
});