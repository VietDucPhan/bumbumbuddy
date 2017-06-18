import React, {Component} from 'react';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthLib from '../../../libs/Auth';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  ActivityIndicator
} from 'react-native';

var Auth = new AuthLib();

class LoginView extends Component {
  constructor(props){
    super(props);
    this.state = {
      showActivitiIndicator:false
    }
  }
  facebookLogin(){
    var self = this;
    self.setState({
      showActivitiIndicator:true
    });
    Auth.signInWithFacebook(function(err,res){
      if(err){
        self.props.signIn();
        self.setState({
          showActivitiIndicator:false
        });
      }
    });
  }
  googleLogin(){
    var self = this;
    self.setState({
      showActivitiIndicator:true
    });
    Auth.signInWithGoogle(function(err,res){
      if(err){
        console.log('login.googleLogin', err);
        self.props.signIn();
        self.setState({
          showActivitiIndicator:false
        });
      }
    });
  }

  render(){
    if(this.state.showActivitiIndicator){
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={this.state.showActivitiIndicator}></ActivityIndicator>
        </View>

      );
    } else {
      return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.loginBtn} >
            <Icon.Button onPress={()=>this.props.signOut()} name="facebook" backgroundColor="#4267b2">
              Login with Facebook
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
