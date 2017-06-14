import React from 'react';
import { StyleSheet, Text, View, NetInfo } from 'react-native';
import BumBuddyTabs from './BumBuddyTabs';
var ScrollableTabView = require('react-native-scrollable-tab-view');
import UserTab from './tabs/user/user';

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

  render() {
    if(!this.state.isConnected){
      return (
        <View style={{flex:1, alignItems:"center"}}>
          <Text>Network is not connected</Text>
        </View>
      );
    } else {
      return (
        <View style={{flex:1,paddingTop:15,backgroundColor:'#fafafa'}}>
          <ScrollableTabView
          initialPage={0}
          renderTabBar={() => <BumBuddyTabs  />}
          tabBarPosition="bottom"
          scrollWithoutAnimation={true}
          >
            <View tabLabel="ios-pin-outline" style={{flex:1, alignItems:"center"}}>
              <Text>Tab 1</Text>
            </View>
            <View tabLabel="ios-funnel-outline" style={{flex:1, alignItems:"center"}}>
              <Text>Tab 2</Text>
            </View>
            <UserTab tabLabel="ios-funnel-outline" style={{flex:1, alignItems:"center"}} />
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
