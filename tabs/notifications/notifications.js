
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
  Image,
  RefreshControl
 } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginView from '../profile/tmpl/login';

class notifications extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing:false
    };
    //console.log('bumdetail.constructor',this.props.screenProps);
  }

  static navigationOptions = ({navigation}) => {
    console.log('Map.navigationOptions',navigation);
    return {tabBarLabel: 'Notifications',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon style={{paddingTop:5, paddingBottom:5}} size={30} name={focused ? 'ios-notifications' : 'ios-notifications-outline'} />
    ),
    headerTitle:'Notifications',
    title:'Notifications'
    }
  }

  _getBumDetail(_id){
    console.log('bumdetail._getBumDetail',_id);
    //added later
    //this.setState()
  }

  componentDidMount(){

    //setTimeout(()=>this.setState({statusBarHeight: 1}),500);
    //this._getBumDetail(state.params._id);
  }
  render() {
    const {state} = this.props.navigation;
    var self = this;
    if(this.props.screenProps.user == null){
      return (
        <LoginView signOut={self.props.screenProps.signOut} signIn={self.props.screenProps.signIn}/>
      )
    } else {
      return(
        <ScrollView style={styles.container}>
          <TouchableOpacity>
            <View style={styles.notificationContainer}>

                <View style={styles.notificationProfileContainer}>
                  <Image source={{uri: "https://res.cloudinary.com/dsthiwwp4/image/upload/v1514829991/5a4a78a64cd08d0012a8c7ba.jpg"}}
             style={{width: 40, height: 40, borderRadius:20}} />
                </View>
                <View style={[styles.notificationContentConatiner]}>
                  <View style={styles.notificationContent}><Text>Bert_actley</Text><Text> liked your post</Text></View>
                </View>

            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.notificationContainer}>

                <View style={styles.notificationProfileContainer}>
                  <Image source={{uri: "https://res.cloudinary.com/dsthiwwp4/image/upload/v1514829991/5a4a78a64cd08d0012a8c7ba.jpg"}}
             style={{width: 40, height: 40, borderRadius:20}} />
                </View>
                <View style={[styles.notificationContentConatiner]}>
                  <View style={styles.notificationContent}><Text>Bert_actley</Text><Text> commented on your post</Text></View>
                </View>

            </View>
          </TouchableOpacity>
        </ScrollView>
      );
    }

  }
}
  const styles = StyleSheet.create({
    container:{
      flex:1
    },
    notificationContainer:{
      flex:1,
      flexDirection: 'row',
      backgroundColor:"#fff",

    },
    notificationProfileContainer:{
      backgroundColor:"#fff",
      padding:5,

    },
    notificationContentConatiner:{
      flex:1,
      justifyContent: 'center',

    },
    notificationContent:{
      flexDirection: 'row'
    }
  });
module.exports = notifications;
