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
  ScrollView,
  Image
 } from 'react-native';
import AuthLib from '../../libs/Auth';
import LoginView from './tmpl/login';
import Icon from 'react-native-vector-icons/Ionicons';
var Auth = new AuthLib();

class profile extends Component {
  constructor(props){
    super(props);
    var self = this;
    this.state = {
      user:this.props.screenProps.user
    };
  }

  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon style={{paddingTop:5}} size={30} name={focused ? 'ios-person' : 'ios-person-outline'} />
    )
  };

  componentDidMount(){

  }
  //
  render() {
    if(this.state.user == null){
      return (
        <LoginView signOut={this.props.screenProps.signOut} signIn={this.props.screenProps.signIn}/>

      )
    } else {
      return (
          <ScrollView style={{backgroundColor:"#e8e8e8"}}>
            <View style={styles.profileContainer}>
              <View>
              <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
         style={{width: 128, height: 128, borderRadius:64}} />
              </View>

              <View style={styles.profileName}>
                <Text>{this.state.user.name}</Text>
              </View>

            </View>
            <View style={styles.profileNavigatorContainer}>
              <TouchableOpacity style={styles.profileButtonNavigator} >
                <Text>Bums</Text>
                <Icon size={20} name="ios-arrow-forward" backgroundColor="#4267b2"/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.profileButtonNavigator,styles.profileButtonNavigatorLastChild]} >
                <Text>Comments</Text>
                <Icon size={20} name="ios-arrow-forward" backgroundColor="#4267b2"/>
              </TouchableOpacity>

            </View>


            <View style={styles.profileNavigatorContainer}>
              <TouchableOpacity style={styles.profileButtonNavigator} >
                <Text>Privacy Policy</Text>
                <Icon size={20} name="ios-arrow-forward" backgroundColor="#4267b2"/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.profileButtonNavigator} >
                <Text>Terms</Text>
                <Icon size={20} name="ios-arrow-forward" backgroundColor="#4267b2"/>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.profileButtonNavigator,styles.profileButtonNavigatorLastChild]} >
                <Text>Open Sources Libraries</Text>
                <Icon size={20} name="ios-arrow-forward" backgroundColor="#4267b2"/>
              </TouchableOpacity>
            </View>


            <View style={styles.profileNavigatorContainer}>
              <TouchableOpacity style={[styles.profileButtonNavigator,styles.profileButtonNavigatorLastChild]} >
                <Text>Settings</Text>
                <Icon size={20} name="ios-arrow-forward" backgroundColor="#4267b2"/>
              </TouchableOpacity>
            </View>

            <View style={styles.profileNavigatorContainer}>
              <TouchableOpacity
                onPress={() => this.props.screenProps.signOut()}
                style={[styles.profileButtonNavigator,styles.profileButtonNavigatorLastChild]} >
                <Text>Sign Out</Text>
                <Icon size={20} name="ios-log-out" backgroundColor="#4267b2"/>
              </TouchableOpacity>
            </View>
          </ScrollView>
      )
    }
  }
}
  const styles = StyleSheet.create({
    profileContainer:{
      flex:1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"#fff",
      paddingBottom:15
    },
    profileNavigatorContainer:{
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#ccc',
      marginTop:10,
      paddingTop:10,
      paddingLeft:5,
      paddingRight:5,
      backgroundColor:"#fff"
    },
    profileName:{
      marginTop:10
    },
    profileButtonNavigator:{
      marginBottom:10,
      flexDirection: 'row',
      padding:5,
      //flex:1,
      //justifyContent:'flex-end',
      justifyContent: 'space-between',
      //backgroundColor:'#000'
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#ccc'
    },
    profileButtonNavigatorLastChild:{
      borderBottomWidth:0
    }
  });
module.exports = profile;
