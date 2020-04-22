import * as React from 'react';
import { AsyncStorage} from 'react-native';
import { Component } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';

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
    }).then((response) => (response).headers.get('set-cookie')).then(async cookie => {
      await AsyncStorage.setItem('cookie', JSON.stringify(cookie))
    })
}

async function get() {
    let a = await makeRequest("https://vula.uct.ac.za/direct/session/new", formdata)
    let cookie = await AsyncStorage.getItem('cookie');
    console.log(cookie)
}

state={
    uname:'',
    password:'',
    cookie:''
}

class Login extends Component{
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
                        const { navigate } = this.props.navigation;
                        formdata.append('_username', (this.state.uname));
                        formdata.append('_password', (this.state.password));
                        get();
                        navigate("Home");
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
    backgroundColor: '#1f4166',
    alignItems: 'center',
  },  
  
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
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
    marginBottom:40,
    marginTop:40
  },
});