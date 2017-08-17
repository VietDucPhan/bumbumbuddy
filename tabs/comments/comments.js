
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
  Slider,
  ActivityIndicator,
  RefreshControl,
  FlatList
 } from 'react-native';
 import Icon from 'react-native-vector-icons/Ionicons';
import AuthLib from '../../libs/Auth';
import BumsLib from '../../libs/Bums';
import CacheLib from '../../libs/Cache';
import DateFormat from '../bums/tmpl/formatdate';
import Votebtn from './tmpl/votebtn';
import Morebtn from './tmpl/morebtn';
var BumModel = new BumsLib();
var Auth = new AuthLib();
var Cache = new CacheLib();

class comments extends Component {
  constructor(props){
    super(props);
    this.state = {
      comments:[],
      showActivitiIndicator:true,
      refreshing:false
    };
    this._getBumComments.bind(this);
  }

  static defaultProps = {
    finsihedRefreshing:function(){}
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
    //console.log("comments.componentDidMount");
    var self = this;

    if(self.props._id){
      self._getBumComments();
      Cache.getComments(self.props._id,function(flag,result){
        if(flag){
          self.setState({
            comments:result,
            showActivitiIndicator:false,
            refreshing:false
          });
        } else {
          self._getBumComments();
        }
      });
    } else {
      Cache.getComments("_getBumsComments",function(flag,result){
        if(flag){
          self.setState({
            comments:result,
            showActivitiIndicator:false,
            refreshing:false
          });
        } else {
          self._getBumsComments();
        }
      });
    }
  }

  _calculateImageHeight(imageWidth,dimensionWidth,imageHeight){
    var height = dimensionWidth/imageWidth*imageHeight;
    return {height:height,width:dimensionWidth};
  }

