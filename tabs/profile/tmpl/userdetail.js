
import React, { Component } from 'react';
import {
  StyleSheet,
  View
 } from 'react-native';
 import CommentsView from '../../comments/comments';

class userdetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      refreshing:false
    };
    //console.log('bumdetail.constructor',this.props.screenProps);
  }
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.username : 'User Detail',
    }
  };

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
        <CommentsView screenProps={{user:self.props.screenProps.user}} user_id={state.params.user_id} navigation={self.props.navigation}/>
      </View>
    );
  }
}
  const styles = StyleSheet.create({
    container:{
      flex:1
    }
  });
module.exports = userdetail;
