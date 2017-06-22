
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
 } from 'react-native';
 import CommentsView from '../../comments/comments';
 import RatingView from '../../bums/tmpl/rating';
import Icon from 'react-native-vector-icons/Ionicons';

class bumdetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      _id: '57a4bb846f33a6110086869b',
      name: 'The Observatory',
      address: '4 Nguyen Tat Thanh',
	    links:
	     [ { format: 'jpg',
	         animated: false,
	         width: 500,
	         height: 375,
	         size: 218936,
	         url: 'http://res.cloudinary.com/dsthiwwp4/image/upload/v1471837083/jswWjYv_cneeia.jpg',
	         uploaded_by:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' } } ],
	    comments:
	     [ { commentor:
	          { name: 'duc phan',
	            email: 'joomdaily@gmail.com',
	            profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	            type: 'google' },
	         content: '63 beer shop' } ],
	    likes:
	     [ { _id: '57fca5de4ce7a0110064ae6d',
	         name: 'Duc Viet Phan',
	         email: 'joomdaily@gmail.com',
	         profile_picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/13315230_10205973406004658_3891134162845750917_n.jpg?oh=19f9ca64ddc5fabef4c0dbfa5c474346&oe=58A9C315',
	         type: 'facebook' } ],
	    created_by:
	     { name: 'duc phan',
	       email: 'joomdaily@gmail.com',
	       profile_picture: 'https://lh6.googleusercontent.com/-zkNCtidqyL0/AAAAAAAAAAI/AAAAAAAAACY/JOiGoRBOedY/s96-c/photo.jpg',
	       type: 'google' },
	    coordinate: { longitude: 106.70496996228299, latitude: 10.764927787313708 }
    };
    //console.log('bumdetail.constructor',this.props.screenProps);
  }

  _getBumDetail(bumID){
    console.log('bumdetail._getBumDetail',bumID);
    //added later
    //this.setState()
  }

  componentDidMount(){
    const {state} = this.props.navigation;
    //setTimeout(()=>this.setState({statusBarHeight: 1}),500);
    this._getBumDetail(state.params.bumID);
  }

  render() {
    var self = this;
    return(
      <View>
        <ScrollView>
          <View style={styles.bumDetailInfoContainer}>
            <RatingView/>
          </View>

          <CommentsView navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    );
  }
}
  const styles = StyleSheet.create({
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
