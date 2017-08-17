
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
  RefreshControl
 } from 'react-native';
 import CommentsView from '../../comments/comments';
 import RatingView from '../../bums/tmpl/rating';
 import CommentFormView from './commentform'
import Icon from 'react-native-vector-icons/Ionicons';

class bumdetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing:false
    };
    //console.log('bumdetail.constructor',this.props.screenProps);
  }

  _getBumDetail(_id){
    console.log('bumdetail._getBumDetail',_id);
    //added later
    //this.setState()
  }

  componentDidMount(){

    //setTimeout(()=>this.setState({statusBarHeight: 1}),500);
    //this._getBumDetail(state.params._id);
  }

  _addComment(){
    var self = this;
    if(self.props.screenProps.user){
      self.props.navigation.navigate("AddCommentPage",{_id:self.props.navigation.state.params._id,update:self._onRefresh.bind(this)})
    } else {
      self.props.navigation.navigate('ProfileStack');
    }
  }
  _onRefresh(){
    var self = this;
    this.setState({refreshing: true});
  }

  _finishedRefreshing(){
    this.setState({refreshing: false});
  }
  render() {
    const {state} = this.props.navigation;
    var self = this;
    return(
      <View style={styles.container}>
        <ScrollView style={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
        >
          <View style={styles.bumDetailInfoContainer}>
            <RatingView navigation={self.props.navigation} _user={self.props.screenProps.user} refreshing={self.state.refreshing}  showRating={true} _id={state.params._id} />
          </View>

          <TouchableOpacity onPress={()=>self._addComment()} style={styles.containerTextYourBum}>
            <View style={styles.textInputContainer}>
              <Text style={[styles.textInput]}>
                Text your bum
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.actionLeft}>
                <View style={styles.button}>
                  <Icon style={styles.buttonIcon} size={25} name="ios-image" color="#2f8ef9"/>
                  <Text>Photo</Text>
                </View>

              </View>
              <View style={styles.actionRight}>
                <View style={styles.button}>
                  <Icon style={styles.buttonIcon} size={25} name="ios-pulse-outline" color="orange"/>
                  <Text>Rate this bum</Text>
                </View>
              </View>
            </View>
            <View>
            </View>
          </TouchableOpacity>

          <CommentsView screenProps={{user:self.props.screenProps.user}} finsihedRefreshing={self._finishedRefreshing.bind(this)} refreshing={self.state.refreshing} _id={state.params._id} navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    );
  }
}
  const styles = StyleSheet.create({
    container:{
      flex:1
    },
    containerTextYourBum:{
      padding:5,
      backgroundColor:"white",
      marginBottom:5
    },
    actionContainer:{
      flexDirection: 'row',
      paddingTop:5,
      borderTopWidth:StyleSheet.hairlineWidth,
      borderColor:"#ccc"
    },
    actionLeft:{
      flex:1,
      paddingRight:2
    },
    actionRight:{
      flex:1,
      paddingLeft:2,
      borderLeftWidth:StyleSheet.hairlineWidth,
      borderColor:"#ccc"
    },
    button:{
      flexDirection: 'row',
      alignItems:"center",
      padding:5
    },
    buttonIcon:{
      marginRight:10
    },
    textInputContainer:{
      paddingBottom:5,
      flexDirection:'column',
      justifyContent:"center",
      height:40
    },
    textInput:{
      paddingTop:10,
      paddingBottom:10,
      paddingLeft:5,
      backgroundColor:"#f1f1f1",
      color:"#aaa"
    },
    bumDetailInfoContainer:{
      backgroundColor:"#fff",
      padding:5,
      marginBottom:5
    },
    bumDetailCommentContainer:{
      backgroundColor:"#fff",
      marginBottom:5
    },
    bumDetailCommentHeaderContainer:{
      flexDirection:"row",
      alignItems:"center",
      padding:5
    },
    bumDetailCommentorProfilePictureContainer:{
      padding:5
    },
    bumDetailCommentorDetail:{
      padding:5
    },
    bumDetailCommentImageContainer:{
      flex:1
    },
    bumDetailCommentContent:{
      padding:5
    },
    commentPointsAndResponseContainer:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      padding:5
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
module.exports = bumdetail;
