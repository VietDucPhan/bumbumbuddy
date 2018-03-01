
import React, { Component } from 'react';
import {
  StyleSheet,
  View
 } from 'react-native';

 import BumsLib from '../../../libs/Bums';
 var BumModel = new BumsLib();

class userinfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing:false,
      userInfo:null
    };
    //console.log('bumdetail.constructor',this.props.screenProps);
  }

  _getUserInfo(){
    var self = this;
    if(self.props.user_id){
      BumModel.getUserProfileInfo(self.props.user_id,function(result){
        console.log("_getUserInfo",result);
        if(result && result.errors){
          Alert.alert(
            result.errors[0].title,
            result.errors[0].detail,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          )
        } else {
          self.setState({
            userInfo:result.data
          });
        }
      });
    }
  }

  componentDidMount(){
    var self = this;
    //navigationOptions.headerTitle = self.props.navigation.state.params.username
    //setTimeout(()=>this.setState({statusBarHeight: 1}),500);
    //this._getBumDetail(state.params._id);
  }

  render() {
    const {state} = this.props.navigation;
    var self = this;
    return(
      <View style={styles.container}>

      </View>
    );
  }
}
  const styles = StyleSheet.create({
    container:{
      flex:1
    }
  });
module.exports = userinfo;
