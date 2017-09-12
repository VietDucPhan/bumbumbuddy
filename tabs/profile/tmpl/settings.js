import React, {Component} from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthLib from '../../../libs/Auth';
import Loading from '../../../commons/loading';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  Slider,
  Text,
  ScrollView,
  Button,
  TextInput
} from 'react-native';

var Auth = new AuthLib();

class SettingView extends Component {
  constructor(props){
    super(props);
    this.state = {
      radius:2,
      username:this.props.screenProps.user.username
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      tabBarLabel: '',
      headerTitle:'Settings',
      title:'Settings',
      headerRight:(
        <Button title="Save" onPress={()=>{}} />
      )
    }

  };



  _onValueChange(e){
    var self = this;
    self.setState({
      radius:e
    });
  }

  _inputChangeText(text){
    var self = this;
    //var newText = text.replace('\n', 'b')
    var newText = text.replace(/[^a-z0-9._-]/gi, '_').replace(/_{2,}/g, '_').replace(/-{2,}/g, '_').toLowerCase();
    self.setState({
      username:newText
    });
  }

  render(){
    var self = this;
      return (
        <ScrollView style={styles.container}>

          <Text style={styles.settingLable}>Profile</Text>
          <View style={styles.settingSessionContainer}>
            {self.props.screenProps.user &&
              <TextInput
                style={[styles.textInput]}
                onChangeText={(text) => self._inputChangeText(text)}
                value={self.state.username}
                returnKeyType={"done"}
                placeholderTextColor={"#ccc"}
              />
            }
          </View>

          <Text style={styles.settingLable}>Bums radius</Text>
          <View style={styles.settingSessionContainer}>
            <View style={{alignItems:'center'}}><Text>{self.state.radius} Km</Text></View>
              <Slider
              onValueChange={self._onValueChange.bind(this)}
              onSlidingComplete={(e)=>(console.log("SettingView",e))}
              style={styles.radiusBarLength} step={1} value={self.state.radius} minimumValue={1} maximumValue={10} />

          </View>

        </ScrollView>
      )

  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    backgroundColor:"#e8e8e8"
  },
  radiusBarLength:{
    flex:1
  },
  settingSessionContainer:{
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'column',
    borderColor: '#ccc',
    marginBottom:10,
    paddingTop:10,
    paddingLeft:5,
    paddingRight:5,
    backgroundColor:"#fff"
  },
  settingLable:{
    color:"#bbb"
  },
  loginBtn:{
    marginBottom:10
  },
  textInput:{
    height:25,
  }
});
module.exports = SettingView;
