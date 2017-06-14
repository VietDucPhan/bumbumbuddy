import React, {Component} from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthLib from '../libs/Auth';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Dimensions
} from 'react-native';

var Auth = new AuthLib();

class LoginView extends Component {
  constructor(props){
    super(props);
    this.state = {user:null}
  }
  facebookLogin(){
    var self = this;
    Auth.signInWithFacebook(function(err,res){
      console.log('error', err);
      if(err){
        self.props.navigator.pop();
      }

    });
  }
  googleLogin(){
    var self = this;

    Auth.signInWithGoogle(function(err,res){
      if(err){
        self.props.navigator.pop();
      }

    });
  }

  render(){
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.loginBtn} >
          <Icon.Button onPress={this.facebookLogin.bind(this)} name="facebook" backgroundColor="#4267b2">
            Login with Google
          </Icon.Button>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} >
          <Icon.Button onPress={this.googleLogin.bind(this)} name="google" backgroundColor="#dd4b39">
            Login with Google
          </Icon.Button>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    width: Dimensions.get('window').width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
  loginBtn:{
    marginBottom:10
  }
});
module.exports = LoginView;
