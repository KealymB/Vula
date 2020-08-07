import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    logo: {
        fontWeight: "bold",
        fontSize: 30,
        color: "black",

      },
      textInputLogo: 
      {
        fontWeight: "bold",
        fontSize: 30,
        color: "black",
        backgroundColor: '#EEE',
      }
})


const HeaderTitle = ({ title, searching }) => {
    if(searching)
    {
        return (

            <TextInput placeholder={"Search"} autoCapitalize='characters' style={styles.textInputLogo} autoFocus/>
        );
    }
    else
    {
        return (

            <Text style={styles.logo} numberOfLines={1}>{title}</Text>
        );
    }
}

export default HeaderTitle