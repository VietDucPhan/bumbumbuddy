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
    this.facebookLogin = this.facebookLogin.bind(this);
  }
  facebookLogin(){
    var self = this;
    console.log("login.facebookLogin");
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
    var self = this;
    if(this.state.showActivitiIndicator){
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={this.state.showActivitiIndicator}></ActivityIndicator>
        </View>

      );
    } else {
      return (
        <View style={styles.container}>
            <View style={styles.loginBtn}>
              <Icon.Button onPress={()=>self.facebookLogin()} name="facebook" backgroundColor="#4267b2">
                Login with Facebook
              </Icon.Button>
            </View>

            <Icon.Button onPress={()=>self.googleLogin()} name="google" backgroundColor="#dd4b39">
              Login with Google
            </Icon.Button>
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
