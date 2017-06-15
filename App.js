import React from 'react';
import { StyleSheet, Text, View, NetInfo } from 'react-native';
import BumBuddyTabs from './BumBuddyTabs';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import UserTab from './tabs/user/user';
import CommentsTab from './tabs/comments/comments';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    //AsyncStorage.removeItem('user',function(){});
    this.state = {
      isConnected:null
    };
    this._handleConnectivityChange = this._handleConnectivityChange.bind(this);
  }

  componentWillMount(){

  }
  componentDidMount() {
    var self = this;
    NetInfo.isConnected.addEventListener(
        'change',
        self._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
        (isConnected) => { self.setState({isConnected}); }
    );
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
            <CommentsTab goToUserPage={() => this._goToUserPage()} tabLabel="ios-funnel-outline" style={{flex:1, alignItems:"center"}} />
            <UserTab tabLabel="ios-person-outline" style={{flex:1, alignItems:"center"}} />
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
