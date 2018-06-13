import React, { Component } from 'react';
import { StyleSheet, Text, View, NetInfo, Platform, PushNotificationIOS, AlertIOS } from 'react-native';
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

import AuthLib from './libs/Auth';
import CacheLib from './libs/Cache';
import { StackNavigator, TabNavigator, NavigationActions } from 'react-navigation';
//Tabs
import ProfileTab from './tabs/profile/profile';
import CommentsTab from './tabs/comments/comments';
import MapTab from './tabs/map/map';
import NotificationTab from './tabs/notifications/notifications';
//Stacks
import CommentDetailStack from './tabs/comments/tmpl/commentdetail';
import BumDetailStack from './tabs/bums/tmpl/bumdetail';
import AddCommentStack from './tabs/bums/tmpl/commentform';
import CreateBumStack from './tabs/bums/tmpl/createbumform';
import SearchStack from './tabs/search/search';
import SettingsStack from './tabs/profile/tmpl/settings';
import CommentStack from './tabs/comment/comment';
import CameraStack from './commons/camera';
import UserDetailStack from './tabs/profile/tmpl/userdetail';


const tabBarOptions = {
  showLabel:false,
  showIcon:true,
  style: {
    backgroundColor:'#fff'
  },
  indicatorStyle:{
    display:'none'
  }
}

const tabsManagement = {
  Comments : { screen: CommentsTab },
  Map:{screen:MapTab},
  Notificiations:{screen:NotificationTab},
  Profile : { screen: ProfileTab }
}

var tabNavigatorOptions = {
  tabBarOptions:tabBarOptions,
  tabBarPosition:'bottom',
  animationEnabled:false,
  lazy:false
}

if(Platform.OS === "ios"){
  tabNavigatorOptions.lazy = true;
}

const Tabs = TabNavigator(
  tabsManagement,
  tabNavigatorOptions
);

const stackMangement = {
  Main:{screen:Tabs},
  CommentDetail:{screen:CommentDetailStack},
  BumDetail:{screen:BumDetailStack},
  CreateBumForm:{screen:CreateBumStack},
  SearchPage:{screen:SearchStack},
  AddCommentPage:{screen:AddCommentStack},
  ProfileStack : { screen: ProfileTab },
  SettingsStack:{ screen:SettingsStack },
  CommentStack:{screen:CommentStack},
  UserDetailStack:{screen:UserDetailStack},
  CameraStack:{screen:CameraStack}
}
const StackPage = StackNavigator(stackMangement);

var Auth = new AuthLib();
var Cache = new CacheLib();



// this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
FCM.on(FCMEvent.Notification, async (notif) => {
  //console.log('FCMEvent.Notification',notif);
    // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
    //alert("Firebase: " + JSON.stringify(notif));

    // await someAsyncCall();
    //console.log("notif",notif);




    if(Platform.OS ==='ios'){
      switch(notif._notificationType){
        case NotificationType.Remote:
          notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
          break;
        case NotificationType.NotificationResponse:
          notif.finish();
          break;
        case NotificationType.WillPresent:
          notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
          break;
      }
    } else {
      if(!notif.opened_from_tray){
        FCM.presentLocalNotification({
          body: notif.fcm.body,
          show_in_foreground:true,
          priority: "high",
          sound: "default",
          vibrate: 300,
          wake_screen: true,
          my_custom_data:notif.content
        });
      }
    }
});
FCM.on(FCMEvent.RefreshToken, (token) => {
    //alert("FCM.on: "+JSON.stringify(token));
    Cache.setDeviceToken({token:token});
    // fcm token may not be available on first load, catch it here
});

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

  _signIn(callback){
    var self = this;
    Auth.isLogedIn(function(response){
      console.log('App._signIn');
      self.setState({
        user:response
      });
      Cache.setUserSetting(response.settings);
      return callback(true);
    });
  }

  refreshingApp(){

  }

  componentWillMount(){

  }

  componentWillUnmount() {
        // stop listening for events
        this.notificationListener.remove();
    }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentDidMount() {
    var self = this;
    // iOS: show permission prompt for the first call. later just check permission in user settings
    // Android: check permission in user settings
    FCM.requestPermissions().then(()=>console.log('granted')).catch(()=>console.log('notification permission rejected'));

    FCM.getFCMToken().then(token => {
        //console.log(token)
        //alert("FCM.getFCMToken: "+JSON.stringify(token));
        Cache.setDeviceToken({token:token});
        // store fcm token in your server
    });

    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        // optional, do some component related stuff
        console.log('notificationListener componentDidMount');
        if(notif.local_notification){
          //this is a local notification
          var data_payload = JSON.parse(notif.my_custom_data);
          console.log("local_notification",data_payload);

          if(data_payload.typeOfNotification == "voted" || data_payload.typeOfNotification == "replied"){
            console.log("notif.local_notification");
            self.navigator && self.navigator.dispatch(
              NavigationActions.navigate({ routeName: "CommentStack", params:{commentID:data_payload.onID} })
            );
          }
        }
        if(notif.opened_from_tray && notif.content){
          var data_payload = JSON.parse(notif.content);
          if(data_payload.typeOfNotification == "voted" || data_payload.typeOfNotification == "replied"){
            console.log("notif.local_notification");
            self.navigator && self.navigator.dispatch(
              NavigationActions.navigate({ routeName: "CommentStack", params:{commentID:data_payload.onID} })
            );
          }
        }
    });

    // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
    // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
    // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
    FCM.getInitialNotification().then(notif => {
       console.log('getInitialNotification',notif)
    });
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
      return (
        <StackPage ref={nav => { this.navigator = nav; }} screenProps={{
          user:self.state.user,
          signIn:self._signIn.bind(this),
          signOut:self._signOut.bind(this)
        }} />
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
