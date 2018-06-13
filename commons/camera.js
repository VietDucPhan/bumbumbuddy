
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import {
  StyleSheet,
  AppRegistry,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Text,
  ActivityIndicator
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons';
 import MediaMeta from 'react-native-media-meta';
 import UploadLib from '../libs/Upload';
 var UploadModel = new UploadLib();

class Camera extends Component {
  constructor(props){
    super(props);
    this.state = {
      closeBtn: true
    };
  }

  componentDidMount(){}

  recordVideo = async function() {
    if (this.camera) {
      const options = {
        maxDuration:7,
        mute:true

      };
      this.camera.recordAsync(options).then(data => {
        console.log(data);
        MediaMeta.get(data.uri)
          .then(metadata => console.log(metadata))
          .catch(err => console.error(err));
      });
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.recordVideo.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});
module.exports = Camera;