  _getBumsComments(){
    var self = this;
    BumModel.getBumsComments(function(result){
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
        console.log("comments._getBumsComments",result);
        var comments = {
          comments:result.data,
          showActivitiIndicator:false,
          refreshing:false
        }
        self.setState(comments);
        Cache.setComments("_getBumsComments",result.data);
        self.props.finsihedRefreshing();
      }
    });
  }

  _getBumComments(){
    var self = this;
    BumModel.getBumComments(self.props._id,function(result){
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
        console.log("comments._getBumComments",result);
        var comments = {
          comments:result.data,
          showActivitiIndicator:false,
          refreshing:false
        }
        self.setState(comments);
        Cache.setComments(self.props._id,result.data);
        self.props.finsihedRefreshing();
      }
    });
  }

  _onRefresh() {
    var self = this;

    this.setState({refreshing: true});
    if(self.props._id){
      self._getBumComments();
    } else {
      console.log("comments._onRefresh");
      self._getBumsComments();

    }
  }

  componentWillReceiveProps(nextProps) {
    var self = this;
    console.log("comments.componentWillReceiveProps");
    if(nextProps.showRating){
      Cache.getRating(self.props._id,function(flag,result){
        console.log("rating._getBum.componentWillReceiveProps",flag);
        if(flag){
          self.setState(result);
        } else {
          self._getBum();
        }
      });
    }

    if(nextProps.refreshing){
      if(self.props._id){
        self._getBumComments();
      } else {
        self._getBumsComments();
      }
    }
  }

  // {self.state.comments.map(function(obj, i){
  //     //console.log(obj);
  //     switch (obj.bum_rating) {
  //       case "level1":
  //         obj.bum_rating = "Trickle";
  //         break;
  //       case "level2":
  //         obj.bum_rating = "Stream flow";
  //         break;
  //       case "level3":
  //         obj.bum_rating = "Garden hose";
  //         break;
  //       case "level4":
  //         obj.bum_rating = "Heavy torrent";
  //         break;
  //       case "level5":
  //         obj.bum_rating = "Geyser";
  //         break;
  //
  //     }
  //
  //     if(obj.overall_rating){
  //       obj.overall_rating_displayname = obj.overall_rating + " stars";
  //     }
  //       return (
  //         <View key={i} style={styles.commentContainer}>
  //           <View style={styles.commentHeader}>
  //             <View style={styles.commentorProfilePictureContainer}>
  //               <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
  //          style={{width: 30, height: 30, borderRadius:15}} />
  //             </View>
  //             <View style={styles.commentorProfileInfoContainer}>
  //               <View>
  //                 {obj.created_by
  //                   ?
  //                   <TouchableOpacity>
  //                     <Text style={styles.createdBy}>{obj.created_by.name}</Text>
  //                   </TouchableOpacity>
  //                   :
  //                     <Text style={styles.commentAtPlace}></Text>
  //                 }
  //                 {self.props._id
  //                   ?
  //                     <DateFormat style={styles.commentAtPlace} created_date={obj.created_date}/>
  //                   :
  //                   <TouchableOpacity onPress={()=>navigate("BumDetail",{_id:obj.bum_id})}>
  //                     <Text style={styles.commentAtPlace}>{obj.name}</Text>
  //                   </TouchableOpacity>
  //                 }
  //
  //               </View>
  //               <Morebtn navigation={self.props.navigation} _id={obj._id} _typeOfBtn="comment" _createdBy={obj.created_by.email} _user={self.props.screenProps.user} />
  //             </View>
  //           </View>
  //           <View>
  //             {obj.media && obj.media[0] &&
  //               <Image resizeMode="contain" source={{uri: obj.media[0].secure_url}}
  //        style={self._calculateImageHeight(obj.media[0].width,Dimensions.get('window').width,obj.media[0].height)} />}
  //
  //           </View>
  //           <View style={styles.commentorCommentContainer}>
  //             <View>
  //               <Text>{obj.description}</Text>
  //             </View>
  //              <View style={styles.commentPointsAndResponseContainer}>
  //                <Votebtn navigation={self.props.navigation} _user={self.props.screenProps.user} _id={obj._id} _upVote={obj.upVote} _downVote={obj.downVote} />
  //                <View style={styles.commentPointsResponseAndRatingContainer}>
  //                   <Text style={styles.commentPointsAndResponseText}>{obj.overall_rating_displayname} {obj.overall_rating_displayname && <Text>-</Text>} {obj.bum_rating}</Text>
  //
  //                   <Text style={styles.commentPointsAndResponseText}>{obj.points} points</Text>
  //
  //                </View>
  //
  //              </View>
  //           </View>
  //         </View>
  //       );
  //     })
  // }

  render() {
    const {navigate} = this.props.navigation;
    var self = this;
    //console.log("comments.render",self.state.comments);
    if(self.state.showActivitiIndicator){
      return(
        <View style={styles.container}>
          <ActivityIndicator animating={this.state.showActivitiIndicator}></ActivityIndicator>
        </View>
      );
    } else {
      return(
        <FlatList
        data={this.state.comments}
        ref={(ref) => { self.list = ref; }}
        keyExtractor={(item,index)=>item._id}
        initialNumToRender={5}
        renderItem={(info)=>{
          var obj = info.item;
          switch (obj.bum_rating) {
                case "level1":
                  obj.bum_rating = "Trickle";
                  break;
                case "level2":
                  obj.bum_rating = "Stream flow";
                  break;
                case "level3":
                  obj.bum_rating = "Garden hose";
                  break;
                case "level4":
                  obj.bum_rating = "Heavy torrent";
                  break;
                case "level5":
                  obj.bum_rating = "Geyser";
                  break;

              }

              if(obj.overall_rating){
                obj.overall_rating_displayname = obj.overall_rating + " stars";
              }
                return (
                  <View key={obj._id} style={styles.commentContainer}>
                    <View style={styles.commentHeader}>
                      <View style={styles.commentorProfilePictureContainer}>
                        <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                   style={{width: 30, height: 30, borderRadius:15}} />
                      </View>
                      <View style={styles.commentorProfileInfoContainer}>
                        <View>
                          {obj.created_by
                            ?
                            <TouchableOpacity>
                              <Text style={styles.createdBy}>{obj.created_by.name}</Text>
                            </TouchableOpacity>
                            :
                              <Text style={styles.commentAtPlace}></Text>
                          }
                          {self.props._id
                            ?
                              <DateFormat style={styles.commentAtPlace} created_date={obj.created_date}/>
                            :
                            <TouchableOpacity onPress={()=>navigate("BumDetail",{_id:obj.bum_id})}>
                              <Text style={styles.commentAtPlace}>{obj.name}</Text>
                            </TouchableOpacity>
                          }

                        </View>
                        <Morebtn navigation={self.props.navigation} _id={obj._id} _typeOfBtn="comment" _createdBy={obj.created_by.email} _user={self.props.screenProps.user} />
                      </View>
                    </View>
                    <View>
                      {obj.media && obj.media[0] &&
                        <Image resizeMode="contain" source={{uri: obj.media[0].secure_url}}
                 style={self._calculateImageHeight(obj.media[0].width,Dimensions.get('window').width,obj.media[0].height)} />}

                    </View>
                    <View style={styles.commentorCommentContainer}>
                      <View>
                        <Text>{obj.description}</Text>
                      </View>
                       <View style={styles.commentPointsAndResponseContainer}>
                         <Votebtn navigation={self.props.navigation} _user={self.props.screenProps.user} _id={obj._id} _upVote={obj.upVote} _downVote={obj.downVote} />
                         <View style={styles.commentPointsResponseAndRatingContainer}>
                            <Text style={styles.commentPointsAndResponseText}>{obj.overall_rating_displayname} {obj.overall_rating_displayname && <Text>-</Text>} {obj.bum_rating}</Text>

                            <Text style={styles.commentPointsAndResponseText}>{obj.points} points</Text>

                         </View>

                       </View>
                    </View>
                  </View>
                );
        }}

          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />
      );
    }

  }
}
  const styles = StyleSheet.create({
    commentContainer:{
      flex:1,
      flexDirection: 'column',
      backgroundColor:"#fff",
      marginBottom:5
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
    createdBy:{
      fontWeight:"500"
    },
    commentAtPlace:{
      fontSize:12
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
    commentPointsResponseAndRatingContainer:{
      flexDirection:'column'
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
