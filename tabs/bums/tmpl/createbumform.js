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
  TextInput,
  Image,
  ListView,
  Switch,
  Platform,
  Button
 } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Camera from 'react-native-camera';
var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
var LATITUDE = 37.78825;
var LONGITUDE = -122.4324;
var LATITUDE_DELTA = 0.0022;
var LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class CreateBumForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      bumNameText:"",
      bumStreetAddressText:"",
      bums:[],
      bumZipCodeText:"",
      imCurrentlyHereButton:false,
      region:{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      draggableMarker:{
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      statusBarHeight:199
    };
    this._bumNameChangeText.bind(this);
    this._bumStreetAddressChangeText.bind(this);
    this._bumZipCodeChangeText.bind(this);
    this._imCurrentlyHereOnClick.bind(this);
    this._getUserCurrentlocation.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    return {tabBarLabel: '',
    headerTitle:'Map',
    title:'Create Bums',
    headerRight:(
      <Button title={'Create'} onPress={()=>console.log('CreateBumForm.navigationOptions',navigation.state)} />
    ),}
  };

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }

  _bumNameChangeText(text){
    var self = this;
    self.setState({
      bumNameText:text
    });
  }

  _bumStreetAddressChangeText(text){
    var self = this;
    self.setState({
      bumStreetAddressText:text
    });
  }

  _bumZipCodeChangeText(text){
    var self = this;
    self.setState({
      bumZipCodeText:text
    });
  }

  _imCurrentlyHereOnClick(){
    var self = this;
    var value = !self.state.imCurrentlyHereButton;
    this.setState({
      imCurrentlyHereButton:value
    });
    if(value){
      this._getUserCurrentlocation();
      self.setState({
        statusBarHeight:201
      });
    }

  }

  _getUserCurrentlocation(){
    var self = this;
    navigator.geolocation.getCurrentPosition (
      (position) => {
        //alert("Lat: " + position.coords.latitude + "\nLon: " + position.coords.longitude);
        LATITUDE = position.coords.latitude;
        LONGITUDE = position.coords.longitude;
        self.setState({
          region:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA}
        });
      },
      function(error){console.log(error.message)},

    );
  }

  _onRegionChangeComplete(region){
    LATITUDE = region.latitude;
    LONGITUDE = region.longitude;
    this.setState({
      region:region,
      draggableMarker:{
        latitude: region.latitude,
        longitude: region.longitude
      }
    });
  }

  _updatingDragableMaker(e){
    //console.log('CreateBumForm._updatingDragableMaker',e.nativeEvent.coordinate);
    LATITUDE = e.nativeEvent.coordinate.latitude;
    LONGITUDE = e.nativeEvent.coordinate.longitude;
    this.setState({
      draggableMarker:{
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude
      }
    });
  }

  componentDidMount(){
  }

  componentWillMount() {
    setTimeout(()=>this.setState({statusBarHeight: 200}),500);
  }
  //{uri:self.props.bum.links[0].url}
  render() {
    var self = this;

    return(
      <ScrollView style={styles.container}>
        <Text style={styles.sessionContainerText}>Basic Info</Text>
        <View style={styles.sessionContainer}>
          <View style={[styles.bumCreateInputContainer]}>
            <TextInput
              multiline = {false}
              style={styles.bumCreateInput}
              onChangeText={(text) => this._bumNameChangeText(text)}
              placeholder={'Name'}
              value={this.state.bumNameText}
            />
          </View>
        </View>
        <Text style={styles.sessionContainerText}>Location</Text>
        <View style={styles.sessionContainer}>
          <View style={[styles.bumCreateInputContainer,{borderBottomWidth:StyleSheet.hairlineWidth}]}>
            <TextInput
              multiline = {false}
              style={styles.bumCreateInput}
              onChangeText={(text) => this._bumStreetAddressChangeText(text)}
              placeholder={'Street Address'}
              value={this.state.bumStreetAddressText}
            />
          </View>
          <View style={styles.bumCreateInputContainer}>
            <TextInput
              multiline = {false}
              style={styles.bumCreateInput}
              onChangeText={(text) => this._bumZipCodeChangeText(text)}
              placeholder={'ZIP Code'}
              value={this.state.bumZipCodeText}
            />
          </View>
        </View>
        <Text style={styles.sessionContainerText}>Map</Text>
        <View >
        <MapView
          style={[styles.mapView,{height: this.state.statusBarHeight }]}
          onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
          showsUserLocation={true}
          showsMyLocationButton={true}
          showsScale={true}
          showsCompass={true}
          showsPointsOfInterest={true}
          showsBuildings={true}
          region={this.state.region}
          onPress={this._updatingDragableMaker.bind(this)}
          initialRegion={this.state.region}
        >
          <MapView.Marker draggable
            coordinate={this.state.draggableMarker}
            onDragEnd={this._updatingDragableMaker.bind(this)}
          />

        </MapView>
        </View>

        <View style={[styles.sessionContainer,{paddingTop:5,paddingBottom:5,marginTop:5,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}]}>
          <Text>I am currently here</Text>
          {Platform.OS == "ios" ?
            (<Switch value={this.state.imCurrentlyHereButton} onValueChange={()=>this._imCurrentlyHereOnClick()}/>)
            :(<Text>click on the map icon</Text>)
          }

        </View>
      </ScrollView>
    );

  }
}
const styles = StyleSheet.create({
  container:{
    paddingTop:10
  },
  sessionContainerText:{
    color:'#6b6b6b',
    marginTop:5,
    marginLeft:10,
    marginBottom:5
  },
  sessionContainer:{
    paddingRight:5,
    paddingLeft:5,
    backgroundColor:'#fff'
  },
  bumCreateInputContainer:{
    borderBottomColor:'#ccc',
    alignItems:'center',
    flexDirection:'row'
  },
  bumCreateInput: {
    height: 40,
    paddingLeft:5,
    paddingRight:5,
    flex:1
  },
  mapView: {
    flex:1,
    height:202
  }
});
module.exports = CreateBumForm;
