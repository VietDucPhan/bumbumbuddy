
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
  Alert,
  Slider
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons';
import AuthLib from '../../libs/Auth';
import BumsLib from '../../libs/Bums';
var Auth = new AuthLib();

class comments extends Component {
  constructor(props){
    super(props);
    this.state = {
      bums:null
    }
  }

  static navigationOptions = {
    tabBarLabel: '',
    tabBarIcon: ({ tintColor, focused }) => (
      <Icon style={{paddingTop:5, paddingBottom:5}} size={30} name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'} />
    ),
    headerTitle:'Comments',
    title:'Comments'
  };

  componentDidMount(){
  }

  _calculateImageHeight(imageWidth,dimensionWidth,imageHeight){
    var height = dimensionWidth/imageWidth*imageHeight;
    return {height:height,width:dimensionWidth};
  }

  _getBums(){
    var self = this;
    BumsLib.getBums(function(response){
      self.state.setState({
        bums:response
      });
    });
  }

  alert(){
    var self = this;
    Alert.alert(
      '',
      'Please choose option below',
      [
        {text: 'Report this', onPress: () => console.log('Ask me later pressed')},
        {text: 'Rate this bum', onPress: () => this.props.goToUserPage()},


      ],
      { cancelable: true }
    )
  }

  render() {
    const {navigate} = this.props.navigation;
    return(
      <ScrollView>
        {/* Start a comment */}
        <View style={styles.commentContainer}>
          <View style={styles.commentHeader}>
            <View style={styles.commentorProfilePictureContainer}>
              <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
         style={{width: 30, height: 30, borderRadius:15}} />
            </View>
            <View style={styles.commentorProfileInfoContainer}>
              <View>
                <TouchableOpacity>
                  <Text>Some guy name</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.commentAtPlace}>The Observatory</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Icon style={{padding:5}} onPress={this.alert.bind(this)} size={20} name="ios-more" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Image resizeMode="contain" source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
       style={this._calculateImageHeight(975,Dimensions.get('window').width,512)} />
          </View>
          <View style={styles.commentorCommentContainer}>
            <View>
              <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
               specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
               essentially unchanged.</Text>
            </View>
             <View style={styles.commentPointsAndResponseContainer}>
               <View style={styles.commentPointsAndResponseButtonsContainer}>
                 <TouchableOpacity>
                  <Icon style={styles.commentPointsAndResponseButton} size={20} name="ios-thumbs-up"/>
                 </TouchableOpacity>
                 <TouchableOpacity>
                  <Icon style={styles.commentPointsAndResponseButton} size={20} name="ios-thumbs-down" />
                 </TouchableOpacity>
                 <TouchableOpacity>
                  <Icon style={styles.commentPointsAndResponseButton} size={20} name="ios-chatbubbles"/>
                 </TouchableOpacity>
               </View>

               <Text style={styles.commentPointsAndResponseText}>13 points - 25 replies</Text>
             </View>
          </View>
        </View>
        {/* End a comment */}
        {/* Start a comment */}
        <View style={styles.commentContainer}>
          <View style={styles.commentHeader}>
            <View style={styles.commentorProfilePictureContainer}>
              <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
         style={{width: 30, height: 30, borderRadius:15}} />
            </View>
            <View style={styles.commentorProfileInfoContainer}>
              <View>
                <TouchableOpacity>
                  <Text>Some guy name</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.commentAtPlace}>The Observatory</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Icon style={{padding:5}} onPress={this.alert.bind(this)} size={20} name="ios-more" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Image resizeMode="contain" source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
       style={{width: Dimensions.get('window').width, height: 128}} />
          </View>
          <View style={styles.commentorCommentContainer}>
            <View>
              <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
               specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
               essentially unchanged.</Text>
            </View>
             <View style={styles.commentPointsAndResponseContainer}>
               <View style={styles.commentPointsAndResponseButtonsContainer}>
                 <TouchableOpacity>
                  <Icon style={styles.commentPointsAndResponseButton} size={20} name="ios-thumbs-up"/>
                 </TouchableOpacity>
                 <TouchableOpacity>
                  <Icon style={styles.commentPointsAndResponseButton} size={20} name="ios-thumbs-down" />
                 </TouchableOpacity>
                 <TouchableOpacity>
                  <Icon style={styles.commentPointsAndResponseButton} size={20} name="ios-chatbubbles"/>
                 </TouchableOpacity>
               </View>

               <Text style={styles.commentPointsAndResponseText}>13 points - 25 replies</Text>
             </View>
          </View>
        </View>
        {/* End a comment */}
        {/* Start a comment */}
        <View style={styles.commentContainer}>
          <View style={styles.commentHeader}>
            <View style={styles.commentorProfilePictureContainer}>
              <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
         style={{width: 30, height: 30, borderRadius:15}} />
            </View>
            <View style={styles.commentorProfileInfoContainer}>
              <View>
                <TouchableOpacity>
                  <Text>Some guy name</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.commentAtPlace}>The Observatory</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <Icon style={{padding:5}} onPress={this.alert.bind(this)} size={20} name="ios-more" />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Image resizeMode="contain" source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
       style={{width: Dimensions.get('window').width, height: 128}} />
          </View>
          <View style={styles.commentorCommentContainer}>
            <View>
              <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
               specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
               essentially unchanged.</Text>
            </View>
             <View style={styles.commentPointsAndResponseContainer}>
               <View style={styles.commentPointsAndResponseButtonsContainer}>
                 <TouchableOpacity>
                  <Icon style={styles.commentPointsAndResponseButton} size={20} name="ios-thumbs-up"/>
                 </TouchableOpacity>
                 <TouchableOpacity>
                  <Icon style={styles.commentPointsAndResponseButton} size={20} name="ios-thumbs-down" />
                 </TouchableOpacity>
                 <TouchableOpacity>
                  <Icon style={styles.commentPointsAndResponseButton} size={20} name="ios-chatbubbles"/>
                 </TouchableOpacity>
               </View>

               <Text style={styles.commentPointsAndResponseText}>13 points - 25 replies</Text>
             </View>
          </View>
        </View>
        {/* End a comment */}
      </ScrollView>
    );
  }
}
  const styles = StyleSheet.create({
    commentContainer:{
      flex:1,
      flexDirection: 'column',
      backgroundColor:"#fff",
      marginBottom:15
    },
    commentHeader:{
      flex:1,
      flexDirection: 'row',
      backgroundColor:"#fff",

    },
    commentorProfilePictureContainer:{
      backgroundColor:"#fff",
      padding:5
    },
    commentorProfileInfoContainer:{
      flex:1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-between',
      backgroundColor:"#fff",
      padding:5
    },
    commentAtPlace:{
      fontSize:10
    },
    commentorCommentContainer:{
      flex:1,
      backgroundColor:"#fff",
      padding:10
    },
    commentPointsAndResponseContainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingTop:5,
      paddingBottom:5
    },
    commentPointsAndResponseButtonsContainer:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
    },
    commentPointsAndResponseButton:{
      borderWidth:StyleSheet.hairlineWidth,
      color:'#888',
      borderColor:'#ccc',
      paddingTop:5,
      paddingRight:10,
      paddingBottom:5,
      paddingLeft:10,
      marginRight:5
    },
    commentPointsAndResponseText:{
      color:'#888'
    }
  });
module.exports = comments;
