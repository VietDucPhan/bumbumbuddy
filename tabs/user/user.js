/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  AppRegistry,
  View,
  Dimensions,
  TouchableOpacity,
  Navigator,
  Text,
  Platform
 } from 'react-native';
import AuthLib from '../../libs/Auth';
import LoginView from '../../scenes/login';
var Auth = new AuthLib();

class user extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:null
    }
  }

  logout(){
    Auth.signOutBoth();
  }

  facebookLogin(){

  }
  googleLogin(){

  }

  render() {
    return (
      <LoginView/>
    )
  }
}
  const styles = StyleSheet.create({
    container:{
      flex:1,
      width: Dimensions.get('window').width,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'white'
    },
    loginBtn:{
      marginBottom:10
    }
  });
module.exports = user;
