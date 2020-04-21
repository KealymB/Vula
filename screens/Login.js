import * as React from 'react';
import { AsyncStorage} from 'react-native';
import { Component } from 'react';
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';

var FormData = require('form-data');
let formdata = new FormData();

function makeRequest(path, params) {
    fetch(path, {
      method: 'POST',
      headers: {
        'User-Agent': 'react-native',
        'Connection': 'keep-alive'
      },
      body: params
    }).then((response) => response.headers['map']['set-cookie']).then(cookie => {if(cookie){
      AsyncStorage.setItem('cookie', cookie)
    }
      
    }).catch(err => {
      alert('Username/Password incorrect')
    })
}

async function get() {
    let a = await makeRequest("https://vula.uct.ac.za/direct/session/new", formdata)
    let cookie = await AsyncStorage.getItem('cookie')
    alert('cookie:'+cookie)
}

state={
    uname:'',
    password:''
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
                        console.log(this.state.uname, this.state.password)
                        formdata.append('_username', this.state.uname)
                        formdata.append('_password', this.state.password)
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
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#f8f8f8",
    marginBottom:40
  },
});