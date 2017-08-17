
import React, { Component } from 'react';
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
  TextInput,
  Keyboard,
  Button,
  Alert,
  RefreshControl
 } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BumsLib from '../../../libs/Bums';
import FormatDate from '../../bums/tmpl/formatdate';
import Morebtn from './morebtn';
var BumModel = new BumsLib();

class commentdetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      inputBottomPosition:0,
      inputText:"",
      buttonDisable:false,
      refreshing:false,
      replies:[]
    }
  }

  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon style={{paddingTop:5, paddingBottom:5}} size={30} name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'} />
    ),
  };

  componentWillMount() {
     Keyboard.addListener('keyboardWillShow', this._keyboardWillShow.bind(this));
     Keyboard.addListener('keyboardWillHide', this._keyboardWillHide.bind(this));
  }

  _keyboardWillShow(e) {
    //console.log("_keyboardDidShow",e)
    this.setState({inputBottomPosition: e.endCoordinates.height})
  }

  _keyboardWillHide(e) {
    this.setState({inputBottomPosition: 0})
  }

  _inputChangeText(text){
    var self = this;
    //var newText = text.replace('\n', 'b')

    self.setState({
      inputText:text
    });
  }

  _postReply(){
    var self = this;

    if(self.props.navigation.state.params._id && self.props.screenProps.user && !self.state.buttonDisable){
      var data = {
        comment_id:self.props.navigation.state.params._id,
        description:self.state.inputText,
        token:self.props.screenProps.user.token
      }
      self.setState({
        buttonDisable:true
      });
      BumModel.addReply(data,function(result){
        if(result && result.errors){
          Alert.alert(
            result.errors[0].title,
            result.errors[0].detail,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          );
        } else {
          console.log("commentdetail._postReply",result);
          var newComment = self.state.replies;
          newComment.unshift(result.data)
          self.setState({
            buttonDisable:false,
            inputText:"",
            replies:newComment
          });
        }
      });
    } else {
      self.props.navigation.navigate("ProfileStack");
    }
  }

  _getReplies(){
    var self = this;
    if(self.props.navigation.state.params._id){
      BumModel.getReplies(self.props.navigation.state.params._id,function(result){
        if(result && result.errors){
          Alert.alert(
            result.errors[0].title,
            result.errors[0].detail,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          );
        } else {
          self.setState({
            refreshing: false,
            replies:result.data
          });
        }
      });
    } else {
      Alert.alert(
        "Error Bum Replies could not find",
        "Could not find bum id",
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      );
    }

  }

  componentDidMount(){
    this._onRefresh();
  }

  _onRefresh() {
    var self = this;

    self.setState({refreshing: true});
    self._getReplies();
  }

  render() {
    var self = this;
    var buttonDisable = true;
    if(!self.state.inputText){
      buttonDisable = true;
    } else if(self.state.buttonDisable){
      buttonDisable = true;
    } else {
      buttonDisable = false;
    }

    return(
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
        {self.state.replies.map(function(obj, i){
          return(
            <View key={i} style={styles.replyContainer}>
              <View style={styles.replyImageContainer}>
                <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
           style={{width: 30, height: 30, borderRadius:15}} />
              </View>
              <View style={styles.replyDetailContainer}>
                <View style={styles.profileContainer}>
                  <View style={styles.profileInfoContainer}>
                    <Text style={styles.profileInfoName}>{obj.created_by.name}</Text>
                    <Text style={{paddingBottom:5}}> . </Text>
                    <FormatDate created_date={obj.created_date}/>
                  </View>
                  <Morebtn navigation={self.props.navigation} _id={obj._id} _typeOfBtn="reply" _createdBy={obj.created_by.email} _user={self.props.screenProps.user} />
                </View>
                <View>
                  <Text>{obj.description}</Text>
                </View>
              </View>
            </View>
          );
        })
      }
        </ScrollView>
        {self.props.screenProps.user &&
          <View style={[styles.inputContainer,{bottom:self.state.inputBottomPosition}]}>
            <TextInput
              blurOnSubmit={true}
              placeholderTextColor={"#ccc"}
              placeholder={'Write your comment...'}
              onChangeText={(text) => this._inputChangeText(text)}
              value={this.state.inputText}
              style={styles.inputText}/>
              <Button disabled={buttonDisable} color="#2196f3" style={{backgroundColor:"#2196f3"}} onPress={()=>self._postReply()} title="Post"/>
          </View>
        }

      </View>

    );
  }
}
  const styles = StyleSheet.create({
    container:{
      flex:1
    },
    inputContainer:{
      position: 'absolute',
      left: 0,
      right: 0,
      padding:5,
      backgroundColor:"#d5d5d5",
      flexDirection:"row"
    },
    inputText:{
      flex:1,
      paddingLeft:10,
      fontSize:14,
      color:"#000",
      backgroundColor:"#fff"
    },
    replyContainer:{
      flexDirection:"row",
      padding:5,
      backgroundColor:"#fff",
      marginBottom:5
    },
    replyImageContainer:{
      //marginRight:5
    },
    replyDetailContainer:{
      padding:5,
      flexDirection:"column",
      flex:1
    },
    profileContainer:{
      flexDirection:"row",
      justifyContent:"space-between"
    },
    profileInfoContainer:{
      flexDirection:"row",
      alignItems:"center",
      marginBottom:6
    },
    profileInfoName:{
      fontWeight:'bold'
    }
  });
module.exports = commentdetail;
