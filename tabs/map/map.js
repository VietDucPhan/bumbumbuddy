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
  Image,
  Button
 } from 'react-native';
import Bums from '../../libs/Bums';
import Callout from './tmpl/callout';
import Icon from 'react-native-vector-icons/Ionicons';
var ImagePicker = require('react-native-image-picker');
var { width, height } = Dimensions.get('window');
var BumsModel = new Bums();

const ASPECT_RATIO = width / height;
var LATITUDE = 37.78825;
var LONGITUDE = -122.4324;
var LATITUDE_DELTA = 0.0022;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};


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
      mapViewHeight:300,
      bums:[]
    }
    this._locatorOnPress.bind(this);
    this.moveToThisRegion.bind(this);
    this.goToBumDetail.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    console.log('Map.navigationOptions',navigation);
    return {tabBarLabel: '',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon style={{paddingTop:5, paddingBottom:5}} size={35} name={focused ? 'ios-pin' : 'ios-pin-outline'} />
    ),
    headerTitle:'Map',
    title:'Create Bums',
    headerRight:(
      <TouchableOpacity onPress={()=>navigation.state.params._onClickHeaderRight()} >
        <Icon style={{padding:10,marginTop:5}} size={22} name="md-add-circle"/>
      </TouchableOpacity>
    ),}
  };

  _getBums(){
    var self = this;
    BumsModel.getBums(function(response){
      if(response != null){
        //console.log('maps._getBums',response);
        self.setState({
          bums:response
        });
      }
    });
  }

  goToBumDetail(_id){
    this.props.navigation.navigate('BumDetail',{_id:_id});
  }

  _locatorOnPress(){
    var self = this;
    navigator.geolocation.getCurrentPosition (
      (position) => {
        console.log("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
        self.setState({region:{
          longitude:position.coords.longitude,
          latitude:position.coords.latitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        statusBarHeight:0
      });
      },
      function(error){console.log('map._locatorOnPress',error)}
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
    //console.log('map.componentWillMount',width);
    LATITUDE_DELTA = region.latitudeDelta;
    LONGITUDE_DELTA = region.longitudeDelta;
  }

  moveToThisRegion(region){
    this.setState({region:{
      longitude:region.longitude,
      latitude:region.latitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }});
  }

  _onClickHeaderRight(){
    var self = this;
    console.log(self.props.screenProps.user);
    if(self.props.screenProps.user != null){
      self.props.navigation.navigate('SearchPage');
    } else {
      self.props.navigation.navigate('Profile');
    }
  }

  componentDidMount(){
    var self = this;
    this._locatorOnPress();
    this._getBums();
    self.props.navigation.setParams({
      _onClickHeaderRight:self._onClickHeaderRight.bind(this)
    });

  }

  componentWillMount() {
    setTimeout(()=>this.setState({statusBarHeight: 1}),500);
  }
  //
  render() {
    var self = this;
    console.log(this.props.screenProps.user);
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
        >
        {self.state.bums.map(function(obj, i){
          console.log(obj);
            return (
              <Callout navigation={self.props.navigation} goToBumDetail={()=>self.goToBumDetail(obj._id)} key={obj._id} bum={obj} />
            );
          })}
        </MapView>
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
    },
    headerRight:{
      padding:5
    }
  });
module.exports = Map;
