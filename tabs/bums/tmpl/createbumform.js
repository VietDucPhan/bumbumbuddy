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
  ListView
 } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Camera from 'react-native-camera';
var { width, height } = Dimensions.get('window');


class CreateBumForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      bumNameText:"",
      bumStreetAddressText:"",
      bums:[]
    };
    this._bumNameChangeText.bind(this);
    this._bumStreetAddressChangeText.bind(this);
  }

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

  componentDidMount(){
  }

  componentWillMount() {
  }
  //{uri:self.props.bum.links[0].url}
  render() {
    var self = this;

    return(
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.bumCreateInputContainer,{borderBottomWidth:StyleSheet.hairlineWidth}]}>
            <TextInput
              multiline = {false}
              style={styles.bumCreateInput}
              onChangeText={(text) => this._bumNameChangeText(text)}
              placeholder={'Name'}
              value={this.state.bumNameText}
            />
          </View>
          <View style={styles.bumCreateInputContainer}>
            <TextInput
              multiline = {false}
              style={styles.bumCreateInput}
              onChangeText={(text) => this._bumStreetAddressChangeText(text)}
              placeholder={'Street Address'}
              value={this.state.bumStreetAddressText}
            />
          </View>
        </View>
      </ScrollView>
    );

  }
}
const styles = StyleSheet.create({
  container: {
    padding:5,
    flexDirection:'column',
    flex:1
  },
  bumCreateInputContainer:{
    paddingTop:5,
    paddingBottom:5,
    borderBottomColor:'#ccc',
  },
  bumCreateInput: {
    height: 30,
    paddingLeft:5,
    paddingRight:5,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
module.exports = CreateBumForm;
