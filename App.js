import React, { Component } from 'react';
import { StyleSheet, Text, View, NetInfo } from 'react-native';
import BumBuddyTabs from './BumBuddyTabs';
var ScrollableTabView = require('react-native-scrollable-tab-view');

import AuthLib from './libs/Auth';
import { StackNavigator, TabNavigator } from 'react-navigation';

import ProfileTab from './tabs/profile/profile';
import CommentsTab from './tabs/comments/comments';
import CommentDetailStack from './tabs/comments/tmpl/commentdetail';

const TabsNotLogedIn  = TabNavigator({
  Comments : { screen: CommentsTab },
  Profile : { screen: ProfileTab },
},
{
  tabBarOptions:{
    showLabel:false
  }
});

const TabsLogedIn  = TabNavigator({
  Home : { screen: CommentsTab },
  Profile : { screen: ProfileTab },
},
{
  tabBarOptions:{
    showLabel:false
  }
});

const StackNotLogedIn = StackNavigator({
  Main:{screen:TabsNotLogedIn},
  CommentDetail:{screen:CommentDetailStack}
});
const StackLogedIn = StackNavigator({
  Main:{screen:TabsNotLogedIn},
  CommentDetail:{screen:CommentDetailStack}
});

var Auth = new AuthLib();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //AsyncStorage.removeItem('user',function(){});
    this.state = {
      isConnected:null,
      user:null
    };
    this._handleConnectivityChange = this._handleConnectivityChange.bind(this);
    //this._signIn = this._signIn.bind(this)
  }

  _signOut(){
    var self = this;
    console.log('App._signOut',this.state);
    Auth.signOutBoth(function(response){
      self.setState({user:null});
    });
  }

  _signIn(){
    var self = this;
    Auth.isLogedIn(function(response){
      console.log('App._signIn');
      self.setState({
        user:response
      });
    });
  }

  componentWillMount(){

  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentDidMount() {
    var self = this;
    Auth.isLogedIn(function(response){
      //console.log('user.componentDidMount', response);
      self.setState({
        user:response
      });
    });
    NetInfo.isConnected.addEventListener(
      'change',
      self._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
      (isConnected) => { self.setState({isConnected});
    });
  }
  componentWillUnmount() {
    var self = this;
    NetInfo.isConnected.removeEventListener(
        'change',
        self._handleConnectivityChange
    );
  }
  _handleConnectivityChange(isConnected) {
    console.log("_handleConnectivityChange", isConnected);
    this.setState({
      isConnected,
    });
  }

  render() {
    var self = this;
    if(!this.state.isConnected){
      return (
        <View style={{flex:1,paddingTop:25,alignItems:"center", flexDirection:'column'}}>
          <Text>Network is not connected</Text>
        </View>
      );
    } else {
      if(this.state.user == null){
        return (
          <StackNotLogedIn screenProps={{
            user:self.state.user,
            signIn:self._signIn.bind(this),
            signOut:self._signOut.bind(this)
          }} />
        );
      } else {
        return (
          <StackLogedIn screenProps={{
            user:self.state.user,
            signIn:self._signIn.bind(this),
            signOut:self._signOut.bind(this)
          }} />
        );
      }

    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
