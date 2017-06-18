import React, { Component } from 'react';
import MapView from 'react-native-maps';
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
import Icon from 'react-native-vector-icons/Ionicons';
var Auth = new AuthLib();

class Map extends Component {
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
      <Icon style={{paddingTop:5, paddingBottom:5}} size={30} name={focused ? 'ios-pin' : 'ios-pin-outline'} />
    ),
    headerTitle:'Map',
    title:'Map'
  };

  componentDidMount(){

  }
  //
  render() {
    return(
      <View style={{flex:1}}>
        <MapView
          style={{flex:1}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>

    );
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
module.exports = Map;
