import React from 'react';
import { StyleSheet, Text, View, NetInfo } from 'react-native';
import BumBuddyTabs from './BumBuddyTabs';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import ProfileTab from './tabs/profile/profile';
import CommentsTab from './tabs/comments/comments';
import AuthLib from './libs/Auth';

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
  }

  _signOut(){
    var self = this;
    Auth.signOutBoth(function(response){
      self.setState({user:null});
    });
  }

  _signIn(){
    var self = this;
    Auth.isLogedIn(function(response){
      //console.log('user.componentDidMount', response);
      self.setState({
        user:response
      });
    });
  }

  componentWillMount(){

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

  _goToUserPage(){
    this.tabView.goToPage(2);
  }

  render() {
    if(!this.state.isConnected){
      return (
        <View style={{flex:1,paddingTop:15, alignItems:"center"}}>
          <Text>Network is not connected</Text>
        </View>
      );
    } else {
      return (
        <View style={{flex:1,paddingTop:15,backgroundColor:'#fafafa'}}>
          <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <BumBuddyTabs  />}
          ref={(tabView) => { this.tabView = tabView; }}
          tabBarPosition="bottom"
          scrollWithoutAnimation={true}
          >
            <View tabLabel="ios-pin-outline" style={{flex:1, alignItems:"center"}}>
              <Text>Tab 1</Text>
            </View>
            <CommentsTab
              goToUserPage={this._goToUserPage.bind(this)}
              user={this.state.user}
              tabLabel="ios-funnel-outline"
              style={{flex:1, alignItems:"center"}}
            />
            <ProfileTab
              signIn={this._signIn.bind(this)}
              signOut={this._signOut.bind(this)}
              user={this.state.user}
              tabLabel="ios-person-outline"
              style={{flex:1, alignItems:"center"}} />
          </ScrollableTabView>
        </View>

      );
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
