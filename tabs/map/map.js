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
var { width, height } = Dimensions.get('window');
var Auth = new AuthLib();

const ASPECT_RATIO = width / height;
var LATITUDE = 37.78825;
var LONGITUDE = -122.4324;
var LATITUDE_DELTA = 0.0922;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;


class Map extends Component {
  constructor(props){
    super(props);
    this.state = {
      region:{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      mapViewHeight:300
    }
    this._locatorOnPress.bind(this);
  }

  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon style={{paddingTop:5, paddingBottom:5}} size={30} name={focused ? 'ios-pin' : 'ios-pin-outline'} />
    ),
    headerTitle:'Map',
    title:'Map'
  };

  _locatorOnPress(){
    var self = this;
    navigator.geolocation.watchPosition (
      (position) => {
        //alert("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
        self.setState({region:{
          longitude:position.coords.longitude,
          latitude:position.coords.latitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        statusBarHeight:0
      });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  _getCurrentPostion(callback){
    this._locatorOnPress();
    if(this.state && this.state.region){
      return callback(true,this.state.region);
    } else {
      return callback(false);
    }

  }

  onRegionChangeComplete(region){
    LATITUDE_DELTA = region.latitudeDelta;
    LONGITUDE_DELTA = region.longitudeDelta;
  }

  componentDidMount(){
    this._locatorOnPress();

  }

  componentWillMount() {
     //Hack to ensure the showsMyLocationButton is shown initially. Idea is to force a repaint
    setTimeout(()=>this.setState({statusBarHeight: 1}),500);
  }
  //
  render() {
    var self = this;
    return(
      <View style={[styles.mapContainer,{paddingTop: this.state.statusBarHeight }]}>
        <MapView
          style={[styles.mapView]}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsScale={true}
          showsCompass={true}
          showsPointsOfInterest={true}
          showsBuildings={true}
          region={this.state.region}
          initialRegion={this.state.region}
        />
      </View>

    );
  }
}
  const styles = StyleSheet.create({
    mapContainer:{
      flex:1,
      justifyContent: 'flex-end',
      alignItems: 'center',

    },
    mapView:{
      flex:1,
      width:width,
      paddingTop:100
    }
  });
module.exports = Map;
